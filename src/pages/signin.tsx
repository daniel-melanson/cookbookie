import React from "react";
import Image from "next/image";
import { /* useSession, */ signIn /*, signOut */ } from "next-auth/react";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";

function FormInput({ type }: { type: string }) {
  return (
    <Form.Control asChild>
      <input
        type={type}
        className="h-[35px] w-full rounded border-2 border-neutral-200 bg-neutral-100 px-2 text-sm leading-none"
        required
      />
    </Form.Control>
  );
}

function LoginForm() {
  return (
    <Form.Root className="w-full">
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
            Please enter your password
          </Form.Message>
        </div>
        <FormInput type="password" />
      </Form.Field>
      <Form.Submit className="mt-3 w-full" asChild>
        <button className="inline-flex h-[35px] w-full items-center justify-center rounded bg-neutral-950 text-white">
          Sign In
        </button>
      </Form.Submit>
    </Form.Root>
  );
}

export default function Login() {
  const handleClick = async () => {
    await signIn("google");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-400 to-red-600">
      <h2 className="mb-10 text-center font-cursive text-5xl font-black text-white">
        CookBookie
      </h2>
      <div className="flex h-max w-96 flex-col items-center rounded-md  bg-white px-4 py-4 md:px-8 md:py-8">
        <LoginForm />
        <div className="mt-8 text-xs font-light">
          <p>
            Don&apos;t have an account?{" "}
            <Link className=" underline" href="/signup">
              Sign up here
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
