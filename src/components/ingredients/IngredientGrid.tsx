import { type Ingredient } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { faker } from "@faker-js/faker";

const STUB_ARRAY = Array.from({ length: 48 }, (_, i) => i);

function IngredientPill({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div className="m-1.5 flex h-10 items-center space-x-2 rounded-full bg-white p-2 pe-4 shadow">
      <Image
        width={32}
        height={32}
        className="h-8 w-8 rounded-full"
        src={ingredient.icon}
        alt={ingredient.name}
      />
      <span className="text-sm capitalize">{ingredient.name}</span>
    </div>
  );
}

interface Props {
  ingredients?: Ingredient[];
}

export default function IngredientGrid({ ingredients }: Props) {
  return (
    <div className="flex flex-wrap">
      {ingredients
        ? ingredients.map((ingredient) => (
            <IngredientPill key={ingredient.id} ingredient={ingredient} />
          ))
        : STUB_ARRAY.map((i) => {
            const width = faker.number.int({ min: 100, max: 255 });

            return (
              <div
                className="m-1.5 box-border animate-pulse rounded-full bg-neutral-200"
                style={{ width, height: "2.5rem" }}
                key={i}
              />
            );
          })}
    </div>
  );
}
