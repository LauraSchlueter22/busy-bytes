import express from "express";
import {
  generateRecipes,
  generateFullRecipe,
  saveRecipe,
  getSavedRecipes,
  deleteRecipe,
} from "../controllers/aiRecipeController.js";

const router = express.Router();

router.get("/recipes", generateRecipes);
router.get("/recipes/saved", getSavedRecipes);
router.get("/recipes/detailed", generateFullRecipe);
router.post("/recipe/save", saveRecipe);
router.delete("/recipe/:id", deleteRecipe);

export default router;
