import * as Form from "@radix-ui/react-form";
import { useFormDataDispatch } from "~/contexts/FormContext";

interface Props {
  name: string;
}
export default function FormRadioField({ name }: Props) {
  const dispatch = useFormDataDispatch();
  return (
    <Form.Field className="relative w-full" name={name}>
      <Form.Label>Unit System</Form.Label>
      <Form.Control
        onChange={(event) => dispatch({ [name]: event.target.value })}
        className="data-[invalid]:border-red-500"
        asChild
      >
        <>
          <input id="US" type="radio" name={name} value="US"></input>
          <label htmlFor="US">{"US (Cups, ounces, etc.)"}</label>
          <input id="METRIC" type="radio" name={name} value="METRIC"></input>
          <label htmlFor="METRIC">{"Metric (Milliliters, grams, etc.)"}</label>
        </>
      </Form.Control>
    </Form.Field>
  );
}
