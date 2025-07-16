import { getAllIssues } from "@/lib/actions";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

export async function CountRepo() {

    const repos = await getAllIssues()

    return(
        <Card className="w-full h-full">
            <CardHeader>
                <CardDescription className=" w-full text-center text-xs">
                    TODOを作成したリポジトリ
                </CardDescription>
            </CardHeader>
            <CardContent className="w-full text-center text-3xl">
                    {repos.length}
            </CardContent>
        </Card>
    )
}