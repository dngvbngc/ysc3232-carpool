import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function UsersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  // Dummy user profile data
  const userProfile = {
    name: "Zhu Wentao",
    email: "zwt2000sg@outlook.com",
    // Dummy posts authored by the user
    postsAuthored: [
      { id: 1, title: "Zhu Wentao", content: "We are going to NTU:)" },
      { id: 2, title: "Zhu Wentao", content: "Let us hop on a supper ride!" },
    ],
    // Dummy posts hearted/followed by the user
    postsHearted: [
      {
        id: 3,
        title: "Delba de Oliveira",
        content: "Sending off a friend to Changi!",
      },
      {
        id: 4,
        title: "Steph Dietz",
        content: "Who wants to go to Sentosa during recess week?",
      },
      { id: 5, title: "Hector Simpson", content: "I love this app!" },
    ],
  };

  return (
    <div className='w-full'>
      <div className='container mx-auto my-8 p-4 pt-0 pb-0'>
        <div className='max-w-2xl mx-auto bg-white shadow-lg rounded-lg pl-6 pb-8 pt-3'>
          <p className={`p-5 mr-5`}>
            <strong>Name: </strong> {userProfile.name}
          </p>
          <p className={`pl-5 mr-5`}>
            <strong>Email: </strong> {userProfile.email}
          </p>
        </div>
      </div>

      <div className='container mx-auto my-8 p-4 pt-0 pb-0'>
        <div className='max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6'>
          <h2 className={`${lusitana.className} text-2xl p-5`}>Your Posts</h2>
          <ul className={`pl-5 mr-5`}>
            {userProfile.postsAuthored.map((post) => (
              <li className={`p-5`} key={post.id} style={styles.post}>
                <strong className={`p-5`}>{post.title}</strong>
                <p className={`pl-5`}>{post.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='container mx-auto my-8 p-4 pt-0 pb-0'>
        <div className='max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6'>
          <h2 className={`${lusitana.className} text-2xl p-5`}>Following</h2>
          <ul className={`pl-5 mr-5`}>
            {userProfile.postsHearted.map((post) => (
              <li key={post.id} style={styles.post}>
                <strong className={`p-5`}>{post.title}</strong>
                <p className={`pl-5`}>{post.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1500px",
    margin: "0 auto",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  profileInfo: {
    marginBottom: "20px",
  },
  posts: {
    marginBottom: "20px",
  },
  post: {
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
};
