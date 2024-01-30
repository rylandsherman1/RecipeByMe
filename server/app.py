# app.py
#!/usr/bin/env python3

from flask import Flask, jsonify, request, make_response
from flask_restful import Api, Resource
from flask_httpauth import HTTPTokenAuth
from extensions import db, migrate  # Use the centralized extensions for db and migrate
from config import Config  # Import the Config class
from models import User, Recipe, Ingredient, Category  # Import models here


# Function to create the Flask application
def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)

    # Initialize Flask-RESTful and Flask-HTTPAuth
    api = Api(app)
    auth = HTTPTokenAuth(scheme="Bearer")

    @auth.verify_token
    def verify_token(token):
        # Implement your token verification logic here
        return token == "your_secret_token"

    # Validation for recipe data
    def validate_recipe_data(data):
        if not data.get("title") or not data.get("description"):
            return False, "Title and description are required."
        return True, ""

    # Error response helper
    def error_response(status_code, message):
        response = jsonify({"error": message})
        response.status_code = status_code
        return response

    # Existing resource classes
    class RecipeList(Resource):
        @auth.login_required
        def get(self):
            recipes = Recipe.query.all()
            return jsonify([recipe.serialize() for recipe in recipes])

        @auth.login_required
        def post(self):
            data = request.get_json()
            is_valid, message = validate_recipe_data(data)
            if not is_valid:
                return error_response(400, message)

            new_recipe = Recipe(
                title=data["title"],
                description=data["description"],
                user_id=data["user_id"],
            )
            db.session.add(new_recipe)
            db.session.commit()
            return jsonify(new_recipe.serialize())

    class RecipeDetail(Resource):
        @auth.login_required
        def get(self, recipe_id):
            recipe = Recipe.query.get_or_404(recipe_id)
            return jsonify(recipe.serialize())

        @auth.login_required
        def put(self, recipe_id):
            recipe = Recipe.query.get_or_404(recipe_id)
            data = request.get_json()
            recipe.title = data.get("title", recipe.title)
            recipe.description = data.get("description", recipe.description)
            db.session.commit()
            return jsonify(recipe.serialize())

        @auth.login_required
        def delete(self, recipe_id):
            recipe = Recipe.query.get_or_404(recipe_id)
            db.session.delete(recipe)
            db.session.commit()
            return jsonify({"message": "Recipe deleted"})

    # Add resources to Api
    api.add_resource(RecipeList, "/recipes")
    api.add_resource(RecipeDetail, "/recipes/<int:recipe_id>")

    @app.route("/")
    def index():
        return "<h1>Project Server</h1>"

    return app


if __name__ == "__main__":
    app_instance = create_app()
    app_instance.run(port=5555, debug=True)
