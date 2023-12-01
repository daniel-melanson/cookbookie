import * as Form from "@radix-ui/react-form";
import { type InputProps } from "./FormTextInput";
import { useFormDataDispatch } from "~/contexts/FormContext";

interface Props {
  name: string;
}

export default function FormDateField({ name }: Props) {
  const dispatch = useFormDataDispatch();
  return (
    <Form.Field className="relative w-full" name="date">
      <Form.Control
        name={name}
        type="date"
        placeholder="mm/dd/yyyy"
        onChange={(event) => dispatch({ [name]: event.target.value })}
        className="data-[invalid]:border-red-500"
      />
      <Form.Label>Date of Birth</Form.Label>
    </Form.Field>
  );
}
