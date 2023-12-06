import { FcGoogle } from "react-icons/fc";

export default function ContinueWithGoogle() {
  return (
    <button
      className="mt-2 flex h-[48px] w-full items-center rounded border border-neutral-200 px-4 transition-colors hover:bg-neutral-100"
      type="button"
    >
      <FcGoogle className="me-4 h-[20px] w-[20px]" />
      Continue with Google
    </button>
  );
}
