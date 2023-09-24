import React from "react";
import { Button } from "@radix-ui/themes";

export default function Login() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-max w-96 flex-col items-center rounded-md border-2 border-neutral-300 bg-neutral-200 px-4 py-4 md:px-8 md:py-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-neutral-1000 text-center font-cursive text-2xl font-bold">
            CookBookie
          </h2>
        </div>
        <div className="mt-6 w-full">
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="text-m block py-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 p-1.5 text-neutral-900 shadow-sm outline-none ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </form>
          <form className="mt-4">
            <div className="flex items-center justify-between py-2">
              <label htmlFor="password" className="text-m block">
                Password
              </label>
              <a className="block text-sm">Forgot Your Password?</a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 p-1.5 text-neutral-900 shadow-sm outline-none ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-green-400 py-2 font-bold text-stone-50 sm:my-8"
            >
              Sign In
            </button>
          </form>
          <hr className="py-4" />
          <button className="sm: flex w-full rounded-md bg-green-400 py-2 text-stone-50">
            <img src="" />
            Placeholder Continue with Google
          </button>
          <button className="my-6 flex w-full rounded-md bg-green-400 py-2 text-stone-50 sm:my-8">
            <img src="" />
            Placeholder Continue with Github
          </button>
        </div>
      </div>
    </div>
  );
}
