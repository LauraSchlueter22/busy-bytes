import express from 'express';
import recipeController from '../controllers/recipeController.js';

const router = express.Router();

/* route to get recipes*/
router.get('/recipes',
    recipeController.getRecipes,
    (req, res) => res.status(200).json(res.locals.recipes)
);

/* route to view recipe details */
router.get('/recipes/:id',
    recipeController.getRecipeDetails,
    (req, res) => res.status(200).json(res.locals.recipeDetails)
);

/* route to save recipes */
router.post('/recipe', 
    recipeController.saveRecipe,
    (req, res) => res.status(200).json(res.locals.saved)
);

/* route to get all saved recipes */
    /* I THINK THIS MIGHT GO SOMEWHERE ELSE */
router.get('/saved', 
    recipeController.getSavedRecipes,
    (req, res) => res.status(200).json(res.locals.savedRecipes)
);
/* route to delete recipes */

export default router;