import * as Form from "@radix-ui/react-form";

export type FormTextInputType = "email" | "password" | "text";

export interface InputProps {
  name: string;
  type: FormTextInputType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormTextInput({ type, name, value }: InputProps) {
  return (
    <Form.Control asChild>
      <input
        name={name}
        type={type}
        value={value}
        placeholder="text"
        className="peer h-[48px] w-full rounded border-[1px] border-neutral-200 px-2 text-sm leading-none placeholder-transparent  transition-colors hover:border-neutral-300 focus:border-blue focus:outline-none data-[invalid]:border-red-400"
        required
      />
    </Form.Control>
  );
}
