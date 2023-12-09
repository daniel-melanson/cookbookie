import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import { useFormDataDispatch } from "~/contexts/FormContext";

type ObjectWithID = {
  id: string;
} & Record<string, string | number>;

type ObjectID = {
  id: string;
};

type Props = {
  name: string;
  label: string;
  options: ObjectWithID[];
};

export default function FormSelectField({
  name,
  label,
  options,
  children,
}: React.PropsWithChildren<Props>) {
  const [selected, setSelected] = useState<ObjectID[]>([]);
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
              if (options[e.target.selectedIndex]) {
                prev.push({ id: options[e.target.selectedIndex]!.id });
              } else {
                console.error("Object does not exist in database");
              }
              return prev;
            });
            dispatch({ [name]: selected });
            console.log(selected);
          }}
          multiple
        >
          {children}
        </select>
      </Form.Control>
    </Form.Field>
  );
}
