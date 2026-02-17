import { useState } from "react";

function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchRecipes = async () => {
    if (!ingredients.trim()) {
      setError("Please enter some ingredients!");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/ai/recipes?ingredients=${encodedURIComponent(ingredients)}",
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
  return (
    <div className="home-page">
      <h1> 🍛 Find Recipes from Your Ingredients</h1>
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
      <div className="recipes-grid">
        {recipes.map((recipe, index) => {
          <div key={index} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <div className="recipe-meta">
              <span>⏱️ {recipe.cookingTime}</span>
            </div>
          </div>;
        })}
      </div>
    </div>
  );
}

export default Home;
