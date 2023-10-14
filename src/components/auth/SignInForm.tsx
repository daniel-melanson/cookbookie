import React from "react";
import AuthForm from "~/components/auth/AuthForm";
import FormSubmit from "~/components/form/FormSubmit";
import FormTextField from "~/components/form/FormTextField";
import { AuthFormKind, type AuthFormProps } from "~/components/auth";
import FormEmailField from "~/components/form/FormEmailField";
import AuthFormSwitch from "~/components/auth/AuthFormSwitch";
import ContinueWithGoogle from "~/components/auth/ContinueWithGoogle";

export default function SignInForm({ setForm }: AuthFormProps) {
  const [signInCredentials, setSignInCredentials] = React.useState({
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
        <FormEmailField
          value={signInCredentials.email}
          onChange={handleChange}
        />
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
    </>
  );
}
