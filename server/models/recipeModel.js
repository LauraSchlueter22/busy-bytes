import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  ingredients: {
    type: [String],
    required: true,
  },

  instructions: {
    type: [String],
    required: true,
  },

  cookingTime: String,
  prepTime: String,
  servings: Number,
});

recipeSchema.index({ title: "text", ingredients: "text" });

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
