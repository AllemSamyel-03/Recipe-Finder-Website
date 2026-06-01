import { useState } from "react";
import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { useRecipeContext } from "../../Context/RecipeContext";

function Login() {
  const { loginUser } = useRecipeContext();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = loginUser(formData);

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <main className="auth-page login-page">
      <section className="auth-intro">
        <div className="auth-brand intro-brand">
          <ChefHat size={38} />
          <span>Recipe Finder</span>
        </div>
        <h1>Find your next favorite recipe</h1>
        <p>
          Login to explore meals, read simple cooking steps, and keep your
          favorite dishes saved for later.
        </p>
      </section>

      <section className="auth-box">
        <div className="auth-brand">
          <ChefHat size={34} />
          <span>Recipe Finder</span>
        </div>
        <h1>Welcome back</h1>
        <p className="auth-text">
          Login to search recipes and save your favorite dishes.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
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
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary-btn auth-btn">
            Login
          </button>
        </form>

        <p className="auth-link">
          New here? <Link to="/signup">Create account</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
