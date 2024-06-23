import CarpoolLogo from "@/app/ui/carpool-logo";
import SignUpForm from "@/app/ui/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <main className='flex items-center justify-center h-screen'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32'>
        <div className='flex h-20 w-full items-end rounded-lg bg-green-500 p-3 md:h-36'>
          <div className='w-32 text-white md:w-36'>
            <CarpoolLogo />
          </div>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
