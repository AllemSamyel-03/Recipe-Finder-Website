import { Link } from "react-router-dom";
import EmptyView from "../../Components/EmptyView";
import RecipeCard from "../../Components/RecipeCard";
import { useRecipeContext } from "../../Context/RecipeContext";

function Favorites() {
  const { favorites } = useRecipeContext();

  return (
    <main className="content-section favorites-page">
      <div className="favorites-header">
        <div className="section-heading">
          <p>Saved dishes</p>
          <h1>Your Favorite Recipes</h1>
        </div>
        <div className="favorite-total">
          <span>{favorites.length}</span>
          <p>{favorites.length === 1 ? "dish saved" : "dishes saved"}</p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div>
          <EmptyView
            title="No favorites yet"
            message="Search recipes and tap the heart button to save dishes here."
          />
          <Link to="/">
            <div className="browse-btn">
              <button className="primary-btn inline-link">
                Browse Recipes
              </button>
            </div>
          </Link>
        </div>
      )}
    </main>
  );
}

export default Favorites;
