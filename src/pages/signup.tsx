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
    </Form.Root>
  );
}
