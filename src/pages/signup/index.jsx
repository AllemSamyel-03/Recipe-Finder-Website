import { useState } from "react";
import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { useRecipeContext } from "../../Context/RecipeContext";

function Signup() {
  const { signupUser } = useRecipeContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = signupUser(formData);

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <main className="auth-page signup-page">
      <section className="auth-intro">
        <div className="auth-brand intro-brand">
          <ChefHat size={38} />
          <span>Recipe Finder</span>
        </div>
        <h1>Start your recipe collection</h1>
        <p>
          Create an account to search recipes, check ingredients, and save meals
          you want to cook again.
        </p>
      </section>

      <section className="auth-box">
        <div className="auth-brand">
          <ChefHat size={34} />
          <span>Recipe Finder</span>
        </div>
        <h1>Create account</h1>
        <p className="auth-text">
          Sign up and start building your recipe collection.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength="4"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary-btn auth-btn">
            Create Account
          </button>
        </form>

        <p className="auth-link">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Signup;
