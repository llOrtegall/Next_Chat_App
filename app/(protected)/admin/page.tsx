import { auth } from "@/auth"

const AdminPage = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return <div>You must be logged in to view this page</div>;
  }

  return (
    <div>AdminPage</div>
  )
}

export default AdminPage