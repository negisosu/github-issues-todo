"use client"

import { deleteTodoIssue } from "@/lib/actions"

export function TodoDeleteItem({ owner, repo}: { owner: string, repo: string}) {
    return(
        <form action={async() => {
            await deleteTodoIssue(owner, repo)
            }}>
        <button
        type="submit"
        className="text-red-500 text-center w-[200px]"
        >
            <div className="text-lg">このTODOを削除</div>
            <div className="text-[10px]">Issueの完全な削除をREST APIから行うことはできません！このサービスからタスクの中身を削除することはできますが、Issuesとしては残るため、消したい時はGitHubのページから行ってください！</div>
        </button>
        </form>

    )
}