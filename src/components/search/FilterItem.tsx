import React from "react";
import T from "./Tooltip";
import { match } from "ts-pattern";
import { MdClear } from "react-icons/md";
import classNames from "classnames";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

interface Props {
  label: string;
  hint?: string;
  hidden?: boolean;
  onClear?: () => void;
  onAdd?: () => void;
}

interface FilterButtonProps {
  kind: "add" | "clear";
  onClick: () => void;
  hint: string;
}
function FilterButton({ hint, kind, onClick }: FilterButtonProps) {
  return (
    <T hint={hint}>
      <button
        type="button"
        onClick={onClick}
        className={classNames(
          "ml-auto w-5",
          kind === "clear" && "text-md text-red-400",
        )}
      >
        {match(kind)
          .with("add", () => <RiAddLine />)
          .with("clear", () => <RiSubtractLine />)
          .exhaustive()}
      </button>
    </T>
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
      <div className="flex w-full items-center text-lg font-medium text-nobel-600">
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
