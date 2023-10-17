import FormErrorMessage from "../form/FormErrorMessage";
import FormTextField from "../form/FormTextField";

export default function SignupPasswordField() {
  return (
    <FormTextField name="password" type={"password"}>
      <FormErrorMessage
        match={(v) => v.length < 8}
        message="Password must be at least 8 characters"
      />
      <FormErrorMessage
        match={(v) => v.search(/\d/) !== -1}
        message="Password must contain at least one number"
      />
      {/* <FormErrorMessage */}
      {/*   match={(v) => v !== v.toLowerCase() && v !== v.toUpperCase()} */}
      {/*   message="Password must be a mix up upper and lower case letters" */}
      {/* /> */}
    </FormTextField>
  );
}
