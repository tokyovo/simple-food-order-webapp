import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@foodorder.com',
      name: 'Admin User',
      role: Role.ADMIN,
    },
  })

  // Create restaurant owner
  const ownerUser = await prisma.user.create({
    data: {
      email: 'owner@restaurant.com',
      name: 'Restaurant Owner',
      role: Role.OWNER,
    },
  })

  // Create customer
  const customer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      name: 'Test Customer',
      role: Role.CUSTOMER,
      phone: '+1234567890',
      address: '123 Main St, City, State 12345',
    },
  })

  // Create sample restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Pizza Palace',
      description: 'Authentic Italian pizza and pasta',
      address: '456 Restaurant Ave, Food City, FC 54321',
      phone: '+1987654321',
      email: 'info@pizzapalace.com',
      ownerId: ownerUser.id,
    },
  })

  // Create categories
  const pizzaCategory = await prisma.category.create({
    data: {
      name: 'Pizzas',
      description: 'Fresh made pizzas with quality ingredients',
      restaurantId: restaurant.id,
      sortOrder: 1,
    },
  })

  const pastaCategory = await prisma.category.create({
    data: {
      name: 'Pasta',
      description: 'Traditional Italian pasta dishes',
      restaurantId: restaurant.id,
      sortOrder: 2,
    },
  })

  const drinksCategory = await prisma.category.create({
    data: {
      name: 'Beverages',
      description: 'Refreshing drinks and beverages',
      restaurantId: restaurant.id,
      sortOrder: 3,
    },
  })

  // Create menu items
  await prisma.menuItem.createMany({
    data: [
      // Pizzas
      {
        name: 'Margherita Pizza',
        description: 'Fresh tomatoes, mozzarella, basil',
        price: 16.99,
        categoryId: pizzaCategory.id,
        restaurantId: restaurant.id,
        isAvailable: true,
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Pepperoni, mozzarella, tomato sauce',
        price: 18.99,
        categoryId: pizzaCategory.id,
        restaurantId: restaurant.id,
        isAvailable: true,
      },
      {
        name: 'Supreme Pizza',
        description: 'Pepperoni, sausage, peppers, onions, mushrooms',
        price: 22.99,
        categoryId: pizzaCategory.id,
        restaurantId: restaurant.id,
        isAvailable: true,
      },
      // Pasta
      {
        name: 'Spaghetti Carbonara',
        description: 'Eggs, bacon, parmesan, black pepper',
        price: 15.99,
        categoryId: pastaCategory.id,
        restaurantId: restaurant.id,
        isAvailable: true,
      },
      {
        name: 'Fettuccine Alfredo',
        description: 'Creamy alfredo sauce with fettuccine',
        price: 14.99,
        categoryId: pastaCategory.id,
        restaurantId: restaurant.id,
        isAvailable: true,
      },
      // Drinks
      {
        name: 'Coca Cola',
        description: 'Classic refreshing cola',
        price: 2.99,
        categoryId: drinksCategory.id,
        restaurantId: restaurant.id,
        isAvailable: true,
      },
      {
        name: 'Italian Sparkling Water',
        description: 'Refreshing sparkling mineral water',
        price: 3.49,
        categoryId: drinksCategory.id,
        restaurantId: restaurant.id,
        isAvailable: true,
      },
    ],
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })