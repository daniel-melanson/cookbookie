import React, { useState } from "react";
import Head from "next/head";
import { match } from "ts-pattern";
import BaseAuthPage from "~/components/auth/BaseAuthPage";
import SignInForm from "~/components/auth/SignInForm";
import ResetPasswordForm from "~/components/auth/ResetPasswordForm";
import { AuthFormKind } from "~/components/auth";
import SignUpForm from "~/components/auth/SignUpForm";

export default function Page() {
  const [form, setForm] = useState(AuthFormKind.SignIn);

  return (
    <>
      <Head>
        <title>{form}</title>
      </Head>
      <BaseAuthPage>
        {match(form)
          .with(AuthFormKind.SignIn, () => <SignInForm setForm={setForm} />)
          .with(AuthFormKind.SignUp, () => <SignUpForm setForm={setForm} />)
          .with(AuthFormKind.ResetPassword, () => (
            <ResetPasswordForm setForm={setForm} />
          ))
          .run()}
      </BaseAuthPage>
    </>
  );
}
