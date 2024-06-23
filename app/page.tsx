import CarpoolLogo from "@/app/ui/carpool-logo";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className='flex min-h-screen flex-col p-6'>
      <div className='flex h-20 shrink-0 items-end rounded-lg bg-green-500 p-4 md:h-52'>
        <CarpoolLogo />
      </div>
      <div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
        <div className='flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20'>
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to Carpool.</strong> This is the carpooling
            application built as the final project for the{" "}
            <a
              href='https://nusmods.com/courses/YSC3232/software-engineering'
              className='text-blue-500'
            >
              YSC3232 Software Engineering Course
            </a>
            , brought to you by Wentao, Elaine, Rinat, and Ari.
          </p>
          <div className='flex'>
            {" "}
            {/* This container will place its children on the same line */}
            <Link
              href='/signup'
              className='mr-4 flex items-center gap-5 self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700 md:text-base'
            >
              <span>Sign up</span>
            </Link>
            <Link
              href='/login'
              className='flex items-center gap-5 self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700 md:text-base'
            >
              <span>Log in</span>
            </Link>
          </div>
        </div>
        <div className='flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12'>
          {/* Add Hero Images Here */}
          <Image
            src='/YSC3232_Walkthrough.png'
            width={1000}
            height={760}
            className='hidden md:block'
            alt='Screenshots of the dashboard project showing desktop and mobile versions'
          />
          <Image
            src='/YSC3232_Walkthrough.png'
            width={560}
            height={620}
            className='block md:hidden'
            alt='Screenshot of the dashboard project showing mobile version'
          />
        </div>
      </div>
    </main>
  );
}
