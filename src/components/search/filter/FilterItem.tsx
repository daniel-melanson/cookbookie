import React from "react";

interface Props {
  label: string;
  hint?: string;
}

export default function FilterItem({
  label,
  hint,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      <h2 className="flex w-full items-center text-lg font-bold text-nobel-600">
        {label}
      </h2>
      <div className="px-1">
        {hint && (
          <p className="disable-select mb-2 text-sm font-light italic text-nobel-500">
            {hint}
          </p>
        )}
        {children}
      </div>
    </>
  );
}
