import React from "react";
import Checkbox from "~/components/search/Checkbox";

function CheckboxGroup({
  options,
  label,
}: {
  label: string;
  options: string[];
}) {
  return (
    <>
      <h3 className="mb-1 text-xl font-bold text-nobel-800">{label}</h3>
      <div className="flex flex-col space-y-1">
        {...options.map((option) => <Checkbox key={option} label={option} />)}
      </div>
    </>
  );
}

export default function RecipeFilters() {
  return (
    <div className="rounded-lg bg-nobel-300 p-2">
      <CheckboxGroup
        label="Meal"
        options={["Breakfast", "Lunch", "Dinner", "Snack", "Drink"]}
      />
    </div>
  );
}
