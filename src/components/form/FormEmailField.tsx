import FormErrorMessage from "./FormErrorMessage";
import FormTextField from "./FormTextField";
interface FormEmailFieldProps {
  errorMessage?: string;
}
export default function FormEmailField({
  errorMessage: serverErrorMessage,
}: FormEmailFieldProps) {
  return (
    <FormTextField name="email" type={"email"} label="Email" required>
      <FormErrorMessage
        match="typeMismatch"
        message="Please enter a valid email."
      />
      {serverErrorMessage && <FormErrorMessage message={serverErrorMessage} />}
    </FormTextField>
  );
}
