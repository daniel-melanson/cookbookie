import React from "react";
import AuthForm from "~/components/auth/AuthForm";
import FormSubmit from "~/components/form/FormSubmit";
import FormTextField from "~/components/form/FormTextField";
import { AuthFormKind, type AuthFormProps } from "~/components/auth";
import FormEmailField from "~/components/form/FormEmailField";
import AuthFormSwitch from "~/components/auth/AuthFormSwitch";
import ContinueWithGoogle from "~/components/auth/ContinueWithGoogle";

const Line = () => <div className="h-[1px] flex-grow bg-black" />;

export default function SignUpForm({ setForm }: AuthFormProps) {
  const [signUpCredentials, setSignUpCredentials] = React.useState({
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
        <FormEmailField
          value={signUpCredentials.email}
          onChange={handleChange}
        />
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
        <ContinueWithGoogle />
      </AuthForm>
      <AuthFormSwitch
        prompt={"Already have an account?"}
        action={"Sign in here"}
        onClick={() => setForm(AuthFormKind.SignIn)}
      />
    </>
  );
}
