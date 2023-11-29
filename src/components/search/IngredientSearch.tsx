import React from "react";
import { type OneOf, type RouterOutputs, api } from "~/utils/api";
import { useDebounce } from "@uidotdev/usehooks";
import * as S from "@radix-ui/react-scroll-area";
import { RiAddFill, RiSubtractLine } from "react-icons/ri";

export type IngredientEmbed = OneOf<
  RouterOutputs["ingredients"]["embedSearch"]
>;

function IngredientResults({
  ingredients,
  onSelect,
}: {
  ingredients: IngredientEmbed[];
  onSelect: (ingredient: IngredientEmbed) => void;
}) {
  return (
    <div className="absolute top-7">
      <S.Root className="h-[225px] overflow-hidden rounded border-[1px] border-nobel-600 bg-white shadow-lg">
        <S.Viewport className="h-full w-full rounded">
          <div className="px-4 py-2.5">
            {ingredients.map((ingredient) => (
              <div
                className="flex items-center justify-between border-b-[1px] border-neutral-200 p-1 text-sm capitalize hover:cursor-pointer hover:rounded hover:bg-nobel-500 hover:text-white"
                onClick={() => onSelect(ingredient)}
                key={ingredient.id}
              >
                {ingredient.name}
                <RiAddFill className="min-w-[16px]" />
              </div>
            ))}
          </div>
        </S.Viewport>
        <S.Scrollbar
          className="flex w-2.5 touch-none select-none p-0.5 transition-colors duration-[160ms]  ease-out"
          orientation="vertical"
        >
          <S.Thumb className="flex-1 rounded-[10px] bg-nobel-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
        </S.Scrollbar>
      </S.Root>
    </div>
  );
}

function IngredientPill({
  ingredient,
  onRemove,
}: {
  ingredient: IngredientEmbed;
  onRemove: () => void;
}) {
  return (
    <div
      className="disable-select m-0.5 flex h-fit items-center space-x-2 rounded-full border-[1px] border-nobel-500 bg-white px-2 py-1 text-sm capitalize text-neutral-700 transition-colors hover:bg-nobel-200"
      key={ingredient.id}
    >
      <span>{ingredient.name}</span>
      <button
        type="button"
        className="man-w-[16px] text-red-400"
        onClick={() => onRemove()}
      >
        <RiSubtractLine />
      </button>
    </div>
  );
}

const cache = new Map<string, IngredientEmbed>();

export default function IngredientSearch({
  ingredientIds,
  onChange,
}: {
  ingredientIds: string[];
  onChange: (ingredients: string[]) => void;
}) {
  const ingredientIdSet = new Set(ingredientIds);

  const ingredients: IngredientEmbed[] = [];
  const uncovered: string[] = [];
  for (const id of ingredientIds) {
    if (cache.has(id)) {
      ingredients.push(cache.get(id)!);
    } else {
      uncovered.push(id);
    }
  }

  const uncoveredQuery = api.ingredients.getEmbeds.useQuery(uncovered, {
    enabled: uncovered.length > 0,
  });

  if (uncoveredQuery.isSuccess) {
    for (const ingredient of uncoveredQuery.data) {
      cache.set(ingredient.id, ingredient);
      ingredients.push(ingredient);
    }
  }

  ingredients.sort((a, b) => a.name.length - b.name.length);

  const [filter, setFilter] = React.useState("");
  const debouncedFilter = useDebounce(filter, 500);
  const searchQuery = api.ingredients.embedSearch.useQuery(debouncedFilter, {
    enabled: debouncedFilter.length > 0,
  });

  return (
    <div className="relative space-y-2">
      <input
        className="h-7 w-full rounded border-[1px] border-nobel-500 px-1 py-1 text-sm outline-none disabled:bg-neutral-200"
        value={filter}
        disabled={ingredientIds.length >= 5}
        placeholder="Add ingredients..."
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="flex flex-wrap p-1">
        {ingredients.map((ingredient) => (
          <IngredientPill
            key={ingredient.id}
            ingredient={ingredient}
            onRemove={() =>
              onChange(ingredientIds.filter((id) => id !== ingredient.id))
            }
          />
        ))}
      </div>
      {searchQuery.isSuccess && filter !== "" && (
        <IngredientResults
          ingredients={searchQuery.data.filter(
            ({ id }) => !ingredientIdSet.has(id),
          )}
          onSelect={(ingredient) => {
            setFilter("");

            cache.set(ingredient.id, ingredient);

            onChange([...ingredientIds, ingredient.id]);
          }}
        />
      )}
    </div>
  );
}
