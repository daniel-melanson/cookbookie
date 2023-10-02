import React from "react";
import * as Form from "@radix-ui/react-form";

export default function FormInput({ type }: { type: string }) {
  return (
    <Form.Control asChild>
      <input
        type={type}
        className="h-[35px] w-full rounded border-2 border-neutral-200 bg-neutral-100 px-2 text-sm leading-none hover:border-neutral-300"
        required
      />
    </Form.Control>
  );
}
