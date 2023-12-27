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
import { type Recipe } from "@prisma/client";

export default function Page() {
  return (
    <SearchPage
      useSearch={(params) =>
        api.recipes.search.useQuery(params, { refetchOnWindowFocus: false })
      }
      makeGrid={(results?: Recipe[]) => <RecipeGrid recipes={results} />}
      useSuggestions={(q, enabled) =>
        api.recipes.getSearchSuggestions.useQuery(q, {
          enabled,
          refetchOnWindowFocus: false,
        })
      }
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
