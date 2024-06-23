import Form from "@/app/ui/posts/edit-form";
import Breadcrumbs from "@/app/ui/posts/breadcrumbs";
import { fetchUsers, fetchPostById } from "@/app/lib/data";
import { UserField, PostForm } from "@/app/lib/definitions";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [post, users]: [PostForm | undefined, UserField[] | undefined] =
    await Promise.all([fetchPostById(id), fetchUsers()]);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Posts", href: "/dashboard/posts" },
          {
            label: "Edit Post",
            href: `/dashboard/posts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form post={post} />
    </main>
  );
}
