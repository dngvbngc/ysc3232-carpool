import Form from "@/app/ui/posts/create-form";
import Breadcrumbs from "@/app/ui/posts/breadcrumbs";
import { fetchUsers } from "@/app/lib/data";

export default async function Page() {
  const users = await fetchUsers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Post", href: "/dashboard/posts" },
          {
            label: "Create Post",
            href: "/dashboard/posts/create",
            active: true,
          },
        ]}
      />
      <Form users={users} />
    </main>
  );
}
