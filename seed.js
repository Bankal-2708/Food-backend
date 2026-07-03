import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Food from './models/Food.js';

dotenv.config();

const seedFoods = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing foods
    await Food.deleteMany({});
    console.log('Cleared existing foods');

    // Sample food data
    const foods = [
      { name: "Pizza", category: "Pizza", price: 10, description: "Cheesy pizza topped with fresh vegetables and herbs", rating: 4.5 },
      { name: "Dosa", category: "Dosa", price: 6, description: "Crispy South Indian dosa served with chutney and sambar", rating: 4.3 },
      { name: "Momos", category: "Momos", price: 5, description: "Steamed momos stuffed with spicy vegetable filling", rating: 4.4 },
      { name: "Paneer Nan", category: "Paneer Roll", price: 8, description: "Soft naan bread stuffed with seasoned paneer", rating: 4.2 },
      { name: "Paneer Tikka", category: "Paneer Roll", price: 9, description: "Grilled paneer cubes marinated in Indian spices", rating: 4.6 },
      { name: "Pav Bhaji", category: "Biryani", price: 7, description: "Spicy mashed vegetable curry served with buttered pav", rating: 4.3 },
      { name: "Rajma Rice", category: "Biryani", price: 6, description: "Red kidney bean curry served with steamed rice", rating: 4.2 },
      { name: "Sandwich", category: "Burger", price: 4, description: "Grilled vegetable sandwich with cheese and sauces", rating: 4.1 },
      { name: "Burger", category: "Burger", price: 7, description: "Juicy burger with fresh veggies and special sauce", rating: 4.3 },
      { name: "Chole Bhature", category: "Paratha", price: 8, description: "Spicy chickpea curry served with fluffy fried bhature", rating: 4.4 },
      { name: "Egg Biryani", category: "Biryani", price: 9, description: "Aromatic basmati rice cooked with eggs and spices", rating: 4.5 },
      { name: "Mix Momos", category: "Momos", price: 6, description: "Assorted momos with mixed vegetable stuffing", rating: 4.3 },
      { name: "Pasta", category: "Pasta", price: 7, description: "Creamy pasta tossed with herbs and vegetables", rating: 4.2 },
      { name: "Rice Kheer", category: "Rabri", price: 5, description: "Traditional sweet rice pudding flavored with cardamom", rating: 4.4 },
    ];

    // Add to database
    const insertedFoods = await Food.insertMany(foods);
    console.log(`✅ ${insertedFoods.length} foods added successfully!`);

    console.log('\nFoods in DB:');
    insertedFoods.forEach(food => {
      console.log(`- ${food.name} (${food.category}) - ₹${food.price}`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Database seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedFoods();
