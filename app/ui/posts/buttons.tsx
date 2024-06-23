import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deletePost } from "@/app/lib/actions";

export function CreatePost() {
  return (
    <Link
      href='/dashboard/posts/create'
      className='flex h-10 items-center rounded-lg bg-green-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
    >
      <span className='hidden md:block'>Create Post</span>{" "}
      <PlusIcon className='h-5 md:ml-4' />
    </Link>
  );
}

export function UpdatePost({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/posts/${id}/edit`}
      className='rounded-md border p-2 hover:bg-gray-100 w-full md:w-auto'
    >
      <PencilIcon className='w-5 mx-auto' />
    </Link>
  );
}

export function DeletePost({ id }: { id: string }) {
  const deletePostWithId = deletePost.bind(null, id);

  return (
    <form action={deletePostWithId} className='w-full md:w-auto'>
      <button className='rounded-md border p-2 hover:bg-gray-100 w-full'>
        <span className='sr-only'>Delete</span>
        <TrashIcon className='w-5 mx-auto' />
      </button>
    </form>
  );
}
