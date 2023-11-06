import React from "react";
import * as T from "@radix-ui/react-toggle-group";

interface Props {
  type?: "single" | "multiple";
}

export default function ToggleGroup({
  type,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <T.Root type={type ?? "multiple"} className="flex flex-wrap">
      {children}
    </T.Root>
  );
}
