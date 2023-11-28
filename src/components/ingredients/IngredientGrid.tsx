import { type Ingredient } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { faker } from "@faker-js/faker";

const STUB_ARRAY = Array.from({ length: 48 }, (_, i) => i);

function IngredientPill({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div className="m-1.5 flex h-14 items-center space-x-2 rounded-full bg-white p-2 pe-4 shadow">
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
                style={{ width, height: "3.5rem" }}
                key={i}
              />
            );
          })}
    </div>
  );
}
