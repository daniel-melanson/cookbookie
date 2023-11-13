import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { MdAdd, MdClear } from "react-icons/md";

interface Props {
  label: string;
  hint?: string;
  hidden?: boolean;
  onClear?: () => void;
  onAdd?: () => void;
}

interface ButtonProps {
  onClick: () => void;
}

function ClearAll({ onClick }: ButtonProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          className="ml-auto mr-1 p-1 text-sm"
          type="button"
          onClick={onClick}
        >
          <MdClear />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="rounded bg-white p-1 text-nobel-500"
            sideOffset={5}
          >
            Clear
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

function Add({ onClick }: ButtonProps) {
  return (
    <button
      className="ml-auto mr-1 p-1 text-sm"
      type="button"
      onClick={onClick}
    >
      <MdAdd />
    </button>
  );
}

export default function FilterItem({
  label,
  hint,
  children,
  onClear,
  onAdd,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      <div className="flex w-full items-center text-lg font-bold text-nobel-600">
        <h2>{label}</h2>
        {onClear && <ClearAll onClick={onClear} />}
        {onAdd && <Add onClick={onAdd} />}
      </div>
      {!onAdd && (
        <div className="px-1">
          {hint && (
            <p className="disable-select mb-2 text-sm font-light italic text-nobel-500">
              {hint}
            </p>
          )}
          {children}
        </div>
      )}
    </>
  );
}
