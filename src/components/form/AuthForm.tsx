import React from "react";
import * as Form from "@radix-ui/react-form";

interface Props {
  name: string;
  action?: ((data: FormData) => Promise<void>) | undefined;
}

export default function AuthForm({
  children,
  name,
  action,
}: Props & React.PropsWithChildren) {
  return (
    <>
      <h2 className="mb-2 text-xl font-semibold">{name}</h2>
      <Form.Root
        action={action}
        className="flex w-full flex-col space-y-[18px]"
      >
        {children}
      </Form.Root>
    </>
  );
}
