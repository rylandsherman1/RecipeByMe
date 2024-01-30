# Import necessary modules from flask_sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from extensions import db
from .Association import category_recipe


class Category(db.Model):
    # Define the name of the table
    __tablename__ = "categories"

    # Define the columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)

    # Relationship with Recipe model (assuming you'll have a Recipe model that refers to this Category model)
    # This will create a many-to-many relationship if you have a association table defined elsewhere, or a one-to-many relationship directly
    recipes = db.relationship(
        "Recipe", secondary=category_recipe, back_populates="categories"
    )

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<Category {self.name}>"
