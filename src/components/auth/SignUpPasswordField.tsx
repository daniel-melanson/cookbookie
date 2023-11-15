import FormErrorMessage from "../form/FormErrorMessage";
import FormTextField from "../form/FormTextField";
import { useFormData } from "~/contexts/FormContext";
import { password } from "~/utils/validators";

const passwordSchema = password();

export default function SignupPasswordField() {
  const data = useFormData();
  const password = data.password;

  const validatorResult =
    password !== undefined &&
    typeof password === "string" &&
    password.length > 0
      ? passwordSchema.safeParse(data.password)
      : undefined;

  return (
    <FormTextField name="password" type={"password"}>
      {validatorResult &&
        !validatorResult.success &&
        validatorResult.error.issues.map((e) => (
          <FormErrorMessage key={e.message} message={e.message} />
        ))}
    </FormTextField>
  );
}
