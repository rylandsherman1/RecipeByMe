# models/Association.py
from extensions import db

category_recipe = db.Table(
    "category_recipe",
    db.Column(
        "category_id", db.Integer, db.ForeignKey("categories.id"), primary_key=True
    ),
    db.Column("recipe_id", db.Integer, db.ForeignKey("recipes.id"), primary_key=True),
)
