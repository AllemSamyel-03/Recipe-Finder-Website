import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { RecipeContext } from "./Context/RecipeContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { getStorageData, setStorageData } from "./utils/localStorage";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() =>
    getStorageData("recipeCurrentUser", null),
  );
  const [favorites, setFavorites] = useState(() =>
    getStorageData("recipeFavorites", []),
  );

  const isAuthenticated = currentUser !== null;

  useEffect(() => {
    setStorageData("recipeFavorites", favorites);
  }, [favorites]);

  const signupUser = (userData) => {
    const users = getStorageData("recipeUsers", []);
    const userAlreadyExists = users.find(
      (user) => user.email === userData.email,
    );

    if (userAlreadyExists) {
      return { success: false, message: "User already exists. Please login." };
    }

    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    const updatedUsers = [...users, newUser];
    setStorageData("recipeUsers", updatedUsers);
    setStorageData("recipeCurrentUser", newUser);
    setCurrentUser(newUser);
    navigate("/");
    return { success: true, message: "Account created successfully." };
  };

  const loginUser = (loginData) => {
    const users = getStorageData("recipeUsers", []);
    const validUser = users.find(
      (user) =>
        user.email === loginData.email && user.password === loginData.password,
    );

    if (!validUser) {
      return { success: false, message: "Invalid email or password." };
    }

    setStorageData("recipeCurrentUser", validUser);
    setCurrentUser(validUser);
    navigate("/");
    return { success: true, message: "Login successful." };
  };

  const logoutUser = () => {
    localStorage.removeItem("recipeCurrentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  const addOrRemoveFavorite = (recipe) => {
    const recipeExists = favorites.find(
      (item) => item.idMeal === recipe.idMeal,
    );

    if (recipeExists) {
      setFavorites(favorites.filter((item) => item.idMeal !== recipe.idMeal));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const isFavorite = (idMeal) => {
    return favorites.some((recipe) => recipe.idMeal === idMeal);
  };

  const contextValue = {
    currentUser,
    isAuthenticated,
    favorites,
    signupUser,
    loginUser,
    logoutUser,
    addOrRemoveFavorite,
    isFavorite,
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {isAuthenticated && <Navbar />}
      <div className={isAuthenticated ? "app-main" : ""}>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <ProtectedRoute>
                <RecipeDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {isAuthenticated && <Footer />}
    </RecipeContext.Provider>
  );
}

export default App;
