import React, { useState } from "react";
// import { /* useSession, */ signIn /*, signOut */ } from "next-auth/react";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";
import { AiOutlineWarning } from "react-icons/ai";
import { ContinueWithGoogle } from "~/components/form/ContinueWith";
import FormInput from "~/components/form/FormInput";
import { FormErrorMessage } from "~/components/form/FormMessage";
// import SignUp from "./signup";

enum FormType {
  SignIn,
  SignUp,
  ResetPassword,
}

interface FormProp {
  handleFormSwitch: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

function SignInForm({ handleFormSwitch }: FormProp) {
  return (
    <>
      <h2 className="text-xl font-semibold">Sign In</h2>
      <Form.Root className="flex w-full flex-col items-center">
        <Form.Field className="mb-3 w-full" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-9">Email</Form.Label>
            <FormErrorMessage
              match="valueMissing"
              msg="Please enter your email"
            />
            <FormErrorMessage
              match="typeMismatch"
              msg="Please enter a valid email"
            />
          </div>
          <FormInput type="email" />
        </Form.Field>
        <Form.Field className="mb-3 w-full" name="password">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-9">Password</Form.Label>
            <FormErrorMessage
              match="valueMissing"
              msg="Please enter your password"
            />
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
        <span className="py-4">Forgot Password?</span>
        <ContinueWithGoogle />
      </Form.Root>
      <div className="mt-8 text-xs font-light">
        <p>
          Don&apos;t have an account?{" "}
          <span
            className="font-bold hover:cursor-pointer hover:underline"
            onClick={handleFormSwitch}
          >
            Sign up here
          </span>
          .
        </p>
      </div>
    </>
  );
}

function SignUpForm({ handleFormSwitch }: FormProp) {
  return (
    <>
      <h2 className="text-xl font-semibold">Sign Up</h2>
      <Form.Root className="flex w-full flex-col items-center">
        <Form.Field className="mb-3 w-full" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-9">Email</Form.Label>
            <FormErrorMessage
              match="valueMissing"
              msg="Please enter an email"
            />
            <FormErrorMessage
              match="typeMismatch"
              msg="Please enter a valid email"
            />
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
            <Form.Label className="leading-9">Re-type Password</Form.Label>
            <FormErrorMessage
              match="valueMissing"
              msg="Please re-enter your password"
            />
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
      <div className="mt-8 text-xs font-light">
        <p>
          Already have an account?{" "}
          <span
            className="font-bold hover:cursor-pointer hover:underline"
            onClick={handleFormSwitch}
          >
            Sign in here
          </span>
          .
        </p>
      </div>
    </>
  );
}

export default function SignIn() {
  const [currentForm, setForm] = useState(FormType.SignIn);
  function handleFormSwitch(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (!e.currentTarget.textContent) {
      console.error("Form link text is null");
      return;
    }
    switch (e.currentTarget.textContent) {
      case "Sign in here":
        setForm(FormType.SignIn);
        break;
      case "Sign up here":
        setForm(FormType.SignUp);
        break;
    }
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-400 to-red-600">
      <h2 className="mb-10 text-center font-cursive text-5xl font-black text-white">
        <Link href="/">CookBookie</Link>
      </h2>
      <div className="flex h-max w-96 flex-col items-center rounded-md  bg-white px-4 py-4 md:px-8 md:py-8">
        {(currentForm === FormType.SignIn && (
          <SignInForm handleFormSwitch={handleFormSwitch} />
        )) ||
          (currentForm === FormType.SignUp && (
            <SignUpForm handleFormSwitch={handleFormSwitch} />
          ))}
      </div>
    </div>
  );
}
