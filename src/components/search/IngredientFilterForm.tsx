import React from "react";
import FiltersLabel from "./FiltersLabel";
import {
  type IngredientFilters,
  makeFormEventFactories,
  useSearchArgs,
  useSearchArgsDispatch,
} from "~/contexts/SearchContext";
import FilterItem from "./FilterItem";
import ToggleGroup from "./toggle/ToggleGroup";
import ToggleItem from "./toggle/ToggleItem";

function toDashCase(s: string) {
  return s.trim().replaceAll(/\s+/g, "-").toLowerCase();
}

export default function IngredientFilterForm() {
  const args = useSearchArgs<IngredientFilters>();
  const dispatch = useSearchArgsDispatch<IngredientFilters>();

  const CATEGORY_OPTIONS = [
    "Baked Goods",
    "Beverages",
    "Cereal, Grains, & Pasta",
    "Dairy & Eggs",
    "Fats & Oils",
    "Fish & Seafoods",
    "Fruits & Fruit Juices",
    "Legumes",
    "Nuts & Seeds",
    "Pork",
    "Poultry",
    "Potatoes & Yams",
    "Sausages & Deli Meats",
    "Soups, Sauces, & Gravies",
    "Spices & Herbs",
    "Sweets",
    "Vegetables",
  ];

  const { category } = args;

  const { onClearFactory, onChangeFactory, onAddFactory } =
    makeFormEventFactories(args, dispatch);

  return (
    <form className="max-w-[16rem] space-y-1">
      <FiltersLabel />
      <FilterItem label="Category" onClear={onClearFactory("category")}>
        <ToggleGroup
          type="single"
          value={category}
          onValueChange={onChangeFactory("category")}
        >
          {CATEGORY_OPTIONS.map((category) => (
            <ToggleItem key={toDashCase(category)} value={toDashCase(category)}>
              {category}
            </ToggleItem>
          ))}
        </ToggleGroup>
      </FilterItem>
    </form>
  );
}
