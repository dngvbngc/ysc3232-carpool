"use client";

import { lusitana } from "@/app/ui/fonts";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Button } from "./button";
import { useFormState } from "react-dom";
import { createUser } from "@/app/lib/actions";
import Link from "next/link";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);

  return (
    <form action={dispatch}>
      <h1 className={`${lusitana.className} mb-3 text-2xl`}>
        Create an account to start ridesharing!
      </h1>
      <div className='w-full'>
        <div>
          <label
            className='mb-3 mt-5 block text-xs font-medium text-gray-900'
            htmlFor='email'
          >
            Name
          </label>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
              id='name'
              type='text'
              name='name'
              placeholder='Enter your name'
              required
            />
            <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
          </div>
          {state.errors?.name ? (
            <div
              id='customer-error'
              aria-live='polite'
              className='mt-2 text-sm text-red-500'
            >
              {state.errors.name.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className='w-full'>
        <div>
          <label
            className='mb-3 mt-5 block text-xs font-medium text-gray-900'
            htmlFor='email'
          >
            Email
          </label>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
              id='email'
              type='email'
              name='email'
              placeholder='Enter your email address'
              required
            />
            <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
          </div>
          {state.errors?.email ? (
            <div
              id='customer-error'
              aria-live='polite'
              className='mt-2 text-sm text-red-500'
            >
              {state.errors.email.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className='mt-4'>
        <label
          className='mb-3 mt-5 block text-xs font-medium text-gray-900'
          htmlFor='password'
        >
          Password
        </label>
        <div className='relative'>
          <input
            className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
            id='password'
            type='password'
            name='password'
            placeholder='Enter password'
            required
            minLength={6}
          />
          <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
        </div>
        {state.errors?.password ? (
          <div
            id='customer-error'
            aria-live='polite'
            className='mt-2 text-sm text-red-500'
          >
            {state.errors.password.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
      </div>
      <div className='mt-4'>
        <label
          className='mb-3 mt-5 block text-xs font-medium text-gray-900'
          htmlFor='password'
        >
          Confirm password
        </label>
        <div className='relative'>
          <input
            className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
            id='password'
            type='password'
            name='password'
            placeholder='Re-enter your password'
            required
            minLength={6}
          />
          <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
        </div>
        {state.errors?.password ? (
          <div
            id='customer-error'
            aria-live='polite'
            className='mt-2 text-sm text-red-500'
          >
            {state.errors.password.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
        {state.message ? (
          <div
            id='message-error'
            aria-live='polite'
            className='mt-2 text-sm text-red-500'
          >
            <p key={state.message}>{state.message}</p>
          </div>
        ) : null}
      </div>
      <div className='mt-6 flex justify-end gap-4'>
        <Link
          href='/'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancel
        </Link>
        <Button type='submit'>Create Account</Button>
      </div>
    </form>
  );
}
