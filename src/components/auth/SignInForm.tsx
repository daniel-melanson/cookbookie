import React from "react";
import AuthForm from "~/components/auth/AuthForm";
import FormSubmit from "~/components/form/FormSubmit";
import FormTextField from "~/components/form/FormTextField";
import { AuthFormKind, type AuthFormProps } from "~/components/auth";
import FormEmailField from "~/components/form/FormEmailField";
import AuthFormSwitch from "~/components/auth/AuthFormSwitch";
import ContinueWithGoogle from "~/components/auth/ContinueWithGoogle";
import { FormDataProvider, useFormData } from "~/contexts/FormContext";
import { api } from "~/utils/api";

export default function SignInForm({ setForm }: AuthFormProps) {
  function handleSubmit() {
    console.log();
  }
  return (
    <FormDataProvider>
      <AuthForm name={"Sign In"} onSubmit={handleSubmit}>
        <FormEmailField />
        <FormTextField name="password" type={"password"} />
        <FormSubmit text={"Sign In"} />
        <div className="w-fill flex h-[24px] justify-center">
          <p
            className="text-sm font-bold hover:cursor-pointer hover:underline"
            onClick={() => setForm(AuthFormKind.ResetPassword)}
          >
            Forgot Password?
          </p>
        </div>
        <ContinueWithGoogle />
      </AuthForm>
      <AuthFormSwitch
        prompt={"Don't have an account?"}
        action={"Sign up here"}
        onClick={() => setForm(AuthFormKind.SignUp)}
      />
    </FormDataProvider>
  );
}
