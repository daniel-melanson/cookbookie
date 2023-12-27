import React from "react";
import Select from "react-select";
import { api } from "~/utils/api";
import { useDebounce } from "@uidotdev/usehooks";
import { RiSubtractLine } from "react-icons/ri";

interface Embed {
  id: string;
  name: string;
}

function IngredientPill({
  ingredient,
  onRemove,
}: {
  ingredient: Embed;
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

const cache = new Map<string, Embed>();

export default function IngredientSearch({
  ingredientIds,
  onChange,
}: {
  ingredientIds: string[];
  onChange: (ingredients: string[]) => void;
}) {
  const ingredientIdSet = new Set(ingredientIds);

  const ingredients: Embed[] = [];
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

  const [input, setInput] = React.useState("");
  const debouncedInput = useDebounce(input, 300);

  const isEnabled = debouncedInput.length > 0;
  const suggestionsQuery = api.ingredients.getSearchSuggestions.useQuery(
    debouncedInput,
    { enabled: isEnabled, refetchOnWindowFocus: false },
  );

  return (
    <div className="relative space-y-2">
      <Select
        isMulti
        isClearable
        isSearchable
        hideSelectedOptions
        closeMenuOnSelect={false}
        placeholder="Add ingredients..."
        inputValue={input}
        isLoading={isEnabled && suggestionsQuery.isLoading}
        onInputChange={setInput}
        value={ingredients.map(({ id, name }) => ({ value: id, label: name }))}
        onChange={(values) => {
          onChange(values.map(({ value }) => value));
        }}
        options={
          suggestionsQuery.data?.map(({ id, name }) => ({
            value: id,
            label: name,
          })) ?? []
        }
        styles={{
          control: (provided) => ({
            ...provided,
          }),
          option: (base) => ({
            ...base,
            textTransform: "capitalize",
          }),
          menu: (base) => ({
            ...base,
            borderColor: "rgb(159 148 148)",
          }),
          multiValue: (base) => ({
            ...base,
            textTransform: "capitalize",
          }),
          multiValueRemove: (base) => ({
            ...base,
            backgroundColor: "transparent",
          }),
        }}
      />
      {/* <div className="flex flex-wrap p-1"> */}
      {/*   {ingredients.map((ingredient) => ( */}
      {/*     <IngredientPill */}
      {/*       key={ingredient.id} */}
      {/*       ingredient={ingredient} */}
      {/*       onRemove={() => */}
      {/*         onChange(ingredientIds.filter((id) => id !== ingredient.id)) */}
      {/*       } */}
      {/*     /> */}
      {/*   ))} */}
      {/* </div> */}
    </div>
  );
}
