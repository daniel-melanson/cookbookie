import React from "react";
import {
  RiErrorWarningLine,
  RiCheckboxCircleLine,
  RiCircleLine,
} from "react-icons/ri";

export default function PasswordValidationMessage() {
  return (
    <div className="mt-1 flex items-center text-xs text-red-500">
      <RiErrorWarningLine />
      <p className="ml-1">{e.message}</p>
    </div>
  );
}
