import Recipe from '../models/recipeModels.js';

const recipeController = {};

/* middleware functions */
    /*  handle getting recipes */
recipeController.getRecipes = async (req, res, next) => {
    try {
        const ingredients = req.query.ingredients;
        const number = req.query.number || 10;
        const apiKey = process.env.SPOONACULAR_API_KEY;

        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${number}&apiKey=${apiKey}`;
        console.log('🤝 spooncular URL:', url);
        const response = await fetch(url);
        console.log('🙌 spooncular response status:', response.status);
        if(!response.ok) {
            throw new Error(`☹️ Failed to fetch recipes: ${response.statusText}`);
        }
        const recipeData = await response.json();
        res.locals.recipes = recipeData;
        return next();
    } catch (err) {
        return next({
            log: '❌ Error in getRecipes',
            status: 500,
            message: {err: err.message},
        });
    }
};

    /* handle viewing recipe details */
recipeController.getRecipeDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const apiKey = process.env.SPOONACULAR_API_KEY;
        const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

        const response = await fetch(url);
        if(!response.ok) throw new Error(`☹️ Failed to fetch recipe details: ${response}`);

        const detailData = await response.json();
        res.locals.recipeDetails = {
            id: detailData.id,
            title: detailData.title,
            image: detailData.image,
            summary: detailData.summary,
            instructions: detailData.instructions,
            ingredients: detailData.extendedIngredients?.map(i => i.original) || [],
        };
        return next();
    } catch (err) {
        return next ({
            log: '❌ Error in getRecipeDetails',
            status: 500,
            message: { err: err.message },
        });
    }
};

    /* handle saving recipes */
recipeController.saveRecipe = async (req, res, next) => {
    try {
        const { id, title, ingredients } = req.body;

        if(!id || !title) {
            throw new Error('☹️ Missing required fields: ID or title')
        }
        const existingRecipe = await Recipe.findOne({ spoonacularId: id });
        if(existingRecipe) {
            res.locals.saved = existingRecipe;
            return next();
        }
        const newRecipe = await Recipe.create({
            spoonacularId: id,
            title,
            ingredients,  
        });
        res.locals.saved = newRecipe;
        return next();
    } catch (err) {
        return next ({
            log: '❌ Error in saveRecipes',
            status: 500,
            message: { err: err.message },
        });
    }
};
    /* handle getting saved recipes */
recipeController.getSavedRecipes = async (req, res, next) => {
    try {
        const savedRecipes = await Recipe.find({});
        res.locals.savedRecipes = savedRecipes;
        return next();
    } catch (err) {
        return next ({
            log: '❌ Error in getSavedRecipes',
            status: 500,
            message: { err: err.message },
        });
    }
};





export default recipeController;