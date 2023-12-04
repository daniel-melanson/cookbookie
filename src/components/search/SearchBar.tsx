import classNames from "classnames";
import React from "react";
import { RiSearchLine } from "react-icons/ri";

interface Props {
  className?: string;
  value: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  className,
  value,
  onChange,
  placeholder,
  children,
  onSubmit,
}: React.PropsWithChildren<Props>) {
  React;
  const [hasFocus, setHasFocus] = React.useState(false);
  const showSuggestions = hasFocus && value && value.length > 3;

  return (
    <div className={classNames("relative", className)}>
      <div className="absolute z-10 flex w-full flex-col rounded-lg border border-nobel-500 bg-white">
        <form
          className="flex h-full w-full items-center px-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.(value);
          }}
        >
          <button
            className="h-fill flex flex-shrink-0 items-center justify-center rounded-lg pe-2"
            type="submit"
          >
            <RiSearchLine className="align-self-middle h-6 w-6 text-3xl text-nobel-500" />
          </button>
          <input
            className="my-2 flex-grow bg-transparent placeholder-neutral-400 focus:outline-none"
            type="search"
            placeholder={placeholder ?? "Search..."}
            value={value}
            minLength={3}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
          />
        </form>
        {showSuggestions && <ol className="z-10 w-full p-1">{children}</ol>}
      </div>
    </div>
  );
}
