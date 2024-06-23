import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";

const iconMap = {
  closed: ClockIcon,
  users: UserGroupIcon,
  open: ClockIcon,
  posts: InboxIcon,
};

export default async function CardWrapper() {
  const { numberOfUsers, numberOfPosts, totalOpenPosts, totalClosedPosts } =
    await fetchCardData();
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}
      <Card title='Closed' value={totalClosedPosts} type='closed' />
      <Card title='Open' value={totalOpenPosts} type='open' />
      <Card title='Total Posts' value={numberOfPosts} type='posts' />
      <Card title='Total Users' value={numberOfUsers} type='users' />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "posts" | "users" | "open" | "closed";
}) {
  const Icon = iconMap[type];

  return (
    <div className='rounded-xl bg-gray-50 p-2 shadow-sm'>
      <div className='flex p-4'>
        {Icon ? <Icon className='h-5 w-5 text-gray-700' /> : null}
        <h3 className='ml-2 text-sm font-medium'>{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}

function PageDescription() {
  return (
    <div className='mt-8 text-center text-gray-500'>
      <p className='whitespace-nowrap'>
        This dashboard above provides an overview of user and post statistics.
        You can also find the latest rideshare posts below.
      </p>
    </div>
  );
}
