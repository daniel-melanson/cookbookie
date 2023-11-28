import React from "react";
import {
  makeFormEventFactories,
  useFilters,
  useFiltersDispatch,
} from "~/contexts/FilterContext";
import FiltersLabel from "./FiltersLabel";

export default function IngredientFilterForm() {
  const filters = useFilters<IngredientFilters>();
  const dispatch = useFiltersDispatch();

  const { onClearFactory, onChangeFactory, onAddFactory } =
    makeFormEventFactories(filters, dispatch);

  return (
    <form className="w-72 space-y-1">
      <FiltersLabel
        showClear={Object.keys(filters).length > 0}
        onClear={() => dispatch({ kind: "clear" })}
      />
    </form>
  );
}
