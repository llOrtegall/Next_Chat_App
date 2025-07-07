import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

export const Footer = () => {
  return (
    <>
      <Button
        onClick={async () => {
          "use server";
          await signOut({ redirectTo: '/' });
        }}
        className="cursor-pointer"
      >
        Cerrar sesión
      </Button>
    </>
  )
}