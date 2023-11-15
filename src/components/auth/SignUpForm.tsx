import { signIn } from "next-auth/react";
import { AuthFormKind, type AuthFormProps } from "~/components/auth";
import AuthForm from "~/components/auth/AuthForm";
import AuthFormSwitch from "~/components/auth/AuthFormSwitch";
import ContinueWithGoogle from "~/components/auth/ContinueWithGoogle";
import FormEmailField from "~/components/form/FormEmailField";
import FormSubmit from "~/components/form/FormSubmit";
import SignUpPasswordField from "./SignUpPasswordField";
import { FormDataProvider } from "~/contexts/FormContext";
import { api } from "~/utils/api";

const Line = () => <div className="h-[1px] flex-grow bg-black" />;

export default function SignUpForm({ setForm }: AuthFormProps) {
  const mutation = api.users.registerUser.useMutation();

  function handleSubmit(data: Record<string, unknown>) {
    mutation.mutate({
      email: data.email as string,
      password: data.password as string,
    });
  }

  if (mutation.isSuccess) {
    void signIn("credentials", {
      email: mutation.data.email,
      password: mutation.data.password,
      callbackUrl: "/",
    });
  }

  return (
    <FormDataProvider>
      <AuthForm name={"Sign Up"} onSubmit={handleSubmit}>
        <FormEmailField
          errorMessage={mutation.isError ? mutation.error.message : undefined}
        />
        <SignUpPasswordField />
        <FormSubmit text="Continue" isLoading={mutation.isLoading} />
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
    </FormDataProvider>
  );
}
