import * as Form from "@radix-ui/react-form";
import { useFormDataDispatch } from "~/contexts/FormContext";

interface Props {
  name: string;
  label: string;
}

export default function FormDateField({ name, label }: Props) {
  const dispatch = useFormDataDispatch();

  return (
    <Form.Field
      className="flex w-full items-center justify-between"
      name="date"
    >
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type="date"
        placeholder="mm/dd/yyyy"
        onChange={(event) => dispatch({ [name]: new Date(event.target.value) })}
        className="focus:border-blue peer h-[48px] rounded border-[1px] border-neutral-200 px-2 text-sm leading-none placeholder-transparent transition-colors  focus:border-neutral-500 focus:outline-none data-[invalid]:border-red-500"
      />
    </Form.Field>
  );
}
