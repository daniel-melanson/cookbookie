import * as Form from "@radix-ui/react-form";
import { useFormDataDispatch } from "~/contexts/FormContext";

export type FormTextInputType = "email" | "password" | "text";

export interface InputProps {
  name: string;
  type: FormTextInputType;
}

export default function FormTextInput({ type, name }: InputProps) {
  const dispatch = useFormDataDispatch();

  return (
    <Form.Control
      name={name}
      type={type}
      placeholder="" // keep placeholder empty to use label as placeholder
      onChange={(event) => dispatch({ [name]: event.target.value })}
      className="focus:border-blue peer h-[48px] w-full rounded border border-neutral-200 px-2 text-sm leading-none placeholder-transparent transition-colors hover:border-neutral-300 focus:border-neutral-500 focus:outline-none data-[invalid]:border-red-500"
      required
    />
  );
}
