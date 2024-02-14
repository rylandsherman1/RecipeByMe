from extensions import db


class Rating(db.Model):
    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Relationships
    recipe = db.relationship("Recipe", backref=db.backref("ratings", lazy=True))
    user = db.relationship("User", backref=db.backref("ratings", lazy=True))
