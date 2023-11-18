import React from "react";
import * as T from "@radix-ui/react-toggle-group";

export default function ToggleGroup({
  children,
  ...props
}: T.ToggleGroupMultipleProps | T.ToggleGroupSingleProps) {
  props.value ??= props.type === "single" ? "" : [];
  return (
    <T.Root {...props} className="flex flex-wrap">
      {children}
    </T.Root>
  );
}
