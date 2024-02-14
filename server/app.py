#!/usr/bin/env python3

from flask import Flask, jsonify, request, current_app
from flask_restful import Api, Resource
from itsdangerous import URLSafeTimedSerializer
from flask_cors import CORS
from extensions import db, migrate
from config import Config
from models import User, Recipe, Category, Rating


# Function to create the Flask application
def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(
        app, supports_credentials=True, allow_headers=["Content-Type", "Authorization"]
    )
    app.config.from_object(config_class)

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)

    # Initialize Flask-RESTful
    api = Api(app)

    serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])

    def generate_token(user_id):
        return serializer.dumps(user_id, salt="user-auth")

    def verify_token(token):
        try:
            user_id = serializer.loads(token, salt="user-auth")
            return User.query.get(user_id)
        except:
            return None

    class UserSignup(Resource):
        def post(self):
            data = request.get_json()
            if User.query.filter_by(email=data["email"]).first():
                return {"message": "Email already in use."}, 400
            new_user = User(username=data["username"], email=data["email"])
            new_user.password = data["password"]
            db.session.add(new_user)
            db.session.commit()
            return {
                "message": "User created successfully.",
                "user": {"username": data["username"], "email": data["email"]},
            }, 201

    class UserLogin(Resource):
        def post(self):
            data = request.get_json()
            user = User.query.filter_by(email=data["email"]).first()
            if user and user.check_password(data["password"]):
                token = generate_token(user.id)
                return {"message": "Login successful.", "token": token}, 200
            else:
                return {"message": "Invalid credentials."}, 401

    class RecipeList(Resource):
        def get(self):
            category_name = request.args.get("category")
            try:
                query = Recipe.query
                if category_name:
                    query = query.join(Recipe.categories).filter(
                        Category.name == category_name
                    )
                recipes = query.all()
                return jsonify([recipe.serialize() for recipe in recipes])
            except Exception as e:
                current_app.logger.error(f"Failed to fetch recipes: {str(e)}")
                return {"message": "Failed to fetch recipes"}, 500

        def post(self):
            try:
                data = request.get_json()
                user = verify_token(request.headers.get("Authorization").split(" ")[1])
                if not user:
                    return {"message": "Authentication required"}, 401

                new_recipe = Recipe(
                    title=data["title"],
                    ingredients=data["ingredients"],
                    recipe=data["recipe"],
                    image_url=data.get("image_url", ""),
                    user_id=user.id,
                    rating=data.get("rating"),
                )
                db.session.add(new_recipe)

                # Handle categories separately
                category_name = data.get("category")
                if category_name:
                    category = Category.query.filter_by(name=category_name).first()
                    if not category:
                        category = Category(name=category_name)
                        db.session.add(category)
                    new_recipe.add_category(category)

                db.session.commit()
                return jsonify(new_recipe.serialize()), 201
            except Exception as e:
                current_app.logger.error(f"Error adding new recipe: {e}")
                return {"message": "Error adding new recipe", "error": str(e)}, 500

    class RecipeDetail(Resource):
        def get(self, recipe_id):
            try:
                recipe = Recipe.query.get_or_404(recipe_id)
                return jsonify(recipe.serialize())
            except Exception as e:
                current_app.logger.error(f"Error fetching recipe: {e}")
                return {"message": "Error fetching recipe"}, 404

        def put(self, recipe_id):
            try:
                recipe = Recipe.query.get_or_404(recipe_id)
                data = request.get_json()
                recipe.title = data.get("title", recipe.title)
                recipe.ingredients = data.get("ingredients", recipe.ingredients)
                recipe.recipe = data.get("recipe", recipe.recipe)
                recipe.image_url = data.get("image_url", recipe.image_url)
                # Update category if provided
                category_name = data.get("category")
                if category_name:
                    category = Category.query.filter_by(name=category_name).first()
                    if not category:
                        category = Category(name=category_name)
                        db.session.add(category)
                    if category not in recipe.categories:
                        recipe.categories.append(category)
                db.session.commit()
                return jsonify(recipe.serialize())
            except Exception as e:
                current_app.logger.error(f"Error updating recipe: {e}")
                return {"message": "Error updating recipe", "error": str(e)}, 400

        def delete(self, recipe_id):
            try:
                recipe = Recipe.query.get_or_404(recipe_id)
                db.session.delete(recipe)
                db.session.commit()
                return jsonify({"message": "Recipe deleted"})
            except Exception as e:
                current_app.logger.error(f"Error deleting recipe: {e}")
                return {"message": "Error deleting recipe"}, 400

    class RecipeRating(Resource):
        def post(self, recipe_id):
            data = request.get_json()
            user = verify_token(request.headers.get("Authorization").split(" ")[1])
            if not user:
                return {"message": "Authentication required"}, 401

            # Check if the recipe exists
            recipe = Recipe.query.get(recipe_id)
            if not recipe:
                return {"message": "Recipe not found"}, 404

            # Check for the rating in the request
            rating_value = data.get("rating")
            if rating_value is None:
                return {"message": "Rating value is required"}, 400

            # Optional: Validate the rating value (e.g., must be between 1 and 5)
            if not 1 <= rating_value <= 5:
                return {"message": "Invalid rating value"}, 400

            # Create and save the new rating
            new_rating = Rating(
                rating=rating_value, user_id=user.id, recipe_id=recipe_id
            )
            db.session.add(new_rating)
            db.session.commit()

            return {"message": "Rating added successfully"}, 201

        def get(self, recipe_id):
            # Check if the recipe exists
            recipe = Recipe.query.get(recipe_id)
            if not recipe:
                return {"message": "Recipe not found"}, 404

            # Calculate the average rating
            average_rating = (
                db.session.query(db.func.avg(Rating.rating))
                .filter(Rating.recipe_id == recipe_id)
                .scalar()
            )
            average_rating = round(average_rating, 2) if average_rating else None

            return {"averageRating": average_rating}, 200

    # Add resources to Api
    api.add_resource(UserSignup, "/api/signup")
    api.add_resource(UserLogin, "/api/login")
    api.add_resource(RecipeList, "/api/recipes")
    api.add_resource(RecipeDetail, "/api/recipes/<int:recipe_id>")
    api.add_resource(RecipeRating, "/api/recipes/<int:recipe_id>/rating")

    @app.route("/")
    def index():
        return "<h1>Welcome to the Recipe App Server</h1>"

    return app


if __name__ == "__main__":
    app = create_app(Config)
    app.run(port=5000, debug=True)
