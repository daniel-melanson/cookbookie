import * as Form from "@radix-ui/react-form";
import { useFormDataDispatch } from "~/contexts/FormContext";

interface Props {
  name: string;
}

export default function FormDateField({ name }: Props) {
  const dispatch = useFormDataDispatch();
  return (
    <Form.Field
      className="flex w-full items-center justify-between"
      name="date"
    >
      <Form.Label>Date of Birth</Form.Label>
      <Form.Control
        name={name}
        type="date"
        placeholder="mm/dd/yyyy"
        onChange={(event) => dispatch({ [name]: event.target.value })}
        className="focus:border-blue peer h-[48px] rounded border-[1px] border-neutral-200 px-2 text-sm leading-none placeholder-transparent transition-colors hover:border-neutral-300 focus:border-neutral-500 focus:outline-none data-[invalid]:border-red-500"
      />
    </Form.Field>
  );
}
