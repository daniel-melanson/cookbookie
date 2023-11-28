/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from "react";
import * as Select from "@radix-ui/react-select";
import { RiArrowDownSLine, RiCheckFill } from "react-icons/ri";
import {
  type SearchData,
  useSearchArgs,
  useSearchArgsDispatch,
  type SearchFilters,
} from "~/contexts/SearchContext";
import PageSelect from "./PageSelect";

function SortOption({ value, label }: { value: string; label: string }) {
  return (
    <Select.Item
      className="disable-select relative flex select-none items-center rounded pl-6 pr-2 outline-none hover:cursor-pointer data-[highlighted]:bg-nobel-500 data-[highlighted]:text-white"
      value={value}
    >
      <Select.ItemText>{label}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
        <RiCheckFill />
      </Select.ItemIndicator>
    </Select.Item>
  );
}

function SortSelection({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-end space-x-2 justify-self-end">
      <span className="font-bold text-nobel-600">SORT BY</span>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className="flex items-center space-x-1 outline-none">
          <Select.Value />
          <Select.Icon>
            <RiArrowDownSLine />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden rounded border-[1px] border-nobel-500 bg-white">
            <Select.Viewport className="p-1.5">
              <SortOption value="relevance" label="Relevance" />
              <SortOption value="popularity" label="Popularity" />
              <SortOption value="created-at" label="Newest" />
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

export interface SearchResultsProps {
  useQuery: (args: SearchData<SearchFilters>) => any;
  makeGrid: (results?: any[]) => React.ReactNode;
  createUpdatedSearchParams: (key: string, value: number | string) => string;
}

export default function SearchResults({
  makeGrid,
  createUpdatedSearchParams,
  useQuery,
}: SearchResultsProps) {
  const args = useSearchArgs();
  const dispatch = useSearchArgsDispatch();

  const query = useQuery(args);

  return (
    <div className="w-full space-y-4">
      <div className="flex place-content-between">
        <h2 className="text-2xl font-bold">
          {args.query ? `Results for "${args.query}"` : "Results"}
        </h2>
        <SortSelection
          value={args.sort ?? (args.query ? "relevance" : "popularity")}
          onChange={(v) => dispatch({ kind: "set", key: "sort", value: v })}
        />
      </div>
      {makeGrid(query.data?.results)}
      {query.isSuccess && (
        <PageSelect
          page={args.page ?? 1}
          totalPages={query.data.pageCount}
          createLink={(p) => createUpdatedSearchParams("page", p)}
        />
      )}
    </div>
  );
}
