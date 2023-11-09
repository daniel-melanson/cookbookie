import FormErrorMessage from "./FormErrorMessage";
import FormTextField from "./FormTextField";
import { api } from "~/utils/api";
interface FormEmailFieldProps {
  serverErrorMessage?: string;
}
export default function FormEmailField({
  serverErrorMessage,
}: FormEmailFieldProps) {
  return (
    <FormTextField name="email" type={"email"}>
      <FormErrorMessage
        match="typeMismatch"
        message="Please enter a valid email"
      />
      {serverErrorMessage?.includes("email") && (
        <FormErrorMessage message={serverErrorMessage} />
      )}
    </FormTextField>
  );
}
