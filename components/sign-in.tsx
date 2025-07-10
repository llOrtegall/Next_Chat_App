import { Button } from "./ui/button";
import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button type="submit" className="cursor-pointer" variant={"outline"}>
        Sign in with Google
      </Button>
    </form>
  )
}