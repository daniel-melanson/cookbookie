import React from "react";

export default function FilterGroup({ children }: React.PropsWithChildren) {
  return (
    <form className="flex min-w-[256px] flex-col space-y-1 ">{children}</form>
  );
}
