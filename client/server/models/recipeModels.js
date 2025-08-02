import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    spoonacularId: { type: Number, required: true, unique: true },
    title: String,
    // image: String,
    // sourceURl: String,
    ingredients: [String],
    // spoonacularID: Number,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;