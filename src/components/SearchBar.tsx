import React from "react";
import { RiArrowDownSLine, RiCheckLine, RiSearchLine } from "react-icons/ri";
import * as Select from "@radix-ui/react-select";
import classNames from "classnames";

export enum SearchBarStyle {
  Home = "home",
  NavigationBar = "bar",
}

interface SearchBarProps {
  style: SearchBarStyle;
}

function SearchInput() {
  return (
    <input
      className="grow border-r-2 border-neutral-200 bg-transparent placeholder-neutral-400 focus:outline-none"
      required
      type="search"
      name="q"
      placeholder="Search..."
    />
  );
}

function SelectItem(props: Select.SelectItemProps) {
  return (
    <Select.Item
      className="flex items-center rounded px-5 data-[highlighted]:bg-orange-500 data-[highlighted]:text-white data-[highlighted]:outline-none"
      value={props.value}
    >
      <Select.ItemIndicator className="absolute left-0">
        <RiCheckLine />
      </Select.ItemIndicator>
      <Select.ItemText>{props.children}</Select.ItemText>
    </Select.Item>
  );
}

function SearchSelect({ onChange }: { onChange: (value: string) => void }) {
  return (
    <Select.Root defaultValue="ingredients" required onValueChange={onChange}>
      <Select.Trigger className="inline-flex items-center justify-end space-x-2 justify-self-end  text-neutral-400 outline-none hover:text-black">
        <Select.Value />
        <Select.Icon>
          <RiArrowDownSLine />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="cursor-pointer select-none rounded-lg border-[1px] border-neutral-200 bg-white p-2 shadow"
          position="popper"
          sideOffset={10}
        >
          <Select.Viewport>
            <SelectItem value="ingredients">Ingredients</SelectItem>
            <SelectItem value="recipes">Recipes</SelectItem>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function Search({
  className,
  includeButton,
}: {
  className: string;
  includeButton?: boolean;
}) {
  const [action, setAction] = React.useState("/ingredients/search");

  return (
    <form
      className={classNames(
        `align-center flex items-center space-x-2 rounded-lg bg-white `,
        className,
      )}
      action={action}
      method="GET"
    >
      {!includeButton && (
        <RiSearchLine
          className="align-self-middle text-lg
          text-neutral-400"
        />
      )}
      <SearchInput />
      <SearchSelect onChange={(value) => setAction(`/${value}/search`)} />
      {includeButton && (
        <button
          className="flex h-[48px] w-[48px] items-center justify-center rounded-lg bg-orange-500 transition-colors hover:bg-orange-600 "
          type="submit"
        >
          <RiSearchLine className="align-self-middle text-3xl text-white" />
        </button>
      )}
    </form>
  );
}

export default function SearchBar({ style }: SearchBarProps) {
  return style === SearchBarStyle.NavigationBar ? (
    <Search className="w-96 px-4 py-2" />
  ) : (
    <Search className="w-[500px] p-1 ps-4" includeButton />
  );
}
