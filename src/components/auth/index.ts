export interface AuthFormProps {
  setForm: (from: AuthFormKind) => void;
}

export enum AuthFormKind {
  SignIn = "Sign In",
  SignUp = "Sign Up",
  ResetPassword = "Reset Password",
  AuthFormKind = "AuthFormKind",
}
