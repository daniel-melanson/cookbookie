import * as Form from "@radix-ui/react-form";

export type FormTextInputType = "email" | "password" | "text";

export interface InputProps {
  name: string;
  type: FormTextInputType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormTextInput({ type, name, onChange }: InputProps) {
  return (
    <Form.Control
      name={name}
      type={type}
      onChange={onChange}
      className="focus:border-blue peer h-[48px] w-full rounded border-[1px] border-neutral-200 px-2 text-sm leading-none placeholder-transparent transition-colors hover:border-neutral-300 focus:outline-none data-[invalid]:border-red-500"
      required
    />
  );
}
