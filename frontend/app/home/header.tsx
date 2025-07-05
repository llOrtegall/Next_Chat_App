import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import Image from "next/image";

interface HeaderProps {
  name?: string | null;
  image?: string | null;
  username?: string | null;
}

export const Header = async ({ name, image, username }: HeaderProps) => {
  return (
    <>
      <div>
        <Image src={image ?? "/avatar.svg"} alt={name ?? "User Avatar"} width={50} height={50} />
        <h1>{name}</h1>
        <p>{username}</p>
      </div>
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