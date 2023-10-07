import React from "react";
import { FcGoogle } from "react-icons/fc";

interface Props {
  text: string;
}

export default function ContinueWithGoogle({ text }: Props) {
  return (
    <button
      className="mt-2 flex h-[48px] w-full items-center rounded border-[1px] border-neutral-200 px-4 transition-colors hover:bg-neutral-100"
      type="button"
    >
      <FcGoogle className="me-4 h-[20px] w-[20px]" />
      {text}
    </button>
  );
}
