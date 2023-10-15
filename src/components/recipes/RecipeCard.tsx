import React from "react";
import { type RouterOutputs, type OneOf } from "~/utils/api";

type Recipe = OneOf<RouterOutputs["recipes"]["getAll"]>;

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  return (
    <div className="h-[128px] w-[128px] rounded-lg bg-white">{recipe.name}</div>
  );
}
