import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { match } from "ts-pattern";

interface EdgeButtonProps {
  direction: "up" | "down";
  href?: string;
}

function PageNavLink({
  direction,
  href,
  children,
}: EdgeButtonProps & React.PropsWithChildren) {
  const className = classNames(
    "flex items-center border-y-2 border-neutral-300 text-lg",
    direction === "down"
      ? "rounded-bl-lg rounded-tl-lg border-l-2"
      : "rounded-br-lg rounded-tr-lg border-r-2",
    direction == "down" ? "pl-1 pr-3" : "pl-3 pr-1",
    href
      ? "text-neutral-800 hover:bg-neutral-200"
      : "disable-select text-neutral-400",
  );

  if (!href) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function PageElipsis() {
  return (
    <div className="disable-select border-y-2 border-l-2 border-neutral-300 px-3 text-lg">
      ...
    </div>
  );
}

interface Props {
  page: number;
  totalPages: number;
  createLink: (page: number) => string;
}

export default function PageSelect({ page, totalPages, createLink }: Props) {
  function PageOption({ value }: { value: number }) {
    const baseClassNames = classNames(
      "border-y-2 px-3 py-1 text-lg",
      value === totalPages ? "border-r-2" : "",
      value - 1 === page ? "border-l-0" : "border-l-2",
    );

    if (value === page) {
      return (
        <div
          key={value}
          className={classNames(
            baseClassNames,
            "disable-select border-x-2 border-neutral-800 font-bold",
          )}
        >
          {value}
        </div>
      );
    }

    return (
      <Link
        key={value}
        className={classNames(
          baseClassNames,
          "border-l-2 border-neutral-300 hover:bg-neutral-200",
        )}
        href={createLink(value)}
      >
        {value}
      </Link>
    );
  }

  const pageOptions =
    totalPages <= 5
      ? new Array<number>(totalPages).fill(0).map((_, i) => i + 1)
      : match(page)
          .with(1, () => [1, 2, 3])
          .with(totalPages, () => [totalPages - 2, totalPages - 1, totalPages])
          .otherwise(() => [page - 1, page, page + 1]);

  const first = pageOptions[0]!;
  if (first > 2) {
    pageOptions.unshift(-1);
    pageOptions.unshift(1);
  } else if (first === 2) {
    pageOptions.unshift(1);
  }

  const last = pageOptions[pageOptions.length - 1]!;
  if (last < totalPages - 1) {
    pageOptions.push(-1);
    pageOptions.push(totalPages);
  } else if (last === totalPages - 1) {
    pageOptions.push(totalPages);
  }

  return (
    <div className="flex justify-center">
      <div className="flex rounded-xl shadow">
        <PageNavLink
          direction="down"
          href={page > 1 ? createLink(page - 1) : undefined}
        >
          <RiArrowLeftSLine /> Previous
        </PageNavLink>
        {...pageOptions.map((value, i) => {
          const key = `${value}-${i}`;
          return value === -1 ? (
            <PageElipsis key={key} />
          ) : (
            <PageOption key={key} value={value} />
          );
        })}
        <PageNavLink
          direction="up"
          href={page < totalPages ? createLink(page + 1) : undefined}
        >
          Next <RiArrowRightSLine />
        </PageNavLink>
      </div>
    </div>
  );
}
