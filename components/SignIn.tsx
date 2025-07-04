
import { signIn } from "@/auth"
import { Button } from "./ui/button"

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", {
          redirectTo: "/dashboard"
        })
      }}
    >
      <Button variant="outline" type="submit" className="flex items-center gap-2 bg-transparent">
        GitHubでログイン
      </Button>
    </form>
  )
}