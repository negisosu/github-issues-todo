"use client"

import { Repos } from "@/lib/types"
import { SelectRepositories } from "./SelectRepositories"
import { useActionState, useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { createIssue } from "@/lib/actions"
import { InputErrors } from "./InputErrors"

export function OnboardingInputs({ repos }: { repos: Repos }) {

    const initialState = { message: "" , errors: {} }
    const [state, formAction, isPending] = useActionState(createIssue, initialState)

    const [repoValue, setRepoValue] = useState("")

    return(
        <div className="space-y-4">
            <form action={formAction}>
                <div className="space-y-2">
                    <Label>リポジトリ</Label>
                    <SelectRepositories repos={repos} setRepoValue={setRepoValue}/>
                </div>
                {
                    repoValue != "" && <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Issuesのタイトル</Label>
                            <Input
                            type="text"
                            name="title"
                            defaultValue={"TODO"}
                            placeholder="タイトル"
                            />
                            <InputErrors errors={state.errors?.title && state.errors.title}/>
                        </div>
                        <div className="space-y-2">
                            <Label>説明</Label>
                            <Textarea
                            name="body"
                            placeholder="説明"
                            />
                            <InputErrors errors={state.errors?.body && state.errors.body}/>
                        </div>
                        <div className="space-y-2 flex justify-end">
                            <Button type="submit" disabled={isPending}>作成</Button>
                        </div>
                    </div>
                }
            </form>
        </div>
    )
}