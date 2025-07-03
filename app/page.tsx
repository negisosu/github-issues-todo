import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";
import { getIssues } from "@/lib/actions";

export default async function Home() {

  const data = await getIssues("profile")

  console.log(data)

  return (
    <div>
      <SignIn/>
      <SignOut/>
      page
    </div>
  );
}
