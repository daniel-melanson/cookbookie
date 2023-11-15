import * as Form from "@radix-ui/react-form";
import React from "react";
import { useFormData, type FormData } from "~/contexts/FormContext";

interface Props {
  name: string;
  onSubmit?: (data: FormData) => void;
}

export default function AuthForm({
  children,
  name,
  onSubmit,
}: React.PropsWithChildren<Props>) {
  const data = useFormData();

  return (
    <>
      <h2 className="mb-2 text-xl font-semibold">{name}</h2>
      <Form.Root
        onSubmit={(e) => {
          e.preventDefault();

          onSubmit && onSubmit(data);
        }}
        className="w-full space-y-[18px]"
      >
        {children}
      </Form.Root>
    </>
  );
}
