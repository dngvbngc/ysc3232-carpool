import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { LastestPost } from '@/app/lib/definitions';
import { fetchLatestPosts } from '@/app/lib/data';
import { formatTimeForDisplay } from '@/app/lib/utils';
import Link from 'next/link';
import { reverseGeocode } from '@/app/lib/utils';

export default async function LastestPosts() {
  const latestPosts: LastestPost[] = await fetchLatestPosts();
  return (
    <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl pl-5`}>
        Latest Rideshare Posts
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

        <div className="bg-white px-6">
          {latestPosts.map((post, i) => {
        
            // Check if ride_time is a Date object and format it, otherwise use it as a string
            let rideTimeFormatted = formatTimeForDisplay(post.ride_time.toString());

            return (
              <Link href={`/dashboard/posts/${post.id}`} key={post.id} className="mb-2 w-full">
              <div
                key={post.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate font-bold text-sm md:text-base">
                      {reverseGeocode(post.start_latitude, post.start_longitude)} &#8594; {reverseGeocode(post.end_latitude, post.end_longitude)}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {rideTimeFormatted}
                </p>
              </div>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
