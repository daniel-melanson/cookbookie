import React, { useState } from "react";
import { type AuthFormProps } from "~/components/auth";
import { useRouter } from "next/router";
import { FormDataProvider, useFormDataDispatch } from "~/contexts/FormContext";
import AuthForm from "./AuthForm";
import FormTextField from "../form/FormTextField";
import FormRadioField from "../form/FormRadioField";
import FormDateField from "../form/FormDateField";
import FormSubmit from "../form/FormSubmit";
import { api } from "~/utils/api";
import { router } from "@trpc/server";
interface infoType {
  unitSystem: "US" | "METRIC";
  firstName?: string | undefined;
  lastName?: string | undefined;
  dateOfBirth?: Date | undefined;
}
export default function Onboarding() {
  const dispatch = useFormDataDispatch();
  const mutation = api.users.setUserInfo.useMutation();
  const router = useRouter();
  function handleSubmit(data: Record<string, unknown>) {
    mutation.mutate(data as unknown as infoType);

    if (mutation.isSuccess) {
      void router.push("/");
    }
  }

  return (
    <FormDataProvider>
      <AuthForm name="About You" onSubmit={handleSubmit}>
        <FormTextField name="First Name" type="text" />
        <FormTextField name="Last Name" type="text" />
        <FormDateField name="Birth Date" />
        <FormRadioField name="Unit System">
          <>
            <input id="US" type="radio" name={"Unit System"} value="US"></input>
            <label htmlFor="US">{"US (Cups, ounces, etc.)"}</label>
            <input
              id="METRIC"
              type="radio"
              name={"Unit System"}
              value="METRIC"
            ></input>
            <label htmlFor="METRIC">
              {"Metric (Milliliters, grams, etc.)"}
            </label>
          </>
        </FormRadioField>
        <FormSubmit isLoading={mutation.isLoading} text={"Continue"} />
      </AuthForm>
    </FormDataProvider>
  );
}
