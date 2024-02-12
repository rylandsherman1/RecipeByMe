from app import create_app
from extensions import db

app = create_app()

with app.app_context():
    # Import models
    from models.User import User
    from models.Recipe import Recipe
    from models.Category import Category

    # Clear existing data
    db.session.query(Recipe).delete()
    db.session.query(Category).delete()
    db.session.query(User).delete()

    # Create some test users
    admin = User(username="admin", email="admin@example.com")
    admin.password = "adminpassword"
    db.session.add(admin)
    db.session.commit()  # Commit the admin user to get the id

    # Create categories
    breakfast = Category(name="Breakfast")
    appetizers = Category(name="Appetizers")
    lunch = Category(name="Lunch")
    dinner = Category(name="Dinner")
    dessert = Category(name="Dessert")

    db.session.add_all([breakfast, appetizers, lunch, dinner, dessert])
    db.session.commit()  # Commit categories to get their ids

    # Create test recipes using the admin user_id and associate with categories
    recipe1 = Recipe(
        title="Chocolate Cake",
        ingredients="Flour, Sugar, Cocoa Powder, Baking Powder, Eggs, Milk, Vegetable Oil",
        recipe="Mix dry ingredients. Add eggs, milk, and oil. Bake at 350°F for 30 minutes.",
        image_url="https://www.lilcookie.com/wp-content/uploads/2018/11/American_chocolate_cake3-square.jpg",
        user_id=admin.id,
    )
    recipe1.add_category(dessert)  # Associate dessert category with recipe1

    recipe2 = Recipe(
        title="Caesar Salad",
        ingredients="Romaine Lettuce, Croutons, Parmesan Cheese, Caesar Dressing",
        recipe="Toss lettuce with croutons, cheese, and dressing.",
        image_url="https://tse2.mm.bing.net/th?id=OIP.kZjGjFoMefWXqiPmNjlHGAHaF5&pid=Api&P=0&w=300&h=300",
        user_id=admin.id,
    )
    recipe2.add_category(appetizers)  # Associate appetizers category with recipe2

    # Optionally, add more recipes for lunch and dinner categories
    recipe3 = Recipe(
        title="Grilled Chicken Sandwich",
        ingredients="Chicken Breast, Lettuce, Tomato, Mayonnaise, Whole Wheat Bread",
        recipe="Grill the chicken breast and assemble the sandwich with lettuce, tomato, and mayonnaise.",
        image_url="https://files.oaiusercontent.com/file-FlnqNNmLm1lKY6sfBgY8SvSu?se=2024-02-14T02%3A58%3A37Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D3837cdcd-1d68-456e-adaa-b4c8cdb76f80.webp&sig=0odAyjoHImDYhhSJTeokdwBImpe6ReQ0icVVRl7%2BePA%3D",
        user_id=admin.id,
    )
    recipe3.add_category(lunch)  # Associate lunch category with recipe3

    recipe4 = Recipe(
        title="Spaghetti Bolognese",
        ingredients="Spaghetti, Ground Beef, Tomato Sauce, Onion, Garlic, Olive Oil",
        recipe="Cook spaghetti. Sauté onion and garlic, add ground beef until browned, mix in tomato sauce.",
        image_url="https://files.oaiusercontent.com/file-hNm5F1wpayv9rAFphDGW3ja8?se=2024-02-14T03%3A01%3A08Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Dad111e23-b63f-4c97-8b3e-c1289e9562fa.webp&sig=X73S9xXrmEVLgX%2BusA6BK654KFY6p4dd5TZecaaiIhI%3D",
        user_id=admin.id,
    )
    recipe4.add_category(dinner)  # Associate dinner category with recipe4

    db.session.add_all([recipe1, recipe2, recipe3, recipe4])

    # Commit the changes
    db.session.commit()

    print("Database seeded!")
