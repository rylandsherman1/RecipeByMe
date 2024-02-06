from extensions import db
from .Association import (
    category_recipe,
)  # Assuming you still need this for Category associations


class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    ingredients = db.Column(db.Text, nullable=False)  # Text field for ingredients
    recipe = db.Column(db.Text, nullable=False)  # Detailed instructions
    image_url = db.Column(db.String(255))  # URL to the recipe image
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    categories = db.relationship(
        "Category", secondary=category_recipe, back_populates="recipes"
    )

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "ingredients": self.ingredients if self.ingredients else "",
            "recipe": self.recipe if self.recipe else "",
            "image_url": self.image_url if self.image_url else "",
            "user_id": self.user_id,
        }

    def __repr__(self):
        return f"<Recipe {self.title}>"
