import { type Recipe } from "@prisma/client";
import React from "react";
import RecipeCard from "~/components/recipes/RecipeCard";

const STUB_ARRAY = Array.from({ length: 48 }, (_, i) => i);

interface Props {
  recipes?: Recipe[];
}

export default function RecipeGrid({ recipes }: Props) {
  return (
    <div className="grid auto-rows-auto grid-cols-3 gap-5 lg:grid-cols-4">
      {recipes
        ? recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        : STUB_ARRAY.map((i) => (
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
