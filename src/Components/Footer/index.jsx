import { Mail, Phone, Soup } from "lucide-react";
import { NavLink } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-brand">
        <NavLink to="/" className="logo" onClick={scrollToTop}>
          <Soup size={28} />
          <span>Recipe Finder</span>
        </NavLink>
        <p>
          Simple recipes, saved favorites, and fresh meal ideas in one place.
        </p>
      </div>

      <div className="footer-links">
        <h3>Quick Links</h3>
        <NavLink to="/" onClick={scrollToTop}>
          Home
        </NavLink>
        <NavLink to="/favorites" onClick={scrollToTop}>
          Favorites
        </NavLink>
      </div>

      <div className="footer-contact">
        <h3>Contact</h3>
        <p>
          <Mail size={17} />
          recipefinder@gmail.com
        </p>
        <p>
          <Phone size={17} />
          +91 98765 43210
        </p>
      </div>
    </footer>
  );
}

export default Footer;
