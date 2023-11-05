import React from "react";
import { type RouterOutputs } from "~/utils/api";
import RecipeCard from "~/components/recipes/RecipeCard";

interface Props {
  recipes: RouterOutputs["recipes"]["search"]["recipes"];
}

export default function RecipeGrid({ recipes }: Props) {
  return (
    <div className="col-span-3 grid grid-cols-3 gap-5 lg:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
