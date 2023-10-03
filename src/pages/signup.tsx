import React from "react";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";

import FormInput from "~/components/form/FormInput";

export default function SignUp() {
  return (
    <Form.Root>
      <Form.Field className="mb-3 w-full" name="email">
        <div className="flex items-baseline justify-between">
          <Form.Label className="leading-9">Email</Form.Label>
          <Form.Message className="text-sm font-light" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className="text-sm font-light" match="typeMismatch">
            Please enter a valid email
          </Form.Message>
        </div>
        <FormInput type="email" />
      </Form.Field>
      <Form.Field className="mb-3 w-full" name="password">
        <div className="flex items-baseline justify-between">
          <Form.Label className="leading-9">Password</Form.Label>
          <Form.Message className="text-sm font-light" match="valueMissing">
            Please enter a password
          </Form.Message>
        </div>
        <FormInput type="password" />
      </Form.Field>
      <Form.Field className="mb-3 w-full" name="password">
        <div className="flex items-baseline justify-between">
          <Form.Label className="leading-9">Password</Form.Label>
          <Form.Message className="text-sm font-light" match="valueMissing">
            Please re-enter your password
          </Form.Message>
        </div>
        <FormInput type="password" />
      </Form.Field>
      <Form.Submit className="mt-3 w-full" asChild>
        <button
          className="h-[35px] w-full items-center justify-center rounded bg-neutral-950 text-white hover:shadow-sm hover:shadow-neutral-400"
          type="submit"
        >
          Sign Up
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
