from app import create_app
from extensions import db

app = create_app()

with app.app_context():
    # Import models
    from models.User import User
    from models.Recipe import Recipe
    from models.Ingredient import Ingredient
    from models.Category import Category

    # Clear existing data
    db.session.query(Recipe).delete()
    db.session.query(Ingredient).delete()
    db.session.query(Category).delete()
    db.session.query(User).delete()

    # Create some test users
    admin = User(username="admin", email="admin@example.com")
    admin.password = "adminpassword"  # Use the password setter method
    db.session.add(admin)
    db.session.commit()  # Commit the admin user to get the id

    # Create a test recipe using the user_id
    test_recipe = Recipe(
        title="Test Recipe", description="This is a test recipe.", user_id=admin.id
    )
    db.session.add(test_recipe)

    # Optionally, create and add other models like Ingredient, Category, etc.

    # Commit the changes
    db.session.commit()

    print("Database seeded!")
