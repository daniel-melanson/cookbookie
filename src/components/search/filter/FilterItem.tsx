import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import classNames from "classnames";

export default function FilterItem({
  label,
  hint,
  children,
}: React.PropsWithChildren<{ label: string; hint?: string }>) {
  const baseClasses =
    "absolute transform-y-1/2 transform-x-1/2 text-lg font-bold text-nobel-600";

  return (
    <Accordion.Item value={`accordion-item-${label.toLowerCase()}`}>
      <Accordion.Header className="flex items-center">
        <Accordion.Trigger className="group flex w-full items-center text-lg font-bold text-nobel-600 hover:cursor-pointer">
          {label}
          <div className="relative ml-auto h-4 w-4">
            <RiAddLine
              className={classNames(
                baseClasses,
                "invisible group-hover:visible group-data-[state=open]:invisible",
              )}
            />
            <RiSubtractLine
              className={classNames(
                "invisible group-data-[state=open]:visible",
              )}
            />
          </div>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden px-1 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
        {hint && (
          <p className="disable-select mb-2 text-sm font-light italic text-nobel-500">
            {hint}
          </p>
        )}
        {children}
      </Accordion.Content>
    </Accordion.Item>
  );
}
