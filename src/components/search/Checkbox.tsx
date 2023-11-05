import * as Checkbox from "@radix-ui/react-checkbox";
import { HiCheck } from "react-icons/hi";

interface Props {
  label: string;
}

export default function CheckBox({ label }: Props) {
  const id = `checkbox-${label.toLowerCase()}`;

  return (
    <div className="flex items-center ">
      <Checkbox.Root
        value={"true"}
        id={id}
        className=" flex h-[16px] w-[16px] appearance-none items-center justify-center rounded border-[1px] border-nobel-500 bg-nobel-100 outline-none hover:bg-nobel-200 data-[state=checked]:bg-nobel-500"
      >
        <Checkbox.Indicator>
          <HiCheck className="font-bold text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label
        className="disable-select ms-1 text-sm text-neutral-700 hover:cursor-pointer"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
