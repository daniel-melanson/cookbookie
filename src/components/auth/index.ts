export interface AuthFormProps {
  setForm: (from: FormKind) => void;
}

export enum AuthFormKind {
  SignIn = "Sign In",
  SignUp = "Sign Up",
  ResetPassword = "Reset Password",
  AuthFormKind = "AuthFormKind",
}
