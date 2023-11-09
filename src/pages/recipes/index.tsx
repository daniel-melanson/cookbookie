import React from "react";
import NavigationBar from "~/components/NavigationBar";

import PageBase from "~/components/PageBase";
import RecipeGrid from "~/components/recipes/RecipeGrid";
import PageSelect from "~/components/search/PageSelect";

import { usePathname, useSearchParams } from "next/navigation";

import { api } from "~/utils/api";
import { z } from "zod";
import RecipeFilterForm, {
  type RecipeFilters,
} from "~/components/search/RecipeFilterForm";
import SearchResults from "~/components/search/SearchResults";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updateFilters = (filters: RecipeFilters) => {
    for (const [key, value] of Object.entries(filters)) {
      if (
        value === undefined ||
        ((Array.isArray(value) || typeof value === "string") &&
          value.length === 0)
      ) {
        // @ts-expect-error key is a valid key of filters
        delete filters[key];
      }
    }

    const hasFilters = Object.keys(filters).length > 0;
    if (hasFilters) {
      const params = new URLSearchParams(searchParams);
      params.set("f", btoa(JSON.stringify(filters)));

      void router.push(`${pathname}?${params.toString()}`);
    } else {
      void router.push(pathname);
    }
  };

  const { page, f } = z
    .object({
      page: z
        .string()
        .regex(/^\d+$/)
        .transform((v) => Number(v))
        .optional(),
      f: z.string().optional(),
    })
    .parse(Object.fromEntries(searchParams.entries()));

  const filters = (f ? JSON.parse(atob(f)) : {}) as RecipeFilters;

  const updatePageSearchParam = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));

    return params.toString();
  };

  console.log(filters);
  const query = api.recipes.search.useQuery({ page, ...filters });

  return (
    <PageBase title="Search">
      <NavigationBar includeSearch />
      <main className="mx-5 mt-5 flex min-h-screen flex-col content-center space-y-6">
        <div className="container mx-auto flex space-x-4">
          <RecipeFilterForm filters={filters} onChange={updateFilters} />
          <SearchResults>
            {<RecipeGrid recipes={query.isSuccess ? query.data.recipes : []} />}
          </SearchResults>
        </div>
        {query.isSuccess && (
          <PageSelect
            page={page ?? 1}
            totalPages={query.data.pageCount}
            createLink={(p) => `${pathname}?${updatePageSearchParam(p)}`}
          />
        )}
      </main>
    </PageBase>
  );
}
