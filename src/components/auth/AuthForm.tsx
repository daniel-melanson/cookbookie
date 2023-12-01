import * as Form from "@radix-ui/react-form";

import { useFormData, type FormData } from "~/contexts/FormContext";

interface Props {
  name: string;
  onSubmit?: (data: FormData) => void;
  onClearServerErrors?: () => void;
}

export default function AuthForm({
  children,
  name,
  onSubmit,
  onClearServerErrors,
}: React.PropsWithChildren<Props>) {
  const data = useFormData();

  return (
    <>
      <h2 className="mb-2 text-xl font-semibold">{name}</h2>
      <Form.Root
        onSubmit={(e) => {
          e.preventDefault();

          onSubmit && onSubmit(data);
        }}
        onClearServerErrors={onClearServerErrors}
        className="w-full space-y-[18px]"
      >
        {children}
      </Form.Root>
    </>
  );
}
