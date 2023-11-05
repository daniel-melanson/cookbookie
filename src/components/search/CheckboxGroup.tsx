import Checkbox from "~/components/search/Checkbox";
import FilterLabel from "~/components/search/FilterLabel";

export default function CheckboxGroup({
  options,
  label,
  hint,
}: {
  label: string;
  hint?: string;
  options: string[];
}) {
  return (
    <div>
      <FilterLabel label={label} hint={hint} />
      <div className="flex flex-col space-y-1">
        {...options.map((option) => <Checkbox key={option} label={option} />)}
      </div>
    </div>
  );
}
