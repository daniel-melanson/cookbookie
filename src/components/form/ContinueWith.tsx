import React from "react";
import { FcGoogle } from "react-icons/fc";

export function ContinueWithGoogle() {
  return (
    <button
      className="mt-2 flex h-[35px] w-full items-center rounded border-2 border-neutral-100 px-1 hover:bg-neutral-100"
      type="button"
    >
      <FcGoogle className="me-2 h-[18px] w-[18px]" />
      Sign in with Google
    </button>
  );
}
