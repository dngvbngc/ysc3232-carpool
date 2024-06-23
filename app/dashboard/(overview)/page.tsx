import CardWrapper, { Card } from "@/app/ui/dashboard/cards";
import LatestPosts from "@/app/ui/dashboard/latest-posts";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { CardsSkeleton, LatestPostsSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Page() {
  return (
    <main>
      <h1
        className={`${lusitana.className} pt-5 mb-4 text-xl md:text-2xl pl-5 hidden md:flex`}
      >
        Dashboard
      </h1>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-16'>
        <Suspense fallback={<LatestPostsSkeleton />}>
          <LatestPosts />
        </Suspense>
      </div>
    </main>
  );
}
