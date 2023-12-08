import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import { useFormDataDispatch } from "~/contexts/FormContext";

interface Props {
  name: string;
  label: string;
  options: unknown[];
}
export default function FormSelectField({
  name,
  label,
  options,
  children,
}: React.PropsWithChildren<Props>) {
  const [selected, setSelected] = useState<unknown[]>([]);
  const dispatch = useFormDataDispatch();
  return (
    <Form.Field className="relative w-full" name={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} asChild>
        <select
          name={name}
          className="w-full"
          onChange={(e) => {
            setSelected((prev) => {
              prev.push({ id: options[e.target.selectedIndex] });
              return prev;
            });
            dispatch({ [name]: selected });
          }}
          multiple
        >
          {children}
        </select>
      </Form.Control>
    </Form.Field>
  );
}
