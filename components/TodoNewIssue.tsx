"use client"

import { useActionState } from "react";
import { InputErrors } from "./InputErrors";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { createIssueTODO } from "@/lib/actions";
import { createIssueState } from "@/lib/schemas";

export function TodoNewIssue({ owner, repo }: { owner: string, repo: string }) {

    const initialState: createIssueState = { message: "" }

    const [state, formAction, isPending] = useActionState(createIssueTODO ,initialState)

    return(
        <div  className="w-full min-h-screen flex flex-col items-center justify-center bg-muted/50 px-4 sm:px-8">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>
                            TODOを作成してみよう！
                        </CardTitle>
                        <CardDescription>
                            このリポジトリにはTODOとなるIssuesがまだ存在しません。作成してみましょう。
                        </CardDescription>
                    </CardHeader>
                <form action={formAction}>
                    <CardContent>
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
                        <input
                        type="hidden"
                        defaultValue={owner}
                        name="owner"
                        />
                        <input
                        type="hidden"
                        defaultValue={repo}
                        name="repo"
                        />
                        <div className="space-y-2 flex justify-end">
                            <Button type="submit" disabled={isPending}>作成</Button>
                        </div>
                    </CardContent>
                    </form>
                </Card>
        </div>
    )
}