import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  spoonacularId: { type: Number, required: true, unique: true },
  title: String,
  ingredients: [String],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
