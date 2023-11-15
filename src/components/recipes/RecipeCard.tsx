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
    <div className="relative overflow-clip rounded-lg">
      <IconToggle
        className="absolute right-2 top-2"
        line={<RiBookmarkLine />}
        fill={<RiBookmarkFill />}
      />
      <Image
        width={512}
        height={512}
        src={recipe.icon}
        alt={recipe.name}
      ></Image>
      <div className="h-16 bg-white p-2">
        <span className="text-sm capitalize">{recipe.name}</span>
      </div>
    </div>
  );
}
