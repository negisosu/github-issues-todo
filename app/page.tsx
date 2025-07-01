import { auth } from "@/auth";
import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";

export default async function Home() {

  const session = await auth()

  console.log(session)

  return (
    <div>
      <SignIn/>
      <SignOut/>
      page
    </div>
  );
}
