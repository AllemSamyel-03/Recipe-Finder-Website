import { Home, Soup } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecipeContext } from "../../Context/RecipeContext";

function NotFound() {
  const { isAuthenticated } = useRecipeContext();

  return (
    <main
      className={
        isAuthenticated ? "not-found-page" : "not-found-page guest-not-found"
      }
    >
      <section className="not-found-card">
        {!isAuthenticated && (
          <div className="auth-brand not-found-logo">
            <Soup size={34} />
            <span>Recipe Finder</span>
          </div>
        )}
        <img
          src="https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&w=900&q=80"
          alt="Empty plate for recipe not found"
          className="not-found-image"
          loading="lazy"
        />
        <p className="eyebrow">404 error</p>
        <h1>Recipe page not found</h1>
        <p>
          The page you are looking for is missing. Go back home and search for
          something tasty.
        </p>
        <Link to="/" className="primary-btn">
          <Home size={18} />
          Home
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
