import React from "react";
import SearchBar from "./SearchBar";
import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "next/router";

interface SearchSuggestion {
  id: string;
  name: string;
  icon: string;
}

export interface NavigationBarSearchProps {
  initialQuery?: string;
  useSuggestions: (
    query: string,
    enabled: boolean,
  ) => UseTRPCQueryResult<SearchSuggestion[], unknown>;
  createUpdatedQueryParamURL: (query: string) => string;
}

export default function NavigationBarSearch({
  useSuggestions,
  createUpdatedQueryParamURL,
  initialQuery,
}: NavigationBarSearchProps) {
  const router = useRouter();

  const [value, setValue] = React.useState(initialQuery ?? "");

  const debouncedValue = useDebounce(value, 300);
  const query = useSuggestions(debouncedValue, debouncedValue.length > 3);

  return (
    <SearchBar
      className="h-10 w-1/2 xl:w-1/4"
      value={value}
      onChange={setValue}
      onSubmit={(value) => void router.push(createUpdatedQueryParamURL(value))}
      suggestions={
        query.isSuccess
          ? query.data.map(({ name, id }) => ({ key: id, value: name }))
          : []
      }
    />
  );
}
