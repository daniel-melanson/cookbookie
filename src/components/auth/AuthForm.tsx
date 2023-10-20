import React from "react";
import * as Form from "@radix-ui/react-form";
import { useFormData } from "~/contexts/FormContext";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

interface Props {
  name: string;
  onSubmit?: (data: Record<string, unknown>) => void;
}

export default function AuthForm({
  children,
  name,
  onSubmit,
}: Props & React.PropsWithChildren) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("signed in");
    onSubmit && onSubmit(data);
    const signInResponse = await signIn("credentials", data);
    if (signInResponse && !signInResponse.error) {
      await router.push("/");
    } else {
      console.log("error while signing in");
    }
  }
  const data = useFormData();
  const router = useRouter();

  return (
    <>
      <h2 className="mb-2 text-xl font-semibold">{name}</h2>
      <Form.Root
        onSubmit={(e) => void handleSubmit(e)}
        className="flex w-full flex-col space-y-[18px]"
      >
        {children}
      </Form.Root>
    </>
  );
}
