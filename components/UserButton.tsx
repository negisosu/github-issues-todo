import { auth, signOut } from "@/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Image from "next/image";

export async function UserButton() {

    const session = await auth()

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex h-full rounded-full">
                    <Image
                    src={session?.user?.image && session.user.image || ""}
                    alt=""
                    width={100}
                    height={100}
                    className="w-10 h-10 rounded-full"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    {session?.user?.email}
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <form action={async () => {
                            "use server"
                            await signOut({ redirectTo: "/"})
                        }}>
                            <button type="submit" className="text-red-500 w-full h-full">ログアウト</button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}