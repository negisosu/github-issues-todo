import { getTodoIssueOwnerRepo } from "@/lib/actions";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { parseChecklistToMarkdown, parseMarkdownToChecklist } from "@/lib/parses";
import { Comments } from "@/lib/types";
import { SearchParams } from "next/dist/server/request/search-params";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: SearchParams }) {

    const { owner, repo } = (await params)
    const todoIssue = await getTodoIssueOwnerRepo(String(owner), String(repo))

    if(!todoIssue){
        notFound()
    }

    const res = await fetchWrapper(`/repos/${owner}/${repo}/issues/${todoIssue?.issuesNumber}/comments`)

    const data: Comments = await res.json()

    if(!data[0]){
        notFound()
    }

    console.log(data[0])

    const checklist = parseMarkdownToChecklist(String(data[0].body))

    console.log(checklist)

    const markdown = parseChecklistToMarkdown(checklist)

    console.log(JSON.stringify(markdown))

    return(
        <div>
            
        </div>
    )

}