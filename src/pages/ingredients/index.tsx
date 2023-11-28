import React from "react";

import SearchPage from "~/components/search/SearchPage";
import IngredientFilterForm from "~/components/search/IngredientFilterForm";
import IngredientGrid from "~/components/ingredients/IngredientGrid";
import { api } from "~/utils/api";

export default function Page() {
  return (
    <SearchPage
      useQuery={api.ingredients.search.useQuery}
      makeGrid={(results) => <IngredientGrid ingredients={results} />}
      filterForm={<IngredientFilterForm />}
      filterValidator={{}}
    />
  );
}
