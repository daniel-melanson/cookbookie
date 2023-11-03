import React from "react";
import { type RouterOutputs, type OneOf } from "~/utils/api";
import Image from "next/image";
import IconToggle from "~/components/IconToggle";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";

type Recipe = OneOf<RouterOutputs["recipes"]["search"]["recipes"]>;

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  return (
    <div className="relative flex flex-col rounded-lg shadow-lg shadow-neutral-300">
      <Image
        className="rounded-lg rounded-bl-none rounded-br-none"
        width={512}
        height={512}
        src={recipe.icon}
        alt={recipe.name}
      ></Image>
      <IconToggle
        className="absolute right-2 top-2"
        line={<RiBookmarkLine />}
        fill={<RiBookmarkFill />}
      />
      <div className="flex-grow rounded-lg rounded-tl-none rounded-tr-none bg-white p-1">
        <span className="text-sm capitalize">{recipe.name}</span>
      </div>
    </div>
  );
}
