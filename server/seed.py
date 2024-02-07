from app import create_app
from extensions import db

app = create_app()

with app.app_context():
    # Import models
    from models.User import User
    from models.Recipe import Recipe
    from models.Category import Category  # Keep if you plan to use categories

    # Clear existing data
    db.session.query(Recipe).delete()
    db.session.query(Category).delete()  # Keep if you plan to use categories
    db.session.query(User).delete()

    # Create some test users
    admin = User(username="admin", email="admin@example.com")
    admin.password = "adminpassword"
    db.session.add(admin)
    db.session.commit()  # Commit the admin user to get the id

    # Create test recipes using the admin user_id
    recipe1 = Recipe(
        title="Chocolate Cake",
        ingredients="Flour, Sugar, Cocoa Powder, Baking Powder, Eggs, Milk, Vegetable Oil",
        recipe="Mix dry ingredients. Add eggs, milk, and oil. Bake at 350°F for 30 minutes.",
        image_url="https://www.lilcookie.com/wp-content/uploads/2018/11/American_chocolate_cake3-square.jpg",
        user_id=admin.id,
    )

    recipe2 = Recipe(
        title="Caesar Salad",
        ingredients="Romaine Lettuce, Croutons, Parmesan Cheese, Caesar Dressing",
        recipe="Toss lettuce with croutons, cheese, and dressing.",
        image_url="https://tse2.mm.bing.net/th?id=OIP.kZjGjFoMefWXqiPmNjlHGAHaF5&pid=Api&P=0&h=220",
        user_id=admin.id,
    )

    db.session.add_all([recipe1, recipe2])

    # Commit the changes
    db.session.commit()

    print("Database seeded!")
