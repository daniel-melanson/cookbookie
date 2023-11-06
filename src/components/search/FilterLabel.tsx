import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { RiQuestionLine } from "react-icons/ri";

interface Props {
  label: string;
  hint?: string;
}

function Hint({ text }: { text: string }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger disabled>
          <RiQuestionLine className="text-nobel-500 hover:cursor-pointer" />
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

export default function FilterLabel({ label, hint }: Props) {
  return (
    <div className="flex items-center">
      <h3 className="mb-1 mr-2 whitespace-nowrap text-xl font-bold text-nobel-600">
        {label}
      </h3>
      {hint && <Hint text={hint} />}
    </div>
  );
}
