import React from "react";
import { type RouterOutputs, type OneOf } from "~/utils/api";
import Image from "next/image";
import IconToggle from "~/components/IconToggle";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";

type Recipe = OneOf<RouterOutputs["recipes"]["getAll"]>;

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  return (
    <div className="xm:w-1/2 relative flex w-full flex-col rounded-lg transition-shadow hover:shadow-lg hover:shadow-neutral-400 md:m-3 md:w-1/5">
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
