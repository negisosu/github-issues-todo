"use client"

import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { useActionState } from "react"
import { createComment } from "@/lib/actions"

export function TodoAddCommentButton({ owner, repo, issueNumber }: { owner: string, repo: string, issueNumber: string }) {
    const initialState: { message: string } = { message: "" }
    const [state, formAction, isPending] = useActionState(createComment, initialState)

    console.log(state)

    return(
        <form action={formAction} className="w-full flex justify-center items-center">
            <input
            type="hidden"
            name="owner"
            defaultValue={owner}
            />
            <input
            type="hidden"
            name="repo"
            defaultValue={repo}
            />
            <input
            type="hidden"
            name="issueNumber"
            defaultValue={issueNumber}
            />
            <Button
            type="submit"
            variant="outline"
            className="w-full max-w-3xl flex"
            disabled={isPending}
            >
                <Plus/>
                グループを追加
            </Button>
        </form>
    )
}