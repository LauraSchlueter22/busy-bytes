import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InspirationDropdown from "./InspirationDropdown";

// try and come back to use redux instead of react
function App() {
  const [view, setView] = useState("home");
  const [ingredientInput, setIngredientInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try { 
      const res = await fetch(`/api/recipes?ingredients=${ingredientInput}`);
      const recipeData = await res.json();
      setRecipes(recipeData);
    } catch (err) {
      console.log("❌ Error fetching recipes:", err);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const res = await fetch(`/api/recipes/${id}`);
      const detailData = await res.json();
      // console.log("🍽️ recipe details:", detailData);
    } catch (err) {
      console.error("❌ Error fetching recipe details:", err);
    }
  };

  const handleSaveRecipe = async (recipe) => {
    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });
      const savedRecipeData = await res.json();
      // console.log("✅ Saved recipe:", savedRecipeData);
    } catch (err) {
      console.error("❌ Error saving recipe:", err);
    }
  };

  return (
    <div>
      <header className="header">
        <h1>busyBytes</h1>
        <h2 className="subheader">Make the most of what you already have</h2>
        <p className="intro">Grab . Cook . Byte </p>
      </header>
      <div className="header-actions">
        <InspirationDropdown />
      </div>
      <nav className="nav-buttons">
        <button className="btn-login" onClick={() => setView("login")}>
          Login
        </button>
      </nav>
      <main>
        <p className="main">Let's start cooking!</p>
        <div className="input-section">
          <input
            type="text"
            placeholder="e.g. spinach, chicken, onion"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            Search Recipes
          </button>
        </div>
        <div className="recipe-results">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} />
              <button onClick={() => navigate(`/recipes/${recipe.id}`)}>
                Full Recipe
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
