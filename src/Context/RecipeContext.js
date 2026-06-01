import { createContext, useContext } from "react";

export const RecipeContext = createContext(null);

export const useRecipeContext = () => useContext(RecipeContext);
