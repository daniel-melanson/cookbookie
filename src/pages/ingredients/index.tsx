import React from "react";

import SearchPage from "~/components/search/SearchPage";
import IngredientFilterForm from "~/components/search/IngredientFilterForm";
import IngredientGrid from "~/components/ingredients/IngredientGrid";
import { api } from "~/utils/api";
import { stringParam } from "~/utils/validators";
import { type Ingredient } from "@prisma/client";

export default function Page() {
  return (
    <SearchPage
      useSearch={(params) =>
        api.ingredients.search.useQuery(params, { refetchOnWindowFocus: false })
      }
      makeGrid={(results?: Ingredient[]) => (
        <IngredientGrid ingredients={results} />
      )}
      useSuggestions={(q, enabled) =>
        api.ingredients.getSearchSuggestions.useQuery(q, {
          enabled,
          refetchOnWindowFocus: false,
        })
      }
      filterForm={<IngredientFilterForm />}
      filterValidator={{
        category: stringParam().optional(),
      }}
    />
  );
}
