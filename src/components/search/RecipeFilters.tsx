import React from "react";
import Slider from "~/components/search/Slider";
import CheckboxGroup from "~/components/search/CheckboxGroup";
import ToggleGroup, { ToggleItem } from "./ToggleGroup";
import {
  MdOutlineBreakfastDining,
  MdOutlineBrunchDining,
  MdOutlineCookie,
  MdOutlineDinnerDining,
  MdOutlineLunchDining,
} from "react-icons/md";
import { BiDrink } from "react-icons/bi";

export default function RecipeFilters() {
  const [servings, setServings] = React.useState(2);
  const [time, setTime] = React.useState(15);
  const [missingIngredients, setMissingIngredients] = React.useState(0);

  return (
    <form className="flex flex-col space-y-1 px-3 py-2">
      <Slider
        label="Servings"
        value={servings}
        min={1}
        max={6}
        step={1}
        onChange={setServings}
      />
      <ToggleGroup label="Allergens">
        <ToggleItem value="gluten-free">Gluten Free</ToggleItem>
        <ToggleItem value="dairy-free">Dairy Free</ToggleItem>
        <ToggleItem value="nut-free">Nut Free</ToggleItem>
        <ToggleItem value="egg-free">Egg Free</ToggleItem>
        <ToggleItem value="fish-free">Fish Free</ToggleItem>
      </ToggleGroup>
      <ToggleGroup label="Dietary Restrictions" type="single">
        <ToggleItem value="keto">Keto</ToggleItem>
        <ToggleItem value="kosher">Kosher</ToggleItem>
        <ToggleItem value="halal">Halal</ToggleItem>
        <ToggleItem value="vegetarian">Vegetarian</ToggleItem>
        <ToggleItem value="vegan">Vegan</ToggleItem>
      </ToggleGroup>
      <ToggleGroup label="Meal">
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
        <ToggleItem value="snack">
          <MdOutlineCookie /> Snack
        </ToggleItem>
        <ToggleItem value="drink">
          <BiDrink /> Drink
        </ToggleItem>
      </ToggleGroup>
      <Slider
        label="Time"
        hint="Maximum preparation time"
        value={time}
        min={15}
        max={120}
        transform={(v) => {
          if (v < 60) return `< ${v}m`;

          const hours = Math.floor(v / 60);
          const minutes = v % 60;
          const time = minutes > 0 ? `${hours}hr ${minutes}min` : `${hours}hr`;

          return v === 120 ? `+${time}` : `< ${time}`;
        }}
        step={15}
        onChange={setTime}
      />
      <Slider
        label="Missing Ingredients"
        hint={`Maxiumum number of ingredients missing from "My Pantry"`}
        value={missingIngredients}
        min={0}
        max={5}
        step={1}
        onChange={setMissingIngredients}
      />
    </form>
  );
}
