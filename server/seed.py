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
        ingredients="1 3/4 cups all-purpose flour, 2 cups sugar, 3/4 cup cocoa powder, 1 1/2 tsp baking powder, 1 1/2 tsp baking soda, 1 tsp salt, 2 eggs, 1 cup whole milk, 1/2 cup vegetable oil, 2 tsp vanilla extract, 1 cup boiling water",
        recipe="Preheat oven to 350°F (175°C). Grease and flour two 9-inch round baking pans. In a large bowl, mix together flour, sugar, cocoa, baking powder, baking soda, and salt. Add eggs, milk, oil, and vanilla; beat on medium speed for 2 minutes. Stir in boiling water (batter will be thin). Pour into prepared pans. Bake 30 to 35 minutes, or until a toothpick inserted into the center comes out clean. Cool in pans for 10 minutes, then remove to wire racks to cool completely.",
        image_url="https://www.lilcookie.com/wp-content/uploads/2018/11/American_chocolate_cake3-square.jpg",
        user_id=admin.id,
        rating=5,
    )
    recipe1.categories.append(dessert)

    recipe2 = Recipe(
        title="Caesar Salad",
        ingredients="1 large romaine lettuce, 3/4 cup Caesar dressing, 1 cup croutons, 1/2 cup grated Parmesan cheese, 2 tsp anchovy paste (optional), 1 garlic clove, minced, Juice of 1 lemon, Salt and pepper to taste",
        recipe="Wash and dry the lettuce, then chop or tear it into bite-sized pieces. In a large bowl, combine lettuce with Caesar dressing and toss until coated. Add croutons and Parmesan cheese and toss again. In a small bowl, mix anchovy paste, minced garlic, and lemon juice, then drizzle over the salad. Season with salt and pepper to taste. Serve immediately.",
        image_url="https://tse2.mm.bing.net/th?id=OIP.kZjGjFoMefWXqiPmNjlHGAHaF5&pid=Api&P=0&w=300&h=300",
        user_id=admin.id,
        rating=4,
    )
    recipe2.categories.append(appetizers)

    recipe3 = Recipe(
        title="Grilled Chicken Sandwich",
        ingredients="2 boneless, skinless chicken breasts, 4 slices whole wheat bread, 1 avocado, sliced, 1 tomato, sliced, Lettuce leaves, 2 tbsp mayonnaise, 1 tbsp olive oil, Salt and pepper to taste",
        recipe="Season chicken breasts with salt and pepper. Heat olive oil in a grill pan over medium heat, and grill chicken for 6-7 minutes on each side, or until fully cooked. Toast the bread slices. Spread mayonnaise on one side of each bread slice. Assemble the sandwich by placing grilled chicken, avocado slices, tomato slices, and lettuce between two slices of bread. Serve immediately.",
        image_url="https://files.oaiusercontent.com/file-FlnqNNmLm1lKY6sfBgY8SvSu?se=2024-02-14T02%3A58%3A37Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D3837cdcd-1d68-456e-adaa-b4c8cdb76f80.webp&sig=0odAyjoHImDYhhSJTeokdwBImpe6ReQ0icVVRl7%2BePA%3D",
        user_id=admin.id,
        rating=4,
    )
    recipe3.categories.append(lunch)

    recipe4 = Recipe(
        title="Spaghetti Bolognese",
        ingredients="400g spaghetti, 500g ground beef, 1 onion, finely chopped, 2 garlic cloves, minced, 800g canned chopped tomatoes, 2 tbsp tomato paste, 1 cup red wine, 1 tsp dried oregano, 1 tsp dried basil, Salt and pepper to taste, Grated Parmesan cheese, for serving",
        recipe="Cook spaghetti according to package instructions; drain. In a large skillet, cook ground beef, onion, and garlic over medium heat until meat is browned; drain. Stir in chopped tomatoes, tomato paste, red wine, oregano, and basil. Season with salt and pepper. Bring to a boil, then reduce heat and simmer, uncovered, for 30 minutes, stirring occasionally. Serve sauce over spaghetti and top with grated Parmesan cheese.",
        image_url="https://files.oaiusercontent.com/file-hNm5F1wpayv9rAFphDGW3ja8?se=2024-02-14T03%3A01%3A08Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Dad111e23-b63f-4c97-8b3e-c1289e9562fa.webp&sig=X73S9xXrmEVLgX%2BusA6BK654KFY6p4dd5TZecaaiIhI%3D",
        user_id=admin.id,
        rating=5,
    )
    recipe4.categories.append(dinner)

    db.session.add_all([recipe1, recipe2, recipe3, recipe4])
    db.session.commit()  # Commit the changes

    print("Database seeded!")
