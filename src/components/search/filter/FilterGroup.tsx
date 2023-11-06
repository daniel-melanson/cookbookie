import React from "react";
import * as A from "@radix-ui/react-accordion";

export default function FilterGroup({ children }: React.PropsWithChildren) {
  return (
    <form className="flex min-w-[256px] flex-col space-y-1 ">
      <A.Root type="multiple">{children}</A.Root>
    </form>
  );
}
