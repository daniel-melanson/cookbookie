import * as Checkbox from "@radix-ui/react-checkbox";
import { RiCheckFill } from "react-icons/ri";

interface Props {
  label: string;
}

export default function CheckBox({ label }: Props) {
  const name = label.toLowerCase();

  return (
    <div className="flex items-center ">
      <Checkbox.Root
        value={"true"}
        name={name}
        className="hover:bg-violet3 flex h-[14px] w-[14px] appearance-none items-center justify-center rounded border-[1px] border-nobel-500 bg-white outline-none "
      >
        <Checkbox.Indicator>
          <RiCheckFill className=" text-nobel-500" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="ms-0.5 text-xs text-neutral-700" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
