import React, { useState } from "react";
import Link from "next/link";
import * as nodemailer from "nodemailer";
import ContinueWithGoogle from "~/components/form/ContinueWithGoogle";
import AuthForm from "~/components/form/AuthForm";
import Head from "next/head";
import FormTextField from "~/components/form/FormTextField";
import FormSubmit from "~/components/form/FormSubmit";
import FormErrorMessage from "~/components/form/FormErrorMessage";
import { match } from "ts-pattern";

enum FormKind {
  SignIn = "Sign In",
  SignUp = "Sign Up",
  ResetPassword = "Reset Password",
}

interface FormProps {
  setForm: (from: FormKind) => void;
}

async function sendVerificationRequest({
  identifier: email,
  url,
  provider: { server, from },
}) {
  const { host } = new URL(url);
  const transport = nodemailer.createTransport(server);
  await transport.sendMail({
    to: email,
    from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, email }),
  });
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

function EmailField() {
  return (
    <FormTextField name="email" type={"email"}>
      <FormErrorMessage
        match="typeMismatch"
        message="Please enter a valid email"
      />
    </FormTextField>
  );
}

function SignInForm({ setForm }: FormProps) {
  return (
    <>
      <AuthForm name={"Sign In"}>
        <EmailField />
        <FormTextField name="password" type={"password"} />
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
  return (
    <>
      <AuthForm name={"Sign Up"}>
        <EmailField />
        <FormTextField name="password" type={"password"} />
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
  return (
    <>
      <AuthForm name={"Reset Password"}>
        <EmailField />
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
