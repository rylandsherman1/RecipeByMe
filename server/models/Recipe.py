from flask_sqlalchemy import SQLAlchemy
from extensions import db
from .Association import recipe_ingredient, category_recipe


class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    cooking_time = db.Column(db.Integer)
    difficulty = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # No need to redefine the backref here, it's already specified in the User model.
    categories = db.relationship(
        "Category", secondary=category_recipe, back_populates="recipes"
    )
    ingredients = db.relationship(
        "Ingredient", secondary=recipe_ingredient, back_populates="recipes"
    )

    def serialize(self):
        return {"id": self.id, "title": self.title, "description": self.description}

    def __repr__(self):
        return f"<Recipe {self.title}>"
