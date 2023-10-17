import React from "react";
import * as Form from "@radix-ui/react-form";
import { RiErrorWarningLine } from "react-icons/ri";

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
      <RiErrorWarningLine />
      <p className="ml-1">{message}</p>
    </Form.Message>
  );
}
