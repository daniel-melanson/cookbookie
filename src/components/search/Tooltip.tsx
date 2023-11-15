import React from "react";
import * as T from "@radix-ui/react-tooltip";

interface Props {
  hint: string;
}

export default function Tooltip({
  hint,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <T.Provider>
      <T.Root>
        <T.Trigger asChild>{children}</T.Trigger>
        <T.Portal>
          <T.Content
            className="rounded bg-white p-1 text-nobel-500 shadow"
            sideOffset={5}
          >
            {hint}
            <T.Arrow className="fill-white" />
          </T.Content>
        </T.Portal>
      </T.Root>
    </T.Provider>
  );
}
