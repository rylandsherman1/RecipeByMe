from flask_sqlalchemy import SQLAlchemy
from extensions import db
from .Association import recipe_ingredient


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)

    # Many-to-many relationship with Recipe model
    # This assumes an association table (e.g., recipe_ingredient) that links ingredients to recipes
    recipes = db.relationship(
        "Recipe", secondary=recipe_ingredient, back_populates="ingredients"
    )

    def __repr__(self):
        return f"<Ingredient {self.name}>"
