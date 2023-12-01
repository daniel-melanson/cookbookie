import * as Form from "@radix-ui/react-form";
import { useFormDataDispatch } from "~/contexts/FormContext";

interface Props {
  name: string;
}
export default function FormRadioField({
  name,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <Form.Field className="relative w-full" name={name}>
      <Form.Label>{name}</Form.Label>
      <Form.Control
        onChange={(event) =>
          // dispatch({ ["Unit System"]: event.target.value })
          console.log(event.target)
        }
        asChild
      >
        {children}
      </Form.Control>
    </Form.Field>
  );
}
