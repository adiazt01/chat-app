import { initProfile } from "@/lib/auth/initialProfile";

export default async function Home() {
  const user = await initProfile();

  if (user) {
    return (
      <div>
        <h1>Welcome {user.name}</h1>
        <p>Your email is {user.email}</p>
      </div>
    );
  } else {
    return <h1>Not logged in</h1>;
  }
}
