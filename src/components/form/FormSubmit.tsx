import React from "react";
import * as Form from "@radix-ui/react-form";

export default function FormSubmit({ text }: { text: string }) {
  return (
    <Form.Submit className="w-full" asChild>
      <button
        className="h-[48px] w-full items-center justify-center rounded bg-neutral-950 text-white transition-shadow hover:bg-neutral-800"
        type="submit"
      >
        {text}
      </button>
    </Form.Submit>
  );
}
