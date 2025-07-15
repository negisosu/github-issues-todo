import { getRepo, getTodoIssueOwnerRepo } from "@/lib/actions"
import { fetchWrapper } from "@/lib/fetchWrapper"
import { Comments } from "@/lib/types"
import { notFound } from "next/navigation"
import { MyTitle } from "./myTemplates/MyTitle"
import { TodoSec } from "./TodoSec"
import { TodoAddCommentButton } from "./TodoAddCommentButton"
import { TodoNewIssue } from "./TodoNewIssue"

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

    console.log(data.length == 0)

    if(!data[0]){
        await fetchWrapper(`/repos/${owner}/${repo}/issues/${todoIssue.issuesNumber}/comments`, {
            method: "POST",
            body: JSON.stringify({
                body: "- [ ] タスク"
            })
        })
    }

    return(
        <div className="w-full min-h-screen flex flex-col items-center bg-muted/50 px-4 py-4 sm:px-8 space-y-4">
            <MyTitle>
                {repo}のTODOリスト
            </MyTitle>
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