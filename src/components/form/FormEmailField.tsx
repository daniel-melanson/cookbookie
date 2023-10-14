import FormErrorMessage from "./FormErrorMessage";
import FormTextField from "./FormTextField";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormEmailField({ value, onChange }: Props) {
  return (
    <FormTextField
      name="email"
      type={"email"}
      value={value}
      onChange={onChange}
    >
      <FormErrorMessage
        match="typeMismatch"
        message="Please enter a valid email"
      />
    </FormTextField>
  );
}
