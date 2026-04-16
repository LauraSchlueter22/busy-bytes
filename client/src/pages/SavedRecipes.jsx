import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchSavedRecipes();
  }, [token, navigate]);

  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch("/api/ai/recipes/saved", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setRecipes(data);
      }
    } catch (err) {
      setError("Failed to load saved recipes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }
    try {
      const response = await fetch(`/api/ai/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
        alert("Recipe deleted successfully! ✅");
      }
    } catch (err) {
      setError("Failed to delete recipe.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="saved-recipes-page">
        <p>Loading your saved recipes...</p>
      </div>
    );
  }
  return (
    <div className="saved-recipes-page">
      <h1>🥘 My Saved Recipes</h1>
      {error && <p className="error-message">{error}</p>}
      {recipes.length === 0 ? (
        <p className="no-recipes">No saved recipes yet. Start cooking!</p>
      ) : (
        <div className="saved-recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="saved-recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>

              <div className="recipe-info-small">
                {recipe.cookingTime && <span>⏱️ {recipe.cookingTime}</span>}
              </div>
              <div className="recipe-details-saved">
                <div className="ingredients-preview">
                  <h4>Ingredients:</h4>
                  <ul>
                    {recipe.ingredients
                      ?.slice(0, 5)
                      .map((ingredients, index) => (
                        <li key={index}>{ingredients}</li>
                      ))}
                    {recipe.ingredients?.length > 5 && (
                      <li>+ {recipe.ingredients.length - 5} more...</li>
                    )}
                  </ul>
                </div>
                {recipe.instructions && (
                  <div className="instructions-preview">
                    <h4>Instructions:</h4>
                    <ol>
                      {recipe.instructions.slice(0, 3).map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                      {recipe.instructions.length > 3 && (
                        <li>
                          + {recipe.instructions.length - 3} more steps...
                        </li>
                      )}
                    </ol>
                  </div>
                )}
              </div>
              <button
                className="delete-recipe-btn"
                onClick={() => deleteRecipe(recipe._id)}
              >
                🗑️ Delete Recipe
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedRecipes;
