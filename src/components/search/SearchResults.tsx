import React from "react";
import * as Select from "@radix-ui/react-select";
import { RiArrowDownSLine, RiCheckFill } from "react-icons/ri";

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
              <SortOption value="created-at" label="Created At" />
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

interface Props {
  count?: number;
  sort: string;
  query?: string;
  onSortChange: (v: string) => void;
}

export default function SearchResults({
  children,
  sort,
  query,
  onSortChange,
}: React.PropsWithChildren<Props>) {
  return (
    <div className="w-full space-y-4">
      <div className="flex place-content-between">
        <h2 className="text-2xl font-bold">
          {query ? `Results for "${query}"` : "Results"}
        </h2>
        <SortSelection value={sort} onChange={onSortChange} />
      </div>
      {children}
    </div>
  );
}
