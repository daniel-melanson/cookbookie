import * as Form from "@radix-ui/react-form";
import React from "react";
import NavigationBar from "~/components/NavigationBar";

import PageBase from "~/components/PageBase";
import RecipeCard from "~/components/recipes/RecipeCard";
import SearchForm from "~/components/search/SearchForm";

import { api } from "~/utils/api";

export default function Page() {
  const query = api.recipes.getAll.useQuery();
  if (query.isLoading) return <div>Loading...</div>;

  return (
    <PageBase title="Search">
      <NavigationBar />
      <main className="flex lg:m-5 lg:mb-0">
        <div className="flex h-64 w-64 rounded-lg bg-nobel-200 p-4">
          <SearchForm />
        </div>
        <div className="ml-4 grid flex-grow grid-cols-5 gap-4">
          {query.data?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </PageBase>
  );
}
