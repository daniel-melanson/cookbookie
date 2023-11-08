import React from "react";
import RangeSlider from "~/components/search/RangeSlider";
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
import FilterItem from "~/components/search/filter/FilterItem";

export default function RecipeFilters() {
  type Range = [number, number] | undefined;
  const [servings, setServings] = React.useState<Range>();
  const [time, setTime] = React.useState<Range>();
  const [missingIngredients, setMissingIngredients] = React.useState<Range>();

  return (
    <form className="flex min-w-[256px] flex-col space-y-1">
      <FilterItem label="Servings">
        <RangeSlider
          value={servings}
          min={1}
          max={12}
          step={1}
          onChange={setServings}
        />
      </FilterItem>
      <FilterItem label="Allergens">
        <ToggleGroup>
          <ToggleItem value="gluten-free">Gluten Free</ToggleItem>
          <ToggleItem value="dairy-free">Dairy Free</ToggleItem>
          <ToggleItem value="nut-free">Nut Free</ToggleItem>
          <ToggleItem value="egg-free">Egg Free</ToggleItem>
          <ToggleItem value="fish-free">Fish Free</ToggleItem>
        </ToggleGroup>
      </FilterItem>
      <FilterItem label="Dietary Restrictions">
        <ToggleGroup type="single">
          <ToggleItem value="keto">Keto</ToggleItem>
          <ToggleItem value="kosher">Kosher</ToggleItem>
          <ToggleItem value="halal">Halal</ToggleItem>
          <ToggleItem value="vegetarian">Vegetarian</ToggleItem>
          <ToggleItem value="vegan">Vegan</ToggleItem>
        </ToggleGroup>
      </FilterItem>
      <FilterItem label="Meal">
        <ToggleGroup>
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
      <FilterItem label="Preparation Time">
        <RangeSlider
          value={time}
          min={15}
          max={180}
          transform={(v) => {
            if (v < 60) return `${v}m`;

            const hours = Math.floor(v / 60);
            const minutes = v % 60;
            return minutes > 0 ? `${hours}hr ${minutes}min` : `${hours}hr`;
          }}
          step={15}
          onChange={setTime}
        />
      </FilterItem>
      <FilterItem
        label="Missing Ingredients"
        hint={`Maximum number of ingredients missing from "My Pantry".`}
      >
        <RangeSlider
          value={missingIngredients}
          min={0}
          max={5}
          step={1}
          onChange={setMissingIngredients}
        />
      </FilterItem>
      <FilterItem
        label="Ingredients"
        hint="Includes a specific set of ingredients."
      >
        <IngredientSearch />
      </FilterItem>
    </form>
  );
}
