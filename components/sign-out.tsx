import { Button } from "./ui/button";
import { signOut } from "@/auth";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button type="submit" className="cursor-pointer">
        Sign Out
      </Button>
    </form>
  )
}