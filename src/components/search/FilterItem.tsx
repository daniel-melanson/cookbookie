import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { MdAdd, MdClear } from "react-icons/md";
import { match } from "ts-pattern";
import classNames from "classnames";

interface Props {
  label: string;
  hint?: string;
  hidden?: boolean;
  onClear?: () => void;
  onAdd?: () => void;
}

interface ButtonProps {
  kind: "add" | "clear";
  hint: string;
  onClick: () => void;
}

function FilterButton({ hint, kind, onClick }: ButtonProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          className={classNames(
            "ml-auto mr-1 p-1 text-sm",
            match(kind)
              .with("add", () => "rotate-45 hover:text-green-500")
              .with("clear", () => "rotate-0 text-red-500")
              .exhaustive(),
          )}
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
            {hint}
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
  onClear,
  onAdd,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      <div className="flex w-full items-center text-lg font-bold text-nobel-600">
        <h2>{label}</h2>
        {onClear && (
          <FilterButton kind="clear" hint="Clear" onClick={onClear} />
        )}
        {onAdd && <FilterButton kind="add" hint="Add filter" onClick={onAdd} />}
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
