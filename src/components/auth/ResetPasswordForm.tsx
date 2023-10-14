import React from "react";
import AuthForm from "~/components/auth/AuthForm";
import FormSubmit from "~/components/form/FormSubmit";
import { AuthFormKind, type AuthFormProps } from "~/components/auth";
import FormEmailField from "~/components/form/FormEmailField";
import AuthFormSwitch from "~/components/auth/AuthFormSwitch";

export default function ResetPasswordForm({ setForm }: AuthFormProps) {
  const [recoverEmail, setRecoverEmail] = React.useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRecoverEmail(e.target.value);
  }

  function handleSubmit() {
    console.log(recoverEmail);
  }

  return (
    <>
      <AuthForm name={"Reset Password"} onSubmit={handleSubmit}>
        <FormEmailField value={recoverEmail} onChange={handleChange} />
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
