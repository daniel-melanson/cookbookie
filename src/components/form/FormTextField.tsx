import * as Form from "@radix-ui/react-form";
import FormTextInput, { type InputProps } from "./FormTextInput";
import FormErrorMessage from "./FormErrorMessage";

export default function FormTextField({
  name,
  type,
  children,
}: React.PropsWithChildren<InputProps>) {
  name = name.toLowerCase();
  const label = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <Form.Field className="relative w-full" name={name}>
      <FormTextInput name={name} type={type} />
      <Form.Label asChild>
        <label
          htmlFor={name}
          className="disable-select h-fill absolute left-0 top-0 ml-2 -translate-y-1/2 bg-white px-1 text-sm transition-all peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-translate-y-1/2 peer-focus:text-sm data-[invalid]:text-red-500"
        >
          {label}
        </label>
      </Form.Label>
      <FormErrorMessage
        match="valueMissing"
        message={"Please enter your " + name}
      />
      {children}
    </Form.Field>
  );
}
