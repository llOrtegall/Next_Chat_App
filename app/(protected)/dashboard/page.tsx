import { auth } from "@/auth"
import SignOut from "@/components/sign-out"

const DashboardPage = async () => {
  const session = await auth()
 
  if (!session) {
    return <div>Not authenticated</div>
  }
 
  return (
    <div className="container">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOut />
    </div>
  )
}

export default DashboardPage