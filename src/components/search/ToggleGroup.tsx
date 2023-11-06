import React from "react";
import * as T from "@radix-ui/react-toggle-group";
import FilterLabel from "~/components/search/FilterLabel";

interface Props {
  label: string;
  type?: "single" | "multiple";
  hint?: string;
}

export function ToggleItem({ children, ...props }: T.ToggleGroupItemProps) {
  return (
    <T.Item
      {...props}
      className="m-0.5 flex h-8 items-center space-x-1 rounded-full border-[1px] border-nobel-500 bg-white px-2 py-1 text-sm text-neutral-700 transition-colors hover:bg-nobel-300 data-[state=on]:bg-nobel-500 data-[state=on]:text-white"
    >
      {React.Children.map(children, (child) =>
        typeof child === "string" ? <span>{child.trim()}</span> : child,
      )}
    </T.Item>
  );
}

export default function ToggleGroup({
  label,
  hint,
  type,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <div>
      <FilterLabel label={label} hint={hint} />
      <T.Root type={type ?? "multiple"} className="flex flex-wrap">
        {children}
      </T.Root>
    </div>
  );
}
