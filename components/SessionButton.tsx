import { auth } from "@/auth"
import SignIn from "./SignIn"
import { UserButton } from "./UserButton"

export async function SessionButton() {

    const session = await auth()

    return(
        <div>
            {session
            ?
            <UserButton/>
            :
            <SignIn/>
            }
        </div>
    )
}