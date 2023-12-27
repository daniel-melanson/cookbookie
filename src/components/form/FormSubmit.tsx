import React from "react";
import * as Form from "@radix-ui/react-form";
import LoadingSpinner from "../LoadingSpinner";

export default function FormSubmit({
  text,
  isLoading,
}: {
  text: string;
  isLoading?: boolean;
}) {
  return (
    <Form.Submit className="w-full" asChild disabled={isLoading}>
      <button
        className="flex h-[48px] w-full items-center justify-center rounded bg-neutral-950 text-white transition-colors  hover:bg-neutral-800"
        type="submit"
      >
        {isLoading ? <LoadingSpinner /> : text}
      </button>
    </Form.Submit>
  );
}
