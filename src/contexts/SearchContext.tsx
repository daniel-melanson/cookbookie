import React from "react";

type Range = [number, number];

export interface RecipeFilters {
  dietaryRestriction?: string;
  servings?: Range;
  time?: number;
  missingIngredients?: number;
  allergens?: string[];
  meal?: string[];
  ingredients?: string[];
}

export interface IngredientFilters {
  tags?: string[];
}

export type SearchFilters = RecipeFilters | IngredientFilters;

export type SearchData<T extends SearchFilters> = {
  page?: number;
  query?: string;
  sort?: string;
} & T;

export type SearchAction<T extends SearchFilters> =
  | { kind: "set"; key: keyof SearchData<T>; value: unknown }
  | { kind: "reset" }
  | { kind: "reset"; key: keyof SearchData<T> };

export type SearchReducer<T extends SearchFilters> = React.Reducer<
  SearchData<T>,
  SearchAction<T>
>;

const Context = React.createContext<SearchData<SearchFilters>>(undefined!);
const DispatchContext = React.createContext<
  React.Dispatch<SearchAction<SearchFilters>>
>(undefined!);

interface Props<T extends SearchFilters> {
  initialValue: SearchData<T>;
  reducer: SearchReducer<T>;
}

export function SearchArgsProvider<T extends SearchFilters>({
  children,
  initialValue,
  reducer,
}: React.PropsWithChildren<Props<T>>) {
  const [args, dispatch] = React.useReducer(
    reducer,
    initialValue ?? ({} as SearchData<T>),
  );

  return (
    <Context.Provider value={args}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
}

export function useSearchArgs<T extends SearchFilters>(): SearchData<T> {
  return React.useContext(Context) as SearchData<T>;
}

export const useSearchArgsDispatch = () => React.useContext(DispatchContext);

export function makeFormEventFactories<T extends SearchFilters>(
  object: SearchData<T>,
  dispatch: React.Dispatch<SearchAction<T>>,
) {
  type Key = keyof SearchData<T>;

  return {
    onChangeFactory: (key: Key) => (value: unknown) => {
      if (
        (Array.isArray(value) || typeof value === "string") &&
        value.length === 0
      ) {
        dispatch({ kind: "reset", key });
      } else {
        dispatch({ kind: "set", key, value });
      }
    },
    onAddFactory: (key: Key, defaultValue: unknown) => {
      if (object[key] !== undefined) return undefined;

      return () => dispatch({ kind: "set", key, value: defaultValue });
    },
    onClearFactory: (key: Key) => {
      if (object[key] === undefined) return undefined;

      return () => dispatch({ kind: "reset", key });
    },
  };
}
