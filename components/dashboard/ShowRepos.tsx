import { getAllIssues, getReposPrivate } from "@/lib/actions"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import Link from "next/link"
import clsx from "clsx"

export async function ShowRepos() {

    const repos = await getReposPrivate()

    const todoIssues = await getAllIssues()

    const set = new Set(todoIssues.map(todo => todo.repo))

    return(
        <div className="h-full min-h-0 w-full">
        <Card className="w-full h-full flex flex-col">
            <CardHeader>
                <CardTitle>
                    TODOリスト
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden flex flex-col">
                    <Table>
                        <TableHeader>
                            <TableRow className="text-xs sm:text-sm">
                                <TableHead>リポジトリ</TableHead>
                                <TableHead className="w-1/3 text-center">状態</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="overflow-auto flex-1 min-h-0">
                            {repos.filter(item => set.has(item.name)).map((repo) => {
                                if(!repo.owner || !repo.name) return null
                                return (
                                    <TableRow key={repo.id}>
                                        <TableCell className="text-blue-400 hover:text-blue-500 hover:underline">
                                            <Link href={`/dashboard/${repo.owner.login}/${repo.name}`}>
                                                {repo.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell className={clsx(
                                            repo.visibility == "private" && "text-neutral-400",
                                            "text-center"
                                        )}>
                                            {repo.visibility}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            {repos.filter(item => !set.has(item.name)).map((repo) => {
                                if(!repo.owner || !repo.name) return null
                                return (
                                    <TableRow key={repo.id}>
                                        <TableCell className="text-blue-400 hover:text-blue-500 hover:underline">
                                            <Link href={`/dashboard/${repo.owner.login}/${repo.name}`}>
                                                {repo.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-center text-blue-400 hover:text-blue-500 hover:underline">
                                            <Link href={`/dashboard/${repo.owner.login}/${repo.name}`}>
                                                TODOを作成する→
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
            </CardContent>
        </Card>
        </div>
    )
}