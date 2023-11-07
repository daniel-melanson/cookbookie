import React from "react";
import NavigationBar from "~/components/NavigationBar";

import PageBase from "~/components/PageBase";
import RecipeGrid from "~/components/recipes/RecipeGrid";
import PageSelect from "~/components/search/PageSelect";

import { usePathname, useSearchParams } from "next/navigation";

import { api } from "~/utils/api";
import { z } from "zod";
import RecipeFilters from "~/components/search/RecipeFilters";
import SearchResults from "~/components/search/SearchResults";

export default function Page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { page } = z
    .object({
      page: z
        .string()
        .min(1)
        .regex(/^\d+$/)
        .default("1")
        .transform((v) => Number(v)),
    })
    .parse(Object.fromEntries(searchParams.entries()));

  const updateSearchPram = (name: string, value: unknown) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, String(value));

    return params.toString();
  };

  const query = api.recipes.search.useQuery({ page });

  return (
    <PageBase title="Search">
      <NavigationBar includeSearch />
      <main className="mx-5 mt-5 flex min-h-screen flex-col content-center space-y-6">
        <div className="container mx-auto flex space-x-4">
          <RecipeFilters />
          <SearchResults>
            {query.isSuccess && <RecipeGrid recipes={query.data.recipes} />}
          </SearchResults>
        </div>
        {query.isSuccess && (
          <PageSelect
            page={page}
            totalPages={query.data.pageCount}
            createLink={(p) => `${pathname}?${updateSearchPram("page", p)}`}
          />
        )}
      </main>
    </PageBase>
  );
}
