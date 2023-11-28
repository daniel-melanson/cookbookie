import { type Ingredient } from "@prisma/client";
import React from "react";
import Image from "next/image";

const STUB_ARRAY = Array.from({ length: 48 }, (_, i) => i);

function IngredientPill({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div className="flex h-14 items-center space-x-2 rounded-full bg-white p-2">
      <Image
        width={48}
        height={48}
        className="h-12 w-12 rounded-full"
        src={ingredient.icon}
        alt={ingredient.name}
      />
      <span className="capitalize">{ingredient.name}</span>
    </div>
  );
}

interface Props {
  ingredients?: Ingredient[];
}

export default function IngredientGrid({ ingredients }: Props) {
  return (
    <div className="flex flex-wrap space-x-2 space-y-2">
      {ingredients
        ? ingredients.map((ingredient) => (
            <IngredientPill key={ingredient.id} ingredient={ingredient} />
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
