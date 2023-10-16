import React from "react";
import * as Form from "@radix-ui/react-form";

interface Props {
  name: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export default function AuthForm({
  children,
  name,
  onSubmit,
}: Props & React.PropsWithChildren) {
  return (
    <>
      <h2 className="mb-2 text-xl font-semibold">{name}</h2>
      <Form.Root
        onSubmit={onSubmit}
        className="flex w-full flex-col space-y-[18px]"
      >
        {children}
      </Form.Root>
    </>
  );
}
