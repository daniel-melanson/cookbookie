import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthFormKind, type AuthFormProps } from "~/components/auth";
import AuthForm from "~/components/auth/AuthForm";
import AuthFormSwitch from "~/components/auth/AuthFormSwitch";
import ContinueWithGoogle from "~/components/auth/ContinueWithGoogle";
import FormEmailField from "~/components/form/FormEmailField";
import FormSubmit from "~/components/form/FormSubmit";
import FormTextField from "~/components/form/FormTextField";
import { FormDataProvider } from "~/contexts/FormContext";

export default function SignInForm({ setForm }: AuthFormProps) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(data: Record<string, unknown>) {
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
      redirect: false,
    });

    setIsLoading(false);
    if (res?.ok) {
      await router.push("/");
    } else {
      setError("Incorrect email or password.");
    }
  }

  return (
    <FormDataProvider>
      <AuthForm
        name={"Sign In"}
        onSubmit={(e) => void handleSubmit(e)}
        onClearServerErrors={() => setError(undefined)}
      >
        <FormEmailField errorMessage={error} />
        <FormTextField name="password" type={"password"} />
        <FormSubmit isLoading={isLoading} text={"Sign In"} />
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
