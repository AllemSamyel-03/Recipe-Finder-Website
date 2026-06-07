import { useEffect, useState } from "react";
import CategoryFilter from "../../Components/CategoryFilter";
import EmptyView from "../../Components/EmptyView";
import Loading from "../../Components/Loading";
import RecipeCard from "../../Components/RecipeCard";
import SearchBar from "../../Components/SearchBar";
import ApiUrls from "../../utils/ApiUrls";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      setRecipes(data.meals || []);
    } catch (error) {
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const categoriesResponse = await fetch(ApiUrls.categories());
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData.categories || []);

      const randomList = await Promise.all(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(async () => {
          const response = await fetch(ApiUrls.randomRecipe());
          const data = await response.json();
          // console.log(data);
          return data.meals[0];
        }),
      );

      setRandomRecipes(randomList);
      setRecipes(randomList);
    } catch (error) {
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    const getSuggestions = async () => {
      if (searchText.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      const response = await fetch(ApiUrls.autoComplete(searchText));
      const data = await response.json();
      setSuggestions(data.meals || []);
    };

    const timerId = setTimeout(getSuggestions, 400);
    return () => clearTimeout(timerId);
  }, [searchText]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchText.trim() === "") {
      fetchInitialData();
      return;
    }

    setActiveCategory("All");
    setSuggestions([]);
    fetchRecipes(ApiUrls.searchRecipes(searchText));
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSearchText("");
    setSuggestions([]);

    if (category === "All") {
      fetchInitialData();
    } else {
      fetchRecipes(ApiUrls.categoryRecipes(category));
    }
  };

  const handleSuggestionClick = (recipeName) => {
    setSearchText(recipeName);
    setSuggestions([]);
    fetchRecipes(ApiUrls.searchRecipes(recipeName));
  };

  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="eyebrow">Find meals faster</h2>
          <h1>Search tasty recipes for every craving</h1>
          <p>
            Explore popular dishes, filter by category, view ingredients, and
            save your favorites in one simple recipe app.
          </p>
          <SearchBar
            searchText={searchText}
            suggestions={suggestions}
            onSearchTextChange={setSearchText}
            onSearchSubmit={handleSearchSubmit}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>
      </section>

      <section className="content-section">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />

        <div className="section-heading">
          <p>{activeCategory === "All" ? "Random picks" : activeCategory}</p>
          <h2>
            {activeCategory === "All" ? "Trending Recipes" : "Category Recipes"}
          </h2>
        </div>

        {loading ? (
          <Loading />
        ) : recipes.length > 0 ? (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        ) : (
          <EmptyView
            title="No recipes found"
            message="Try another recipe name or choose a category."
          />
        )}

        {randomRecipes.length > 0 && (
          <section className="random-strip">
            <div>
              <p className="eyebrow">Fresh inspiration</p>
              <h2>Random recipes update whenever you refresh Home.</h2>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

export default Home;
