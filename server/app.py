#!/usr/bin/env python3

from flask import Flask, jsonify, request, current_app
from flask_restful import Api, Resource
from itsdangerous import URLSafeTimedSerializer

# from flask_httpauth import HTTPTokenAuth
from flask_cors import CORS
from extensions import db, migrate
from config import Config
from models import User, Recipe, Category


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

    # Setup for Flask-HTTPAuth
    # auth = HTTPTokenAuth(scheme="Bearer")
    serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])

    def generate_token(user_id):
        return serializer.dumps(user_id, salt="user-auth")

    # @auth.verify_token
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
        # @auth.login_required
        def get(self):
            try:
                recipes = Recipe.query.all()
                return jsonify([recipe.serialize() for recipe in recipes])
            except Exception as e:
                current_app.logger.error(f"Failed to fetch recipes: {str(e)}")
                return {"message": "Failed to fetch recipes"}, 500

        # @auth.login_required
        def post(self):
            try:
                data = request.get_json()
                user = verify_token(
                    request.headers.get("Authorization").split(" ")[1]
                )  # Token retrieval

                if not user:
                    return {"message": "Authentication required"}, 401

                new_recipe = Recipe(
                    title=data["title"],
                    ingredients=data["ingredients"],
                    recipe=data["recipe"],
                    image_url=data.get("image_url", ""),
                    user_id=user.id,  # Associate with current user
                )
                db.session.add(new_recipe)
                db.session.commit()
                return jsonify(new_recipe.serialize()), 201
            except Exception as e:
                current_app.logger.error(f"Error adding new recipe: {e}")
                return {"message": "Error adding new recipe", "error": str(e)}, 500

    class RecipeDetail(Resource):
        # @auth.login_required
        def get(self, recipe_id):
            recipe = Recipe.query.get_or_404(recipe_id)
            return jsonify(recipe.serialize())

        # @auth.login_required
        def put(self, recipe_id):
            recipe = Recipe.query.get_or_404(recipe_id)
            data = request.get_json()

            recipe.title = data.get("title", recipe.title)
            recipe.ingredients = data.get("ingredients", recipe.ingredients)
            recipe.recipe = data.get("recipe", recipe.recipe)
            recipe.image_url = data.get("image_url", recipe.image_url)

            db.session.commit()
            return jsonify(recipe.serialize())

        # @auth.login_required
        def delete(self, recipe_id):
            recipe = Recipe.query.get_or_404(recipe_id)
            db.session.delete(recipe)
            db.session.commit()
            return jsonify({"message": "Recipe deleted"})

    # Add resources to Api
    api.add_resource(UserSignup, "/api/signup")
    api.add_resource(UserLogin, "/api/login")
    api.add_resource(RecipeList, "/api/recipes")
    api.add_resource(RecipeDetail, "/api/recipes/<int:recipe_id>")

    @app.route("/")
    def index():
        return "<h1>Welcome to the Recipe App Server</h1>"

    return app


if __name__ == "__main__":
    app = create_app(Config)
    app.run(port=5000, debug=True)
