import Food from '../../models/Food.js';

// Get all food items
export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a new food item
export const addFood = async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ success: false, message: "Name, price, and category are required." });
  }

  try {
    const newFood = new Food({
      name,
      description: description || "",
      price: Number(price),
      category,
      imageUrl: imageUrl || null,
      rating: 4.0,
      count: 0
    });

    const savedFood = await newFood.save();
    res.status(201).json({ success: true, message: "Food added successfully.", data: savedFood });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove a food item by ID
export const removeFood = async (req, res) => {
  const { id } = req.params;

  try {
    const removed = await Food.findByIdAndDelete(id);
    if (!removed) {
      return res.status(404).json({ success: false, message: "Food item not found." });
    }
    res.json({ success: true, message: "Food removed successfully.", data: removed });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a food item
export const updateFood = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updated = await Food.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Food item not found." });
    }
    res.json({ success: true, message: "Food updated successfully.", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};