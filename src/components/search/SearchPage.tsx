import React from "react";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { P, match } from "ts-pattern";
import { type ZodRawShape, z } from "zod";

import SearchResults, {
  type SearchResultsProps,
} from "~/components/search/SearchResults";
import NavigationBar from "~/components/NavigationBar";
import PageBase from "~/components/PageBase";

import {
  SearchArgsProvider,
  type SearchFilters,
  type SearchData,
  type SearchReducer,
} from "~/contexts/SearchContext";
import { integerParam, param, stringParam } from "~/utils/validators";

type Props<T extends ZodRawShape> = {
  filterForm: React.ReactNode;
  filterValidator: T;
} & Omit<SearchResultsProps, "createUpdatedSearchParams">;

export default function Page<T extends ZodRawShape>({
  filterForm,
  filterValidator,
  makeGrid,
  useQuery,
}: Props<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchArgs = z
    .object({
      page: integerParam().optional(),
      query: stringParam().optional(),
      sort: param(z.enum(["relevance", "popularity", "created-at"])).optional(),
      ...filterValidator,
    })
    .parse(
      (() => {
        const params: Record<string, string[]> = {};

        for (const key of searchParams.keys()) {
          params[key] = searchParams.getAll(key);
        }
        return params;
      })(),
    ) as SearchData<SearchFilters>;

  const updateSearchParam = (key: string, value: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, String(value));

    return `${pathname}?${params.toString()}`;
  };

  const reducer: SearchReducer<SearchFilters> = (state, action) => {
    const searchArgs = match(action)
      .with({ kind: "reset", key: "page" }, () => ({ ...state, page: 1 }))
      .with({ kind: "reset", key: P.string }, ({ key }) => ({
        ...state,
        [key]: undefined,
        page: undefined,
      }))
      .with({ kind: "set", key: "page", value: P.any }, ({ value }) => ({
        ...state,
        page: value,
      }))
      .with({ kind: "set", key: P.string, value: P.any }, ({ key, value }) => ({
        ...state,
        [key]: value,
        page: undefined,
      }))
      .with({ kind: "reset" }, () => ({
        page: undefined,
        query: state.query,
        sort: state.sort,
      }))
      .exhaustive();

    const params = new URLSearchParams();
    Object.entries(searchArgs).forEach(([key, value]) => {
      if (value === undefined) return;

      if (Array.isArray(value)) {
        for (const v of value) {
          params.append(key, String(v));
        }
      } else if (["number", "string", "boolean"].includes(typeof value)) {
        params.set(key, String(value));
      }
    });

    const stringParams = params.toString();
    if (stringParams.length > 0) {
      void router.replace(`${pathname}?${stringParams}`);
    } else {
      void router.replace(pathname);
    }

    return searchArgs as SearchData<SearchFilters>;
  };

  return (
    <PageBase title="Search">
      <SearchArgsProvider
        key={searchParams.toString()}
        reducer={reducer}
        initialValue={searchArgs}
      >
        <NavigationBar />
        <main className="mx-5 mt-5 min-h-screen content-center space-y-6">
          <div className="container mx-auto flex space-x-4">
            {filterForm}
            <SearchResults
              useQuery={useQuery}
              makeGrid={makeGrid}
              createUpdatedSearchParams={updateSearchParam}
            />
          </div>
        </main>
      </SearchArgsProvider>
    </PageBase>
  );
}
