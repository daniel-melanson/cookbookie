import React from "react";
import { type RouterOutputs } from "~/utils/api";
import RecipeCard from "~/components/recipes/RecipeCard";

interface Props {
  recipes: RouterOutputs["recipes"]["getAll"];
}

export default function RecipeGrid({ recipes }: Props) {
  return (
    <div className="container flex flex-wrap justify-center">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
