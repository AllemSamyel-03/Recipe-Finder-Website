import { Navigate } from "react-router-dom";
import { useRecipeContext } from "../../Context/RecipeContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useRecipeContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
