import { type ZodIssue } from "zod";
import FormErrorMessage from "../form/FormErrorMessage";
import FormTextField from "../form/FormTextField";
import { useFormData } from "~/contexts/FormContext";
import { password } from "~/utils/validators";

export default function SignupPasswordField() {
  const data = useFormData();
  const validatorResult = password().safeParse(data.password);
  return (
    <FormTextField name="password" type={"password"}>
      {!validatorResult.success &&
        validatorResult.error.issues.map((e: ZodIssue) => {
          return <FormErrorMessage key={e.message} message={e.message} />;
        })}
      {/* <FormErrorMessage */}
      {/*   match={(v) => v !== v.toLowerCase() && v !== v.toUpperCase()} */}
      {/*   message="Password must be a mix up upper and lower case letters" */}
      {/* /> */}
    </FormTextField>
  );
}
