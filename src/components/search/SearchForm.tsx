import * as Form from "@radix-ui/react-form";
import React from "react";

import CheckBox from "~/components/search/CheckBox";

export default function SearchForm() {
  return (
    <Form.Root className="flex w-full flex-col">
      <label className="text-lg font-bold text-nobel-500">Meal</label>
      <div className="flex w-full flex-col space-y-1">
        <CheckBox label="Breakfast" />
        <CheckBox label="Lunch" />
        <CheckBox label="Dinner" />
        <CheckBox label="Snack" />
      </div>
    </Form.Root>
  );
}
