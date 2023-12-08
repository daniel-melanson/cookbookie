import { useRouter } from "next/router";
import { FormDataProvider } from "~/contexts/FormContext";
import AuthForm from "./AuthForm";
import FormTextField from "../form/FormTextField";
import FormRadioField from "../form/FormRadioField";
import FormDateField from "../form/FormDateField";
import FormSubmit from "../form/FormSubmit";
import FormSelectField from "../form/FormSelectField";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import type { Tag } from "@prisma/client";

interface InfoType {
  firstName: string;
  unitSystem?: "US" | "METRIC";
  lastName?: string | undefined;
  dateOfBirth?: Date | undefined;
}

export default function Onboarding() {
  const [tags, setTags] = useState<Tag[]>([]);
  const mutation = api.users.setUserInfo.useMutation();
  const res = api.tag.getAllTagNames.useQuery();
  const router = useRouter();
  // const test = api.users.getUserInfo.useQuery();
  // console.log(test);
  useEffect(() => {
    if (res.isSuccess) {
      setTags(res.data);
    } else {
      // console.log(res.error);
      setTags([{ id: "error", name: "error", kindName: "error" }]);
    }
  }, [res.isSuccess, res.data]);

  async function handleSubmit(data: Record<string, unknown>) {
    mutation.mutate(data as unknown as InfoType);

    if (mutation.isSuccess) {
      await router.push("/");
    } else {
      console.log(mutation.error);
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
        {/* useEffect and have search term as dependency */}
        <FormSelectField
          label="Dietary Restrictions"
          name="allergens"
          options={tags}
        >
          {tags.map((e) => (
            <option key={e.id} value={e.name}>
              {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
            </option>
          ))}
        </FormSelectField>
        <FormSubmit isLoading={mutation.isLoading} text={"Continue"} />
      </AuthForm>
    </FormDataProvider>
  );
}
