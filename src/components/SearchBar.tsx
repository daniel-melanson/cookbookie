import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { Select } from "@radix-ui/themes";


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
      className="grow bg-transparent placeholder-neutral-400 focus:outline-none"
      required
      type="search"
      name="q"
      placeholder="Search..."
    />
  );
}

function SearchSelect({ onChange }: { onChange: (value: string) => void }) {
  return (
    <Select.Root defaultValue="recipes">
      <Select.Trigger variant="ghost" />
      <Select.Content>
        <Select.Item value="recipes">Recipes</Select.Item>
        <Select.Item value="ingredients">Ingredients</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}

function NavBarSearch() {
  const [action, setAction] = React.useState("/recipes/search");

  return (
    <form
      className="align-center flex w-96 items-center space-x-2 rounded-lg bg-white px-4 py-2"
      action={action}
      method="GET"
    >
      <RiSearchLine
        className="align-self-middle text-lg
          text-neutral-400"
      />
      <SearchInput />
      <SearchSelect onChange={(value) => setAction(`/${value}/search`)} />
    </form>
  );
}

function FullSearch() {
  return (
    <form
      className="align-center flex w-96 items-center space-x-2 rounded-lg bg-white p-1 ps-4"
      action="/recipes/search"
      method="GET"
    >
      <SearchInput />
      <button
        className="hover:bg-orange-dark flex h-12 w-12 items-center justify-center rounded-lg bg-orange transition-colors"
        type="submit"
      >
        <RiSearchLine className="align-self-middle text-3xl text-white" />
      </button>
    </form>
  );
}

export default function SearchBar({ style }: SearchBarProps) {
  return style === SearchBarStyle.NavigationBar ? (
    <NavBarSearch />
  ) : (
    <FullSearch />
  );
}
