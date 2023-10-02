import React from "react";
// import { /* useSession, */ signIn /*, signOut */ } from "next-auth/react";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";
import { ContinueWithGoogle } from "~/components/form/ContinueWith";
import FormInput from "~/components/form/FormInput";
import FormButton from "~/components/form/FormButton";

function SignInForm() {
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
      <ContinueWithGoogle />
    </Form.Root>
  );
}

export default function SignIn() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-400 to-red-600">
      <h2 className="mb-10 text-center font-cursive text-5xl font-black text-white">
        CookBookie
      </h2>
      <div className="flex h-max w-96 flex-col items-center rounded-md  bg-white px-4 py-4 md:px-8 md:py-8">
        <SignInForm />
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
