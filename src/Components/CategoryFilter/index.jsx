function CategoryFilter({ categories, activeCategory, onCategoryClick }) {
  return (
    <div className="category-section">
      <div className="section-heading">
        <p>Filter meals</p>
        <h2>Browse by Category</h2>
      </div>

      <div className="category-list">
        <button
          type="button"
          className={
            activeCategory === "All"
              ? "category-btn active-category"
              : "category-btn"
          }
          onClick={() => onCategoryClick("All")}
        >
          All
        </button>
        {categories.slice(1).map((category) => (
          <button
            type="button"
            key={category.idCategory}
            className={
              activeCategory === category.strCategory
                ? "category-btn active-category"
                : "category-btn"
            }
            onClick={() => onCategoryClick(category.strCategory)}
          >
            {category.strCategory}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
