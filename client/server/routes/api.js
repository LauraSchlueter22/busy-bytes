import express from 'express';
import recipeController from '../controllers/recipeController.js';

const router = express.Router();

router.get('/recipes',
    recipeController.getRecipes,
    (req, res) => res.status(200).json(res.locals.recipes)
);

router.get('/recipes/:id',
    recipeController.getRecipeDetails,
    (req, res) => res.status(200).json(res.locals.recipeDetails)
);

router.post('/recipe', 
    recipeController.saveRecipe,
    (req, res) => res.status(200).json(res.locals.saved)
);

router.get('/saved', 
    recipeController.getSavedRecipes,
    (req, res) => res.status(200).json(res.locals.savedRecipes)
);

/* stretch feature: route to remove recipes */

export default router;