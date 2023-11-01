import FormErrorMessage from "./FormErrorMessage";
import FormTextField from "./FormTextField";

export default function FormEmailField() {
  return (
    <FormTextField name="email" type={"email"}>
      <FormErrorMessage
        match="typeMismatch"
        message="Please enter a valid email"
      />
    </FormTextField>
  );
}
