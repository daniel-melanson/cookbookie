import React from "react";
import * as Form from "@radix-ui/react-form";

interface Props {
  name: string;
}

export default function AuthForm({
  children,
  name,
}: Props & React.PropsWithChildren) {
  return (
    <>
      <h2 className="mb-2 text-xl font-semibold">{name}</h2>
      <Form.Root className="flex w-full flex-col space-y-[18px]">
        {children}
      </Form.Root>
    </>
  );
}
