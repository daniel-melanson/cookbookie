import * as Form from "@radix-ui/react-form";
import { useFormDataDispatch } from "~/contexts/FormContext";

interface Props {
  name: string;
}
export default function FormSelectField({
  name,
  children,
}: React.PropsWithChildren<Props>) {
  const dispatch = useFormDataDispatch();
  return (
    <Form.Field className="relative w-full" name={name}>
      <Form.Label>{name}</Form.Label>
      <Form.Control
        onChange={(event) =>
          // dispatch({ [name]: event.target.value })
          console.log(event.target.value)
        }
        name={name}
        asChild
      >
        <select>{children}</select>
      </Form.Control>
    </Form.Field>
  );
}
