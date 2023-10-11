import React, { useState } from "react";
import Link from "next/link";
import { hash } from "bcrypt";
import { prisma } from "~/server/db";
import ContinueWithGoogle from "~/components/form/ContinueWithGoogle";
import AuthForm from "~/components/form/AuthForm";
import Head from "next/head";
import FormTextField from "~/components/form/FormTextField";
import FormSubmit from "~/components/form/FormSubmit";
import FormErrorMessage from "~/components/form/FormErrorMessage";
import { match } from "ts-pattern";
import { type InputProps } from "~/components/form/FormTextInput";
import { signIn } from "next-auth/react";

enum FormKind {
  SignIn = "Sign In",
  SignUp = "Sign Up",
  ResetPassword = "Reset Password",
}

interface FormProps {
  setForm: (from: FormKind) => void;
}

function FormSwitch({
  onClick,
  prompt,
  action,
}: {
  prompt: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div className="mt-2 text-xs font-light">
      <p>
        {prompt + " "}
        <span
          className="font-bold hover:cursor-pointer hover:underline"
          onClick={() => onClick()}
        >
          {action}
        </span>
        .
      </p>
    </div>
  );
}

function EmailField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <FormTextField
      name="email"
      type={"email"}
      value={value}
      onChange={onChange}
    >
      <FormErrorMessage
        match="typeMismatch"
        message="Please enter a valid email"
      />
    </FormTextField>
  );
}

function SignInForm({ setForm }: FormProps) {
  const [signInCredentials, setSignInCredentials] = useState({
    email: "",
    password: "",
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSignInCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit() {
    console.log(signInCredentials);
  }
  return (
    <>
      <AuthForm name={"Sign In"} onSubmit={handleSubmit}>
        <EmailField value={signInCredentials.email} onChange={handleChange} />
        <FormTextField
          name="password"
          type={"password"}
          value={signInCredentials.password}
          onChange={handleChange}
        />
        <FormSubmit text={"Sign In"} />
        <div className="w-fill flex h-[24px] justify-center">
          <p
            className="text-sm font-bold hover:cursor-pointer hover:underline"
            onClick={() => setForm(FormKind.ResetPassword)}
          >
            Forgot Password?
          </p>
        </div>
        <ContinueWithGoogle text={"Sign in with Google"} />
      </AuthForm>
      <FormSwitch
        prompt={"Don't have an account?"}
        action={"Sign up here"}
        onClick={() => setForm(FormKind.SignUp)}
      />
    </>
  );
}

const Line = () => <div className="h-[1px] flex-grow bg-black" />;

function SignUpForm({ setForm }: FormProps) {
  const [signUpCredentials, setSignUpCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSignUpCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit() {
    console.log(signUpCredentials);
  }

  return (
    <>
      <AuthForm name={"Sign Up"} onSubmit={handleSubmit}>
        <EmailField value={signUpCredentials.email} onChange={handleChange} />
        <FormTextField
          name="password"
          type={"password"}
          value={signUpCredentials.password}
          onChange={handleChange}
        />
        <FormSubmit text="Continue" />
        <div className="w-fill flex h-[24px] justify-center">
          <div className="flex w-3/4 items-center justify-center space-x-2 font-bold">
            <Line />
            <p>or</p>
            <Line />
          </div>
        </div>
        <ContinueWithGoogle text={"Continue with Google"} />
      </AuthForm>
      <FormSwitch
        prompt={"Already have an account?"}
        action={"Sign in here"}
        onClick={() => setForm(FormKind.SignIn)}
      />
    </>
  );
}

function ResetPasswordForm({ setForm }: FormProps) {
  const [recoverEmail, setRecoverEmail] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRecoverEmail(e.target.value);
  }

  function handleSubmit() {
    console.log(recoverEmail);
  }
  return (
    <>
      <AuthForm name={"Reset Password"} onSubmit={handleSubmit}>
        <EmailField value={recoverEmail} onChange={handleChange} />
        <FormSubmit text="Continue" />
      </AuthForm>
      <FormSwitch
        prompt={"Remembered your password?"}
        action={"Sign in here"}
        onClick={() => setForm(FormKind.SignIn)}
      />
    </>
  );
}

export default function SignIn() {
  const [currentForm, setForm] = useState(FormKind.SignIn);

  return (
    <>
      <Head>
        <title>{currentForm}</title>
      </Head>
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-400 to-red-600">
        <h2 className="mb-10 text-center font-cursive text-5xl font-black text-white">
          <Link href="/">CookBookie</Link>
        </h2>
        <div className="flex h-max w-96 flex-col items-center rounded-md bg-white px-4 py-4 md:px-8 md:py-8">
          {match(currentForm)
            .with(FormKind.SignIn, () => <SignInForm setForm={setForm} />)
            .with(FormKind.SignUp, () => <SignUpForm setForm={setForm} />)
            .with(FormKind.ResetPassword, () => (
              <ResetPasswordForm setForm={setForm} />
            ))
            .exhaustive()}
        </div>
      </div>
    </>
  );
}
