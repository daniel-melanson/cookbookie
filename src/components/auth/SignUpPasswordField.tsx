import { type ZodIssue } from "zod";
import FormErrorMessage from "../form/FormErrorMessage";
import FormTextField from "../form/FormTextField";
import { useFormData } from "~/contexts/FormContext";
import { password } from "~/utils/validators";
import { RiErrorWarningLine } from "react-icons/ri";

export default function SignupPasswordField() {
  const data = useFormData();
  const validatorResult = password().safeParse(data.password);
  return (
    <FormTextField name="password" type={"password"}>
      {!validatorResult.success &&
        validatorResult.error.issues.map((e: ZodIssue) => {
          return (
            <div
              key={e.message}
              className="mt-1 flex items-center text-xs text-red-600"
            >
              <RiErrorWarningLine />
              <p className="ml-1">{e.message}</p>
            </div>
          );
        })}
      {/* <FormErrorMessage */}
      {/*   match={(v) => v !== v.toLowerCase() && v !== v.toUpperCase()} */}
      {/*   message="Password must be a mix up upper and lower case letters" */}
      {/* /> */}
    </FormTextField>
  );
}
