import CarpoolLogo from "@/app/ui/carpool-logo";
import LoginForm from "@/app/ui/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className='flex justify-center md:items-center h-screen bg-gray-100 md:bg-white'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32'>
        <div className='flex h-20 w-full items-end rounded-lg bg-green-500 p-3 md:h-36'>
          <div className='w-32 text-white md:w-36'>
            <CarpoolLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
