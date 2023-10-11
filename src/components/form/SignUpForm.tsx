import { hash } from "bcrypt";
import { prisma } from "~/server/db";
import ContinueWithGoogle from "./ContinueWithGoogle";
import AuthForm from "./AuthForm";
import FormTextField from "./FormTextField";
import FormSubmit from "./FormSubmit";
import FormErrorMessage from "./FormErrorMessage";

const Line = () => <div className="h-[1px] flex-grow bg-black" />;
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
function SignUpForm({ setForm }: FormProps) {
  async function signUpUser(prevState: any, data: FormData) {
    // "use server";
    // const password = await hash(data.get("password") as string, 16);
    // const user = await prisma.user.create({
    //   data: {
    //     email: data.get("email") as string,
    //   },
    // });
    console.log(data);
  }
  return (
    <>
      <AuthForm name={"Sign Up"} action={signUpUser}>
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
