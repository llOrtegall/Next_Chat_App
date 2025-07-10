import { ModeToggle } from "@/components/ui/theme"
import { auth } from "@/auth";

import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";

export default async function Home() {
  const session = await auth();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <ModeToggle />
      {
        session ? (
          <>
            <h1 className="text-2xl font-bold">Welcome, {session.user?.name || "User"}!</h1>
            <SignOut />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Please Sign In</h1>
            <SignIn />
          </>
        )
      }
    </section>
  );
}
