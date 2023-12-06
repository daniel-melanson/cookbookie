import React from "react";
import Image from "next/image";
import IconToggle from "~/components/IconToggle";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { type Recipe } from "@prisma/client";

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  return (
    <div className="relative overflow-clip rounded-lg border border-transparent shadow hover:border-nobel-500">
      <IconToggle
        className="absolute right-2 top-2"
        line={<RiBookmarkLine />}
        fill={<RiBookmarkFill />}
      />
      <Image width={512} height={512} src={recipe.icon} alt={recipe.name} />
      <div className="h-16 bg-white p-2">
        <span className="text-sm capitalize">{recipe.name}</span>
      </div>
    </div>
  );
}
