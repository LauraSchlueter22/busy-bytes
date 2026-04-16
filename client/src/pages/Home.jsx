import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const { token } = useAuth();

  const searchRecipes = async () => {
    if (!ingredients.trim()) {
      setError("Please enter some ingredients!");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/ai/recipes?ingredients=${encodeURIComponent(ingredients)}`,
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setRecipes(data.recipes || []);
      }
    } catch (err) {
      setError("Failed to generate recipes. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getDetailedRecipe = async (recipe) => {
    setDetailLoading(true);
    setSelectedRecipe(null);

    try {
      const response = await fetch("/api/ai/recipe/detailed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: ingredients,
          recipeName: recipe.title,
        }),
      });

      const data = await response.json();
      setSelectedRecipe(data);
    } catch (err) {
      setError("Failed to get recipe details. Please try again.");
      console.error(err);
    } finally {
      setDetailLoading(false);
    }
  };

  const saveRecipe = async (recipe) => {
    if (!token) {
      alert("Please login to save recipes!");
      return;
    }
    try {
      const response = await fetch("/api/ai/recipe/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipe),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        alert("Recipe saved successfully! ✅");
      }
    } catch (err) {
      setError("Failed to save recipe.");
      console.error(err);
    }
  };

  return (
    <div className="home-page">
      <h1> You got the ingredients. We got the recipes 🍛</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter ingredients (e.g., chicken, rice, broccoli)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchRecipes()}
          className="ingredient-input"
        />
        <button
          onClick={searchRecipes}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Generating..." : "Get Recipe Ideas"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}

      {!selectedRecipe && (
        <div className="recipes-grid">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="recipe-card"
              onClick={() => getDetailedRecipe(recipe)}
            >
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div className="recipe-meta">
                <span>⏱️ {recipe.cookingTime}</span>
              </div>
              <p className="click-hint">Click for full recipe! </p>
            </div>
          ))}
        </div>
      )}

      {detailLoading && (
        <div className="loading-container">
          <p>⏳ Generating your full recipe...</p>
        </div>
      )}

      {selectedRecipe && !detailLoading && (
        <div className="detailed-recipe">
          <button className="btn-back" onClick={() => setSelectedRecipe(null)}>
            Back to Results.
          </button>
          <h2>{selectedRecipe.title}</h2>
          <p className="recipe-description">{selectedRecipe.description}</p>
          <div className="recipe-info">
            <span>⏱️ Cook: {selectedRecipe.cookingTime}</span>
            <span>⏱️ Prep: {selectedRecipe.prepTime}</span>
          </div>
          <div className="recipe-sections">
            <div className="ingredients-section">
              <h3>🛒 Ingredients</h3>
              <ul>
                {selectedRecipe.ingredients?.map((ingredients, index) => (
                  <li key={index}>{ingredients}</li>
                ))}
              </ul>
            </div>
            <div className="instructions-section">
              <h3>🥣 Instructions</h3>
              <ol>
                {selectedRecipe.instructions?.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          {selectedRecipe.tips?.length > 0 && (
            <div className="tips-sections">
              <h3>💡 Tips & tricks</h3>
              <ul>
                {selectedRecipe.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            className="btn-save"
            onClick={() => saveRecipe(selectedRecipe)}
          >
            💾 Save Recipe
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
