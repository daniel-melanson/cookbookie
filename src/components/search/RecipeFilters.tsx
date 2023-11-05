import React from "react";
import Slider from "~/components/search/Slider";
import CheckboxGroup from "~/components/search/CheckboxGroup";

export default function RecipeFilters() {
  const [servings, setServings] = React.useState(2);
  const [time, setTime] = React.useState(15);
  const [missingIngredients, setMissingIngredients] = React.useState(0);

  return (
    <form className="flex flex-col space-y-1 px-3 py-2">
      <CheckboxGroup
        label="Meal"
        options={["Breakfast", "Lunch", "Dinner", "Snack", "Drink"]}
      />
      <CheckboxGroup
        label="Restrictions"
        options={["Keto", "Kosher", "Halal", "Vegetarian", "Vegan"]}
      />
      <CheckboxGroup
        label="Allergens"
        options={[
          "Gluten Free",
          "Dairy Free",
          "Nut Free",
          "Soy Free",
          "Egg Free",
          "Fish Free",
        ]}
      />
      <Slider
        label="Servings"
        value={servings}
        min={1}
        max={6}
        step={1}
        onChange={setServings}
      />
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
