import React from "react";
import AuthForm from "~/components/auth/AuthForm";
import FormSubmit from "~/components/form/FormSubmit";
import { AuthFormKind, type AuthFormProps } from "~/components/auth";
import FormEmailField from "~/components/form/FormEmailField";
import AuthFormSwitch from "~/components/auth/AuthFormSwitch";

export default function ResetPasswordForm({ setForm }: AuthFormProps) {
  return (
    <>
      <AuthForm name={"Reset Password"}>
        <FormEmailField />
        <FormSubmit text="Continue" />
      </AuthForm>
      <AuthFormSwitch
        prompt={"Remembered your password?"}
        action={"Sign in here"}
        onClick={() => setForm(AuthFormKind.SignIn)}
      />
    </>
  );
}
