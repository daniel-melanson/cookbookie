import React from "react";
import * as Form from "@radix-ui/react-form";

export default function FormInput({ type }: { type: string }) {
  return (
    <Form.Control asChild>
      <input
        type={type}
        className="h-[48px] transition-colors w-full rounded border-[1px] border-neutral-200  px-2 text-sm leading-none hover:border-neutral-300"
        required
      />
    </Form.Control>
  );
}
