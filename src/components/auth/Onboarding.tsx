import { useRouter } from "next/router";
import { FormDataProvider } from "~/contexts/FormContext";
import AuthForm from "./AuthForm";
import FormTextField from "../form/FormTextField";
import FormRadioField from "../form/FormRadioField";
import FormDateField from "../form/FormDateField";
import FormSubmit from "../form/FormSubmit";
import FormSelectField from "../form/FormSelectField";
import { api } from "~/utils/api";
import { useState } from "react";

interface infoType {
  firstName: string;
  unitSystem?: "US" | "METRIC";
  lastName?: string | undefined;
  dateOfBirth?: Date | undefined;
}
export default function Onboarding() {
  const [isLoading, setLoading] = useState(false);
  const mutation = api.users.setUserInfo.useMutation();
  const router = useRouter();
  async function handleSubmit(data: Record<string, unknown>) {
    console.log(data);
    mutation.mutate(data as unknown as infoType);

    if (mutation.isSuccess) {
      await router.push("/");
    }
  }

  return (
    <FormDataProvider>
      <AuthForm name="About You" onSubmit={(e) => void handleSubmit(e)}>
        <FormTextField
          name="firstName"
          type="text"
          label="First Name"
          required
        />
        <FormTextField name="lastName" type="text" label="Last Name" />
        <FormDateField name="dateOfBirth" label="Birth Date" />
        <FormRadioField name="unitSystem" label="Unit System">
          <input id="US" type="radio" name={"Unit System"} value="US" />
          <label className="ml-2" htmlFor="US">
            {"US (Cups, ounces, etc.)"}
          </label>
          <br />
          <input id="METRIC" type="radio" name={"Unit System"} value="METRIC" />
          <label className="ml-2" htmlFor="METRIC">
            {"Metric (Milliliters, grams, etc.)"}
          </label>
          <br />
        </FormRadioField>
        <FormSubmit isLoading={mutation.isLoading} text={"Continue"} />
      </AuthForm>
    </FormDataProvider>
  );
}
