import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecipeContext } from "../../Context/RecipeContext";

function RecipeCard({ recipe }) {
  const { addOrRemoveFavorite, isFavorite } = useRecipeContext();
  const liked = isFavorite(recipe.idMeal);

  const favoriteRecipe = {
    idMeal: recipe.idMeal,
    strMeal: recipe.strMeal,
    strMealThumb: recipe.strMealThumb,
    strCategory: recipe.strCategory,
  };

  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.idMeal}`} className="recipe-image-wrap">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-image"
          loading="lazy"
        />
      </Link>

      <div className="recipe-card-body">
        <p className="recipe-category">{recipe.strCategory || "Meal"}</p>
        <h3>{recipe.strMeal}</h3>

        <div className="card-actions">
          <Link
            to={`/recipe/${recipe.idMeal}`}
            className="primary-btn small-btn"
          >
            View Recipe
          </Link>
          <button
            type="button"
            className={liked ? "favorite-btn active-fav" : "favorite-btn"}
            onClick={() => addOrRemoveFavorite(favoriteRecipe)}
            aria-label="Add to favorites"
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
