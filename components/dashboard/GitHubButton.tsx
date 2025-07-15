import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Github } from "lucide-react";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function GitHubButton() {

    const res = await fetchWrapper("/user")
    const data = await res.json()
    console.log(data)

    return(
        <Link href={data.html_url} className="w-full h-full">
            <Card className="w-full h-full hover:bg-neutral-100">
                <CardHeader>
                    <CardDescription className=" w-full text-center text-xs">
                        あなたのGitHubページ
                    </CardDescription>
                </CardHeader>
                <CardContent className="w-full flex items-center justify-center">
                        <Github className="w-2/3 h-2/3"/>
                </CardContent>
            </Card>
        </Link>
    )
}