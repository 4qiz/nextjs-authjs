import { auth, signOut } from "@/auth";
import { Button } from "@/shared/ui/button";

export default async function Home() {
  const session = await auth();
  return (
    <>
      {JSON.stringify(session)}{" "}
      <form
        action={async () => {
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </>
  );
}
