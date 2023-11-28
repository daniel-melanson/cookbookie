import React from "react";
import Slider from "~/components/search/Slider";
import IngredientSearch from "~/components/search/IngredientSearch";
import ToggleGroup from "./toggle/ToggleGroup";
import ToggleItem from "./toggle/ToggleItem";
import {
  MdOutlineBreakfastDining,
  MdOutlineBrunchDining,
  MdOutlineCookie,
  MdOutlineDinnerDining,
  MdOutlineIcecream,
  MdOutlineLunchDining,
} from "react-icons/md";
import { BiDrink } from "react-icons/bi";
import FilterItem from "~/components/search/FilterItem";
import { formatTime } from "~/utils/formatters";
import FiltersLabel from "./FiltersLabel";
import {
  type RecipeFilters,
  makeFormEventFactories,
  useSearchArgs,
  useSearchArgsDispatch,
} from "~/contexts/SearchContext";

export type Range = [number, number];

export default function RecipeFilterForm() {
  const args = useSearchArgs<RecipeFilters>();
  const dispatch = useSearchArgsDispatch<RecipeFilters>();
  const {
    servings,
    time,
    missingIngredients,
    allergens,
    meal,
    dietaryRestriction,
    ingredients,
  } = args;

  const { onClearFactory, onChangeFactory, onAddFactory } =
    makeFormEventFactories<RecipeFilters>(args, dispatch);

  function hintFactory<T>(f: (_: NonNullable<T>) => string, value: T) {
    return value !== undefined ? f(value!) : undefined;
  }

  return (
    <form className="w-72 space-y-1">
      <FiltersLabel />
      <FilterItem
        label="Servings"
        onClear={onClearFactory("servings")}
        onAdd={onAddFactory("servings", [1, 12])}
        hint={hintFactory(
          (s) => `Between ${s[0]} and ${s[1]} servings.`,
          servings,
        )}
      >
        <Slider
          kind="range"
          key={servings?.join(",")}
          value={servings ?? [1, 12]}
          min={1}
          max={12}
          step={1}
          onChange={onChangeFactory("servings")}
        />
      </FilterItem>
      <FilterItem label="Allergens" onClear={onClearFactory("allergens")}>
        <ToggleGroup
          type="multiple"
          value={allergens}
          onValueChange={onChangeFactory("allergens")}
        >
          <ToggleItem value="gluten-free">Gluten Free</ToggleItem>
          <ToggleItem value="dairy-free">Dairy Free</ToggleItem>
          <ToggleItem value="nut-free">Nut Free</ToggleItem>
          <ToggleItem value="egg-free">Egg Free</ToggleItem>
          <ToggleItem value="fish-free">Fish Free</ToggleItem>
        </ToggleGroup>
      </FilterItem>
      <FilterItem
        label="Dietary Restrictions"
        onClear={onClearFactory("dietaryRestriction")}
      >
        <ToggleGroup
          type="single"
          value={dietaryRestriction}
          onValueChange={onChangeFactory("dietaryRestriction")}
        >
          <ToggleItem value="keto">Keto</ToggleItem>
          <ToggleItem value="kosher">Kosher</ToggleItem>
          <ToggleItem value="halal">Halal</ToggleItem>
          <ToggleItem value="vegetarian">Vegetarian</ToggleItem>
          <ToggleItem value="vegan">Vegan</ToggleItem>
        </ToggleGroup>
      </FilterItem>
      <FilterItem label="Meal" onClear={onClearFactory("meal")}>
        <ToggleGroup
          type="multiple"
          value={meal}
          onValueChange={onChangeFactory("meal")}
        >
          <ToggleItem value="breakfast">
            <MdOutlineBreakfastDining /> Breakfast
          </ToggleItem>
          <ToggleItem value="brunch">
            <MdOutlineBrunchDining /> Brunch
          </ToggleItem>
          <ToggleItem value="lunch">
            <MdOutlineLunchDining /> Lunch
          </ToggleItem>
          <ToggleItem value="dinner">
            <MdOutlineDinnerDining /> Dinner
          </ToggleItem>
          <ToggleItem value="dessert">
            <MdOutlineIcecream /> Dessert
          </ToggleItem>
          <ToggleItem value="snack">
            <MdOutlineCookie /> Snack
          </ToggleItem>
          <ToggleItem value="drink">
            <BiDrink /> Drink
          </ToggleItem>
        </ToggleGroup>
      </FilterItem>
      <FilterItem
        label="Preparation Time"
        onClear={onClearFactory("time")}
        onAdd={onAddFactory("time", 180)}
        hint={
          time !== undefined
            ? `At most ${formatTime(time, "long")}.`
            : undefined
        }
      >
        <Slider
          kind="single"
          key={time}
          value={time ?? 180}
          min={15}
          max={180}
          transform={(v) => formatTime(v, "short")}
          step={15}
          onChange={onChangeFactory("time")}
        />
      </FilterItem>
      <FilterItem
        label="Missing Ingredients"
        hint={
          missingIngredients === 0
            ? `Only using ingredients listed in "My Pantry".`
            : `Up to ${missingIngredients} ingredients missing from "My Pantry."`
        }
        onAdd={onAddFactory("missingIngredients", 0)}
        onClear={onClearFactory("missingIngredients")}
      >
        <Slider
          kind="single"
          key={missingIngredients}
          value={missingIngredients ?? 0}
          min={0}
          max={5}
          step={1}
          onChange={onChangeFactory("missingIngredients")}
        />
      </FilterItem>
      <FilterItem
        label="Ingredients"
        hint="Includes a specific set of ingredients."
        onClear={onClearFactory("ingredients")}
      >
        <IngredientSearch
          ingredientIds={ingredients ?? []}
          onChange={onChangeFactory("ingredients")}
        />
      </FilterItem>
    </form>
  );
}
