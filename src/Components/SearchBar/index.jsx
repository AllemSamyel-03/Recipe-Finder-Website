import { Search } from "lucide-react";

function SearchBar({
  searchText,
  suggestions,
  onSearchTextChange,
  onSearchSubmit,
  onSuggestionClick,
}) {
  return (
    <div className="search-area">
      <form className="search-form" onSubmit={onSearchSubmit}>
        <Search size={21} />
        <input
          type="text"
          value={searchText}
          placeholder="Search recipes like pasta, chicken, biryani..."
          onChange={(event) => onSearchTextChange(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.slice(0, 6).map((recipe) => (
            <li key={recipe.idMeal}>
              <button
                type="button"
                onClick={() => onSuggestionClick(recipe.strMeal)}
              >
                {recipe.strMeal}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
