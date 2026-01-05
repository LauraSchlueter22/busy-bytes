import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

const RecipeDetails = () => {
  const navigate = useNavigate();
  const [viewfullRecipe, setViewFullRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchFullRecipeDetails = async () => {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        const fullRecipeDetails = await res.json();
        setViewFullRecipe(fullRecipeDetails);
      } catch (err) {
        console.error("❌ Error fetching full recipes:", err);
      }
    };
    fetchFullRecipeDetails();
  }, [id]);

  const handleSaveRecipe = async () => {
    try {
      const recipeToSave = {
        id: viewfullRecipe.id,
        title: viewfullRecipe.title,
        ingredients: viewfullRecipe.ingredients,
      };
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeToSave),
      });
      const savedData = await res.json();
    } catch (err) {
      console.error("❌ Error saving recipe:", err);
    }
  };
  
  return (
    <>
      <button className="home-button" onClick={() => navigate("/")}>
        Home
      </button>
      <div className="full-recipe-container">
        {viewfullRecipe ? (
          <>
            <h2>{viewfullRecipe.title}</h2>
            <img src={viewfullRecipe.image} alt={viewfullRecipe.title} />
            <div className="FR-button">
              <button onClick={handleSaveRecipe}>Save Recipe</button>
            </div>
            {parse(viewfullRecipe.instructions)}
            <ul>
              {viewfullRecipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>🍽️ loading full recipe 🍽️</p>
        )}
      </div>
    </>
  );
};

export default RecipeDetails;
