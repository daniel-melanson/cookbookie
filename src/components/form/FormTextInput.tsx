import React from "react";
import * as Form from "@radix-ui/react-form";

export type FormTextInputType = "email" | "password" | "text";

interface Props {
  name: string;
  type: FormTextInputType;
}

export default function FormTextInput({ type, name }: Props) {
  return (
    <Form.Control
      type={type}
      name={name}
      placeholder="text"
      className="peer h-[48px] w-full rounded border-[1px] border-neutral-200 px-2 text-sm leading-none placeholder-transparent transition-colors hover:border-neutral-300 focus:border-blue focus:outline-none data-[invalid]:border-red-500"
      required
    />
  );
}
