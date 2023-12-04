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
}: React.PropsWithChildren<EdgeButtonProps>) {
  const isPrev = direction === "prev";
  const className = classNames(
    "flex items-center border-y border-nobel-500 text-lg",
    isPrev ? "rounded-l-lg border-l" : "rounded-r-lg border-r",
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
    <div className="disable-select border-y border-l border-neutral-300 px-3 text-lg">
      ...
    </div>
  );
}

interface Props {
  page: number;
  totalPages: number;
  createUpdatedPageParamURL: (page: number) => string;
}

export default function PageSelect({
  page,
  totalPages,
  createUpdatedPageParamURL: createURL,
}: Props) {
  function PageOption({ value }: { value: number }) {
    const isLastPage = value === totalPages;
    const isCurrentPage = value === page;
    const isNextPage = value - 1 === page;

    const className = classNames(
      "px-3 py-1 text-lg",
      isCurrentPage
        ? "disable-select border-x-2 border-y-2 border-nobel-800 font-bold"
        : classNames(
            "border-y border-nobel-500 hover:bg-neutral-200",
            isLastPage && "border-r",
            !isNextPage && "border-l",
          ),
    );

    return isCurrentPage ? (
      <div key={value} className={className}>
        {value}
      </div>
    ) : (
      <Link key={value} className={className} href={createURL(value)}>
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
          href={page > 1 ? createURL(page - 1) : undefined}
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
          href={page < totalPages ? createURL(page + 1) : undefined}
        >
          Next <RiArrowRightSLine />
        </PageNavLink>
      </div>
    </div>
  );
}
