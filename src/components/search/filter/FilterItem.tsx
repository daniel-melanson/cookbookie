import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { RiArrowDownSLine } from "react-icons/ri";
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
            <RiArrowDownSLine
              className={classNames(
                baseClasses,
                "invisible transition-all ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-hover:visible group-data-[state=open]:visible group-data-[state=open]:rotate-180",
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
