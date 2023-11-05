import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { match } from "ts-pattern";

interface EdgeButtonProps {
  direction: "next" | "prev";
  href?: string;
}

function PageNavLink({
  direction,
  href,
  children,
}: EdgeButtonProps & React.PropsWithChildren) {
  const isPrev = direction === "prev";
  const className = classNames(
    "flex items-center border-y-2 border-neutral-300 text-lg",
    isPrev
      ? "rounded-bl-lg rounded-tl-lg border-l-2"
      : "rounded-br-lg rounded-tr-lg border-r-2",
    isPrev ? "pl-1 pr-3" : "pl-3 pr-1",
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
    const isLastPage = value === totalPages;
    const isCurrentPage = value === page;
    const isNextToCurrent = value - 1 === page;

    const baseClassNames = classNames(
      "border-y-2 px-3 py-1 text-lg",
      isLastPage ? "border-r-2" : "",
      isNextToCurrent ? "border-l-0" : "border-l-2",
      isCurrentPage
        ? "disable-select border-x-2 border-neutral-800 font-bold"
        : "border-neutral-300 hover:bg-neutral-200",
    );

    return isCurrentPage ? (
      <div key={value} className={baseClassNames}>
        {value}
      </div>
    ) : (
      <Link key={value} className={baseClassNames} href={createLink(value)}>
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
          direction="prev"
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
          direction="next"
          href={page < totalPages ? createLink(page + 1) : undefined}
        >
          Next <RiArrowRightSLine />
        </PageNavLink>
      </div>
    </div>
  );
}
