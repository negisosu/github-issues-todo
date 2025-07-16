import { getRepo, getTodoIssueOwnerRepo } from "@/lib/actions"
import { fetchWrapper } from "@/lib/fetchWrapper"
import { Comments } from "@/lib/types"
import { notFound, redirect } from "next/navigation"
import { MyTitle } from "./myTemplates/MyTitle"
import { TodoSec } from "./TodoSec"
import { TodoAddCommentButton } from "./TodoAddCommentButton"
import { TodoNewIssue } from "./TodoNewIssue"
import { Ellipsis } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { TodoDeleteItem } from "./TodoDeleteItem"
import { prisma } from "@/lib/prisma"

export async function Todo({ owner, repo }: { owner: string, repo: string }) {

    const todoIssue = await getTodoIssueOwnerRepo(String(owner), String(repo))

    if(!todoIssue){
        const repository = await getRepo(owner, repo)

        if(repository.name){
            return(
                <TodoNewIssue owner={owner} repo={repo}/>
            )
        }else{
            notFound()
        }
    }

    const res = await fetchWrapper(`/repos/${owner}/${repo}/issues/${todoIssue?.issuesNumber}/comments`)

    const data: Comments = await res.json()

    console.log(data)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!Array.isArray(data) && (data as any).message === 'Not Found') {
        await prisma.todoIssue.delete({
            where: {
                owner_repo: {
                    owner: owner,
                    repo: repo
                }
            }
        })
        redirect(`/dashboard/${owner}/${repo}`)
    }

    if(!data[0]){
        await fetchWrapper(`/repos/${owner}/${repo}/issues/${todoIssue.issuesNumber}/comments`, {
            method: "POST",
            body: JSON.stringify({
                body: "- [ ] タスク"
            })
        })
        redirect(`/dashboard/${owner}/${repo}`)
    }

    return(
        <div className="w-full min-h-screen flex flex-col items-center px-4 py-4 sm:px-8 space-y-4">
            <MyTitle>
                {repo}のTODOリスト
            </MyTitle>
            <div className="w-full max-w-3xl flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Ellipsis className="w-10 h-10 hover:bg-neutral-200 rounded-full"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <div className="text-center p-2">
                                {repo}
                            </div>
                            <DropdownMenuItem>
                                <TodoDeleteItem owner={owner} repo={repo}/>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {data.map((comment, i) => {
                return(
                    <div key={comment.id}>
                        <div className="text-neutral-500 p-1 text-xs w-full items-center">グループ{i+1}</div>
                        <TodoSec comment={comment} key={comment.id}/>
                    </div>
                )
            })}
            <TodoAddCommentButton owner={owner} repo={repo} issueNumber={String(todoIssue.issuesNumber)}/>
        </div>
    )
}