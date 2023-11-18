import React from "react";
import { type RouterOutputs } from "~/utils/api";
import RecipeCard from "~/components/recipes/RecipeCard";

interface Props {
  recipes?: RouterOutputs["recipes"]["search"]["recipes"];
}

export default function RecipeGrid({ recipes }: Props) {
  return (
    <div className="grid auto-rows-auto grid-cols-3 gap-5 lg:grid-cols-4">
      {recipes
        ? recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        : Array.from({ length: 48 }, (_, i) => (
            <div
              className="w-max-[100%] animate-pulse overflow-clip rounded bg-neutral-200"
              key={i}
            >
              <div className="aspect-square w-full"></div>
              <div className="h-16 w-full"></div>
            </div>
          ))}
    </div>
  );
}
