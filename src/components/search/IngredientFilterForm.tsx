import React from "react";
import FiltersLabel from "./FiltersLabel";
import {
  type IngredientFilters,
  makeFormEventFactories,
  useSearchArgs,
  useSearchArgsDispatch,
} from "~/contexts/SearchContext";

export default function IngredientFilterForm() {
  const args = useSearchArgs<IngredientFilters>();
  const dispatch = useSearchArgsDispatch<IngredientFilters>();

  const { onClearFactory, onChangeFactory, onAddFactory } =
    makeFormEventFactories(args, dispatch);

  return (
    <form className="w-72 space-y-1">
      <FiltersLabel />
      
    </form>
  );
}
