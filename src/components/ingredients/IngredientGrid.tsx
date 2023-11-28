import { type Ingredient } from "@prisma/client";
import React from "react";

const STUB_ARRAY = Array.from({ length: 48 }, (_, i) => i);

interface Props {
  ingredients?: Ingredient[];
}

export default function IngredientGrid({ ingredients }: Props) {
  return (
    <div className="grid auto-rows-auto grid-cols-3 gap-5 lg:grid-cols-4">
      {ingredients
        ? ingredients.map((ingredient) => (
            <div key={ingredient.id}>{JSON.stringify(ingredient)}</div>
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
