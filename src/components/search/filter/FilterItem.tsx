import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { RiAddLine, RiQuestionLine, RiSubtractLine } from "react-icons/ri";

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

function Label({
  label,
  hint,
  open,
  setOpen,
}: {
  label: string;
  hint?: string;
  open: boolean;
  setOpen: (b: boolean) => void;
}) {
  const [shown, setShown] = React.useState(false);

  return (
    <div
      className="flex items-center hover:cursor-pointer"
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => open || setShown(false)}
      onClick={() => setOpen(!open)}
    >
      <h3 className="disable-select mb-1 whitespace-nowrap text-xl font-bold text-nobel-600">
        {label}
      </h3>
      {hint && <Hint text={hint} />}
      {shown && (
        <button
          type="button"
          className="ml-auto text-nobel-600"
          onClick={() => setOpen(!open)}
        >
          {open ? <RiSubtractLine /> : <RiAddLine />}
        </button>
      )}
    </div>
  );
}

export default function FilterItem({
  label,
  hint,
  children,
}: React.PropsWithChildren<{ label: string; hint?: string }>) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Label label={label} hint={hint} open={open} setOpen={setOpen} />
      {open && children}
    </div>
  );
}
