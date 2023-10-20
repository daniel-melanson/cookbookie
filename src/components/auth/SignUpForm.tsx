import AuthForm from "~/components/auth/AuthForm";
import FormSubmit from "~/components/form/FormSubmit";
import { AuthFormKind, type AuthFormProps } from "~/components/auth";
import FormEmailField from "~/components/form/FormEmailField";
import AuthFormSwitch from "~/components/auth/AuthFormSwitch";
import ContinueWithGoogle from "~/components/auth/ContinueWithGoogle";
import SignUpPasswordField from "./SignUpPasswordField";
import { FormDataProvider } from "~/contexts/FormContext";
import { api } from "~/utils/api";
import { hash } from "bcrypt";

const Line = () => <div className="h-[1px] flex-grow bg-black" />;

export default function SignUpForm({ setForm }: AuthFormProps) {
  function handleSubmit(data: Record<string, unknown>) {
    // const data = {...d, password: await hash(d.password, 12)};
    // TODO: provide feedback saying the email already exists
    // if (api.users.getEmail.useQuery(data.email as string)) {
    //   console.log("email already exists");
    // }
    mutation.mutate({
      email: data.email as string,
      password: data.password as string,
    });
  }
  const mutation = api.users.registerUser.useMutation();
  return (
    <FormDataProvider>
      <AuthForm name={"Sign Up"} onSubmit={handleSubmit}>
        <FormEmailField />
        <SignUpPasswordField />
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
    </FormDataProvider>
  );
}
