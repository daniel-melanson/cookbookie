import React from "react";
import NavigationBar from "~/components/NavigationBar";
import NavBarSearch from "~/components/NavBarSearch";

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

  const { p, f, s, q } = z
    .object({
      p: z
        .string()
        .regex(/^\d+$/)
        .transform((v) => Number(v))
        .optional(),
      q: z.string().optional(),
      f: z.string().optional(),
      s: z.enum(["relevance", "popularity", "created-at"]).optional(),
    })
    .parse(Object.fromEntries(searchParams.entries()));

  const filters = (f ? JSON.parse(atob(f)) : {}) as RecipeFilters;

  const createUpdatedSearchParam = (key: string, value: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, String(value));

    return params.toString();
  };

  const query = api.recipes.search.useQuery({
    page: p,
    query: q,
    filters: { ...filters },
    orderBy: s,
  });

  return (
    <PageBase title="Search">
      <NavigationBar>
        <NavBarSearch
          target="recipes"
          query={q}
          createSubmitLink={(q) =>
            `${pathname}?${createUpdatedSearchParam("q", q)}`
          }
        />
      </NavigationBar>
      <main className="mx-5 mt-5 min-h-screen content-center space-y-6">
        <div className="container mx-auto flex space-x-4">
          <RecipeFilterForm filters={filters} onChange={updateFilters} />
          <SearchResults
            sort={s ?? (q ? "relevance" : "popularity")}
            onSortChange={(v) =>
              void router.push(
                `${pathname}?${createUpdatedSearchParam("s", v)}`,
              )
            }
          >
            <RecipeGrid
              recipes={query.isSuccess ? query.data.recipes : undefined}
            />
          </SearchResults>
        </div>
        {query.isSuccess && (
          <PageSelect
            page={p ?? 1}
            totalPages={query.data.pageCount}
            createLink={(p) =>
              `${pathname}?${createUpdatedSearchParam("p", p)}`
            }
          />
        )}
      </main>
    </PageBase>
  );
}
