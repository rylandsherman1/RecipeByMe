from extensions import db
from .Association import category_recipe  # Import the association table


class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    recipe = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    rating = db.Column(db.Integer)  # New attribute to store the recipe rating

    # Define many-to-many relationship with Category using the association table
    categories = db.relationship(
        "Category",
        secondary=category_recipe,
        backref=db.backref("recipes", lazy="dynamic"),
    )

    def __init__(
        self, title, ingredients, recipe, image_url=None, user_id=None, rating=None
    ):
        self.title = title
        self.ingredients = ingredients
        self.recipe = recipe
        self.image_url = image_url
        self.user_id = user_id
        self.rating = rating  # Initialize rating

    def add_category(self, category):
        if category not in self.categories:
            self.categories.append(category)

    def remove_category(self, category):
        if category in self.categories:
            self.categories.remove(category)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "ingredients": self.ingredients,
            "recipe": self.recipe,
            "image_url": self.image_url,
            "user_id": self.user_id,
            "categories": [category.name for category in self.categories],
            "rating": self.rating,  # Include rating in serialized data
        }

    def __repr__(self):
        return f"<Recipe {self.title}>"
