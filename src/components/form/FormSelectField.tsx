import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import { useFormDataDispatch } from "~/contexts/FormContext";

// type ObjectWithID = {
//   id: string;
// } & Record<string, string | number>;

type Props = {
  name: string;
  label: string;
  // options: ObjectWithID[];
};

export default function FormSelectField({
  name,
  label,
  // options,
  children,
}: React.PropsWithChildren<Props>) {
  const dispatch = useFormDataDispatch();
  return (
    <Form.Field className="relative w-full" name={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} asChild>
        <select
          name={name}
          className="w-full"
          onChange={(e) => {
            dispatch({
              [name]: Array.from(e.target.selectedOptions).map((o) => {
                return { id: o.value };
              }),
            });
          }}
          multiple
        >
          {children}
        </select>
      </Form.Control>
    </Form.Field>
  );
}
