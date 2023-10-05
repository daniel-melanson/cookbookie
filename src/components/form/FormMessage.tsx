import React from "react";
import * as Form from "@radix-ui/react-form";
import { AiOutlineWarning } from "react-icons/ai";

export interface MessageProps {
  // Types found in source code
  match: Form.ValidityMatcher | Form.CustomMatcher;
  msg: string;
}

export function FormErrorMessage({ match, msg }: MessageProps) {
  return (
    <Form.Message
      className="flex items-center text-sm font-light text-red-600"
      match={match}
    >
      <AiOutlineWarning />
      <div className="ml-1">{msg}</div>
    </Form.Message>
  );
}
