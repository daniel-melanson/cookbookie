import React from "react";
import * as Form from "@radix-ui/react-form";
import { RiErrorWarningFill } from "react-icons/ri";

export interface MessageProps {
  // Types found in source code
  match: Form.ValidityMatcher | Form.CustomMatcher;
  message: string;
}

export default function FormErrorMessage({ match, message }: MessageProps) {
  return (
    <Form.Message
      className="mt-1 flex items-center text-sm text-red-500"
      match={match}
    >
      <RiErrorWarningFill />
      <div className="ml-1">{message}</div>
    </Form.Message>
  );
}
