import React from "react";

import RecipeFilterForm from "~/components/search/RecipeFilterForm";
import RecipeGrid from "~/components/recipes/RecipeGrid";
import SearchPage from "~/components/search/SearchPage";
import {
  integerParam,
  rangeParam,
  stringListParam,
  stringParam,
} from "~/utils/validators";
import { api } from "~/utils/api";

export default function Page() {
  return (
    <SearchPage
      useQuery={api.recipes.search.useQuery}
      makeGrid={(results) => <RecipeGrid recipes={results} />}
      filterForm={<RecipeFilterForm />}
      filterValidator={{
        dietaryRestriction: stringParam().optional(),
        servings: rangeParam().optional(),
        time: integerParam().optional(),
        missingIngredients: integerParam().optional(),
        allergens: stringListParam().optional(),
        meal: stringListParam().optional(),
        ingredients: stringListParam().optional(),
      }}
    />
  );
}
