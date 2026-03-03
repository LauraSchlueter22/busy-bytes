import express from "express";
import {
  generateRecipes,
  generateFullRecipe,
  saveRecipe,
  getSavedRecipes,
  deleteRecipe,
} from "../controllers/aiRecipeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/recipes", generateRecipes);
router.post("/recipe/detailed", generateFullRecipe);
router.post("/recipe/save", protect, saveRecipe);
router.get("/recipes/saved", protect, getSavedRecipes);
router.delete("/recipes/:id", protect, deleteRecipe);

export default router;
