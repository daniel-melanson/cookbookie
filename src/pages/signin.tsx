import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import {Button} from "@radix-ui/themes";

export default function Login() {

  const handleClick = () => {
    signIn('google');
  }
  
  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='w-96 h-max border-2 border-neutral-300 bg-neutral-200 rounded-md flex flex-col items-center px-4 py-4 md:px-8 md:py-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'><h2 className='font-cursive text-center text-2xl font-bold text-neutral-1000'>CookBookie</h2></div>
        <div className='mt-6 w-full'>
          <form className='space-y-4'>
            <div>
              <label htmlFor='email' className='block text-m py-2'>
                Email Address
              </label>
              <input id='email' name='email' type='email' autoComplete='email' required className='outline-none block w-full rounded-md border-0 p-1.5 text-neutral-900 placeholder:text-neutral-400 shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-inset focus:ring-2 focus:ring-green-500 sm:text-sm sm:leading-6'/>
            </div>
          </form>
          <form className='mt-4'>
            <div className='flex items-center justify-between py-2'>
              <label htmlFor='password' className='block text-m'>
                Password
              </label>
              <a className='block text-sm'>Forgot Your Password?</a>
            </div>
            <input id='password' name='password' type='password' autoComplete='email' required className='outline-none block w-full rounded-md border-0 p-1.5 text-neutral-900 placeholder:text-neutral-400 shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-inset focus:ring-2 focus:ring-green-500 sm:text-sm sm:leading-6'/>
            <button type='submit' className='font-bold w-full py-2 bg-green-400 sm:my-8 rounded-md text-stone-50'>Sign In</button>
          </form>
          <hr className='py-4'/>
          <button onClick = {handleClick} className='flex w-full py-2 bg-green-400 sm: rounded-md text-stone-50'><img src='' />Placeholder Continue with Google</button>
          <button className='flex w-full py-2 bg-green-400 sm:my-8 rounded-md text-stone-50 my-6'><img src='' />Placeholder Continue with Github</button>
        </div>
      </div>
    </div>
  )
}