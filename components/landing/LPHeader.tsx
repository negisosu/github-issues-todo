import Link from "next/link";
import { SessionButton } from "../SessionButton";

export function LPHeader() {
    return(
        <div>
        <header className="px-4 lg:px-6 h-16 flex items-center border-b border-neutral-200">
            <Link href="/" className="flex items-center justify-center">
            <div className="flex items-center space-x-2 font-bold">
                Issues TODO
            </div>
            </Link>
            <nav className="ml-auto">
                <SessionButton/>
            </nav>
      </header>
        </div>
    )
}