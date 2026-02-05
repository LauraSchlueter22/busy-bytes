import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: {
    title: String,
    required: true,
  },

  description: String,

  ingredents: { 
    igredents: [String],
    required: true,
  },

  instructions: {
    instructions: [String],
    required: true,
  },

  cookingTime: String,
  prepTime: String,
  servings: Number,
});

recipeSchema.index({ title: "text", ingredents: "text" });

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
