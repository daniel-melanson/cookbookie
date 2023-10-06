import React from "react";
import * as Form from "@radix-ui/react-form";

export default function SubmitButton({ text }: { text: string }) {
  return (
    <Form.Submit className="mt-3 w-full" asChild>
      <button
        className="h-[48px] w-full transition-shadow items-center justify-center rounded bg-neutral-950 text-white hover:shadow-md hover:shadow-neutral-400"
        type="submit"
      >
        {text}
      </button>
    </Form.Submit>
  );
}
