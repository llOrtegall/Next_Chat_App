"use server";

import { updateUsername } from "@/src";
import { revalidatePath } from "next/cache";

// Esta función se ejecutará en el servidor
export async function updateUserProfile(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;

  console.log("Server Action ejecutada con:", { username, email });

  // Aquí iría tu lógica para actualizar la base de datos
  await updateUsername(email, username);

  // Opcional: Puedes revalidar una ruta para que muestre los datos actualizados
  revalidatePath("/home");
}