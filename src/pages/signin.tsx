import React from "react";
import { FcGoogle } from "react-icons/fc";
import { /* useSession, */ signIn /*, signOut */ } from "next-auth/react";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";

function FormInput({ type }: { type: string }) {
  return (
    <Form.Control asChild>
      <input
        type={type}
        className="h-[35px] w-full rounded border-2 border-neutral-200 bg-neutral-100 px-2 text-sm leading-none hover:border-neutral-300"
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
        <button
          className="h-[35px] w-full items-center justify-center rounded bg-neutral-950 text-white hover:shadow-sm hover:shadow-neutral-400"
          type="submit"
        >
          Sign In
        </button>
      </Form.Submit>
      <button
        className="mt-2 flex h-[35px] w-full items-center rounded border-2 border-neutral-100 px-1 hover:bg-neutral-100"
        type="button"
      >
        <FcGoogle className="me-2 h-[18px] w-[18px]" />
        Sign in with Google
      </button>
    </Form.Root>
  );
}

export default function Login() {
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
