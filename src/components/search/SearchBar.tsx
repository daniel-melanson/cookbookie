import classNames from "classnames";
import React from "react";
import { RiSearchLine } from "react-icons/ri";

interface Suggestion {
  key: string;
  value: string;
}

interface Props {
  className?: string;
  includeSubmitButton?: boolean;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  suggestions?: Suggestion[];
  renderSuggestion?: (suggestion: Suggestion) => React.ReactNode;
}

export default function SearchBar({
  className,
  value,
  onChange,
  includeSubmitButton = false,
  placeholder,
  onSubmit,
  suggestions = [],
  renderSuggestion,
}: Props) {
  React;
  const [hasFocus, setHasFocus] = React.useState(false);
  const [hasHover, setHasHover] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const selectedValue =
    selectedIndex >= 0 ? suggestions[selectedIndex]!.value : value;

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((selectedIndex + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();

      setSelectedIndex(Math.max(-1, selectedIndex - 1));
    } else if (e.key === "Enter") {
      onSubmit(selectedValue);
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  const showSuggestions =
    suggestions.length > 0 && hasFocus && value && value.length > 3;

  return (
    <div
      className={classNames("relative", className)}
      onPointerEnter={() => setHasHover(true)}
      onPointerLeave={() => setHasHover(false)}
    >
      <div className="absolute z-10 flex w-full flex-col rounded-lg border border-nobel-500 bg-white">
        <form
          className="flex h-full w-full items-center px-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(value);
          }}
        >
          {includeSubmitButton && (
            <button
              className="h-fill flex flex-shrink-0 items-center justify-center rounded-lg pe-2"
              type="submit"
            >
              <RiSearchLine className="align-self-middle h-6 w-6 text-3xl text-nobel-500" />
            </button>
          )}
          <input
            className="my-2 flex-grow bg-transparent placeholder-neutral-400 focus:outline-none"
            type="search"
            placeholder={placeholder ?? "Search..."}
            value={selectedValue}
            minLength={3}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(hasHover)}
          />
        </form>
        {showSuggestions && (
          <ul className="z-10 w-full p-1">
            {suggestions.map(({ value, key }, i) => (
              <li
                key={key}
                data-selected={i === selectedIndex}
                className="overflow-clip whitespace-nowrap rounded p-1 capitalize hover:cursor-pointer hover:bg-nobel-500 hover:text-white data-[selected=true]:bg-nobel-500 data-[selected=true]:text-white"
                onClick={() => onSubmit(value)}
              >
                {renderSuggestion ? renderSuggestion({ key, value }) : value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
