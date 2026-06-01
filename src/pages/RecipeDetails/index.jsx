import { useEffect, useState } from "react";
import { Heart, PlayCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import EmptyView from "../../Components/EmptyView";
import Loading from "../../Components/Loading";
import RecipeCard from "../../Components/RecipeCard";
import { useRecipeContext } from "../../Context/RecipeContext";
import ApiUrls from "../../utils/ApiUrls";

function RecipeDetails() {
  const { id } = useParams();
  const { addOrRemoveFavorite, isFavorite } = useRecipeContext();
  const [recipe, setRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipeDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(ApiUrls.recipeDetails(id));
        const data = await response.json();
        const selectedRecipe = data.meals ? data.meals[0] : null;
        setRecipe(selectedRecipe);

        if (selectedRecipe?.strCategory) {
          const similarResponse = await fetch(
            ApiUrls.similarRecipes(selectedRecipe.strCategory),
          );
          const similarData = await similarResponse.json();
          const filteredRecipes = (similarData.meals || []).filter(
            (item) => item.idMeal !== selectedRecipe.idMeal,
          );
          setSimilarRecipes(filteredRecipes.slice(0, 4));
        }
      } catch (error) {
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    getRecipeDetails();
  }, [id]);

  const getIngredients = () => {
    const ingredients = [];

    for (let index = 1; index <= 20; index += 1) {
      const ingredient = recipe[`strIngredient${index}`];
      const measure = recipe[`strMeasure${index}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }

    return ingredients;
  };

  if (loading) {
    return <Loading text="Loading recipe details..." />;
  }

  if (!recipe) {
    return (
      <EmptyView
        title="Recipe not found"
        message="The selected recipe is not available right now."
      />
    );
  }

  const liked = isFavorite(recipe.idMeal);

  return (
    <main className="details-page">
      <section className="details-hero">
        <div className="details-image-wrap">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="details-image"
            loading="lazy"
          />
        </div>

        <div className="details-info">
          <p className="recipe-category">{recipe.strCategory}</p>
          <h1>{recipe.strMeal}</h1>
          <p>
            {recipe.strArea} style recipe with simple ingredients and clear
            cooking instructions.
          </p>

          <div className="details-actions">
            <button
              type="button"
              className={liked ? "primary-btn liked-btn" : "primary-btn"}
              onClick={() => addOrRemoveFavorite(recipe)}
            >
              <Heart size={18} fill={liked ? "currentColor" : "none"} />
              {liked ? "Saved Favorite" : "Add Favorite"}
            </button>
            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="secondary-btn"
              >
                <PlayCircle size={18} />
                Watch Video
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="details-layout">
        <div className="ingredients-box">
          <h2>Ingredients</h2>
          <ul>
            {getIngredients().map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="instructions-box">
          <h2>Cooking Instructions</h2>
          <p>{recipe.strInstructions}</p>
        </div>
      </section>

      <section className="content-section similar-section">
        <div className="section-heading">
          <p>More like this</p>
          <h2>Similar Recipes</h2>
        </div>

        {similarRecipes.length > 0 ? (
          <div className="recipe-grid">
            {similarRecipes.map((item) => (
              <RecipeCard key={item.idMeal} recipe={item} />
            ))}
          </div>
        ) : (
          <Link to="/" className="secondary-btn inline-link">
            Explore more recipes
          </Link>
        )}
      </section>
    </main>
  );
}

export default RecipeDetails;
