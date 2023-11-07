import React from "react";
import * as Select from "@radix-ui/react-select";
import { RiArrowDownSLine, RiCheckFill, RiSortDesc } from "react-icons/ri";

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

function SortSelection() {
  return (
    <div className="flex items-center space-x-2 justify-self-end">
      <span className="font-bold text-nobel-600">SORT BY</span>
      <Select.Root defaultValue="relevance">
        <Select.Trigger className="inline-flex items-center space-x-1 outline-none">
          <Select.Value />
          <Select.Icon>
            <RiArrowDownSLine />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden rounded border-[1px] border-nobel-500 bg-white">
            <Select.Viewport className="p-1.5">
              <SortOption value="relevance" label="Relevance" />
              <SortOption value="preparation-time" label="Preparation Time" />
              <SortOption value="servings" label="Servings" />
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

export default function SearchResults({
  children,
}: React.PropsWithChildren<{ count?: number }>) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <h2 className="text-2xl font-bold">Results</h2>
      <SortSelection />
      <div className="col-span-2">{children}</div>
    </div>
  );
}
