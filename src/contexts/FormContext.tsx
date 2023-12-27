import React from "react";

// TODO figure try to use somethings that is not an unknown array for fields such as allergens
export type FormValues = string | boolean | Date | number | unknown[];
export type FormData = Record<string, FormValues>;
export type FormDataAction = FormData;

const FormDataContext = React.createContext<FormData>({});
const FormDataDispatchContext = React.createContext<
  React.Dispatch<FormDataAction>
>(undefined!);

export function FormDataProvider({ children }: React.PropsWithChildren) {
  const [formData, dispatch] = React.useReducer(formDataReducer, {});

  return (
    <FormDataContext.Provider value={formData}>
      <FormDataDispatchContext.Provider value={dispatch}>
        {children}
      </FormDataDispatchContext.Provider>
    </FormDataContext.Provider>
  );
}

export function useFormData() {
  return React.useContext(FormDataContext);
}

export function useFormDataDispatch() {
  return React.useContext(FormDataDispatchContext);
}

function formDataReducer(state: FormData, action: FormDataAction) {
  return { ...state, ...action };
}
