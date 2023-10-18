import React from "react";
import NavigationBar from "~/components/NavigationBar";

import PageBase from "~/components/PageBase";
import RecipeGrid from "~/components/recipes/RecipeGrid";

import { api } from "~/utils/api";

export default function Page() {
  const query = api.recipes.getAll.useQuery();
  if (query.isLoading) return;

  return (
    <PageBase title="Search">
      <NavigationBar includeSearch />
      <main className="flex justify-center lg:m-5 lg:mb-0">
        {/* <div className="flex  w-64 rounded-lg bg-nobel-200 p-4"> */}
        {/*   <SearchForm /> */}
        {/* </div> */}
        <RecipeGrid recipes={query.data!} />
      </main>
    </PageBase>
  );
}
