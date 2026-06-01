import { Heart, Home, LogOut, Soup } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useRecipeContext } from "../../Context/RecipeContext";

function Navbar() {
  const { currentUser, favorites, logoutUser } = useRecipeContext();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo" onClick={scrollToTop}>
        <Soup size={28} />
        <span>Recipe Finder</span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" className="nav-link" onClick={scrollToTop}>
          <Home size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/favorites" className="nav-link" onClick={scrollToTop}>
          <Heart size={18} />
          <span>Favorites</span>
          <span className="fav-count">{favorites.length}</span>
        </NavLink>

        <span className="user-name">{currentUser?.name}</span>
        <button className="logout-btn" type="button" onClick={logoutUser}>
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
