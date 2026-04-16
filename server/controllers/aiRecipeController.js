import Anthropic from "@anthropic-ai/sdk";
import Recipe from "../models/recipeModel.js";

let anthropic;
function getAnthropicClient() {
  if (!anthropic) {
    anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }
  return anthropic;
}

export const generateRecipes = async (req, res) => {
  try {
    const { ingredients } = req.query;
    if (!ingredients) {
      return res.status(400).json({
        error: "Please provide ingredients",
      });
    }

    const message = await getAnthropicClient().messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,

      messages: [
        {
          role: "user",
          content: `Given these ingredients: ${ingredients}
                
generate 5 different recipe ideas. For each recipe, provide:
- title (string)
- description (brief, 1-2 sentences)
- cookingTime (e.g., "30 minutes")

return ONLY valid JSON in this exact format, no other text:
{
  "recipes": [
  {
    "title": "Recipe Name",
    "description": "Brief description",
    "cookingTime": "30 minutes"
   }
  ]
} `,
        },
      ],
    });

    const responseText = message.content[0].text;
    const cleanText = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const recipeData = JSON.parse(cleanText);
    res.json(recipeData);
  } catch (error) {
    console.error("Error generating recipes:", error);
    res.status(500).json({
      error: "Failed to generate recipes",
    });
  }
};

export const generateFullRecipe = async (req, res) => {
  try {
    const { ingredients, recipeName, dietaryRestrictions } = req.body;
    if (!ingredients || !recipeName) {
      return res.status(400).json({
        error: "Please provide ingredients and recipe name",
      });
    }
    let prompt = `Create a detailed recipe for "${recipeName}" using these ingredients: ${ingredients}.`;

    if (dietaryRestrictions) {
      prompt += `Make it ${dietaryRestrictions}.`;
    }
    prompt += `
        provide a complete recipe with:
        - title (string)
        - description (string, 2-3 sentences)
        - ingredients (array of strings with measurements, e.g., "2 cups rice")
        - instructions (array of strings, step-by-step)
        - cookingTime (string)
        - prepTime (string)
        - tips (array of helpful cooking tips)

        return ONLY valid JSON, no other text`;

    const message = await getAnthropicClient().messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].text;
    const cleanText = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const recipeData = JSON.parse(cleanText);
    res.json(recipeData);
  } catch (error) {
    console.error("Error generating full recipe details:", error);
    res.status(500).json({
      error: "Failed to generate full detailed recipe",
    });
  }
};

export const saveRecipe = async (req, res) => {
  try {
    const recipeData = req.body;
    if (
      !recipeData.title ||
      !recipeData.ingredients ||
      !recipeData.instructions
    ) {
      return res.status(400).json({
        error: "Missing required recipe fields",
      });
    }
    const newRecipe = new Recipe({
      title: recipeData.title,
      description: recipeData.description,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions,
      cookingTime: recipeData.cookingTime,
      prepTime: recipeData.prepTime,
      tips: recipeData.tips || [],
      userId: req.user.id,
    });

    const savedRecipe = await newRecipe.save();
    res.status(200).json({
      message: "Recipe saved successfully ✅",
      recipe: savedRecipe,
    });
  } catch (error) {
    console.error("Failed to save recipe:", error);
    res.status(500).json({
      error: "Failed to save recipe ❌",
    });
  }
};

export const getSavedRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    res.status(500).json({
      error: "Failed to fetch recipes",
    });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(400).json({
        error: "Recipe not found",
      });
    }

    res.json({
      message: "Recipe deleted successfully",
      recipe: deletedRecipe,
    });
  } catch (error) {
    console.error("Error deleting recipe", error);
    res.status(500).json({
      error: "Failed to delete recipe",
    });
  }
};
