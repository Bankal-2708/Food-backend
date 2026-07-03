import {
  getAllFoods,
  addFood,
  removeFood,
  updateFood,
} from "./food.service.js";

export const foodController = {
  getAll: (req, res) => getAllFoods(req, res),
  add: (req, res) => addFood(req, res),
  remove: (req, res) => removeFood(req, res),
  update: (req, res) => updateFood(req, res),
};