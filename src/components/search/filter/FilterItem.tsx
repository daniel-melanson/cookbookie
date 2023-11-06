import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Accordion from "@radix-ui/react-accordion";
import { RiQuestionLine } from "react-icons/ri";

function Hint({ text }: { text: string }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger disabled>
          <RiQuestionLine className="mx-2 text-nobel-600 hover:cursor-pointer" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade mx-2 w-fit select-none rounded-lg bg-white px-3 py-2 text-center text-sm leading-none text-nobel-500 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
            sideOffset={5}
          >
            {text}
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default function FilterItem({
  label,
  hint,
  children,
}: React.PropsWithChildren<{ label: string; hint?: string }>) {
  return (
    <Accordion.Item value={`accordion-item-${label.toLowerCase()}`}>
      <Accordion.Header>
        <Accordion.Trigger className="mb-1 flex items-center text-lg font-bold text-nobel-600 hover:cursor-pointer">
          {label}
          {/* {hint && <Hint text={hint} />} */}
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
        {children}
      </Accordion.Content>
    </Accordion.Item>
  );
}
