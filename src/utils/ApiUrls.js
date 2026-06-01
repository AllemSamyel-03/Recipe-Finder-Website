const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const ApiUrls = {
  searchRecipes: (query) => `${BASE_URL}/search.php?s=${query}`,

  recipeDetails: (id) => `${BASE_URL}/lookup.php?i=${id}`,

  randomRecipe: () => `${BASE_URL}/random.php`,

  categoryRecipes: (category) => `${BASE_URL}/filter.php?c=${category}`,

  categories: () => `${BASE_URL}/categories.php`,

  areaRecipes: (area) => `${BASE_URL}/filter.php?a=${area}`,

  areasList: () => `${BASE_URL}/list.php?a=list`,

  ingredientsList: () => `${BASE_URL}/list.php?i=list`,

  firstLetterSearch: (letter) => `${BASE_URL}/search.php?f=${letter}`,

  similarRecipes: (category) => `${BASE_URL}/filter.php?c=${category}`,

  autoComplete: (query) => `${BASE_URL}/search.php?s=${query}`,

  ingredientsAndInstructions: (id) => `${BASE_URL}/lookup.php?i=${id}`,
};

export default ApiUrls;
