import { fetchWrapper } from "@/lib/fetchWrapper";
import { parseChecklistToMarkdown } from "@/lib/parses";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest){
    try {
        const body = await req.json()
        const markdown = parseChecklistToMarkdown(body.todos)
        const regex = /(?<=https:\/\/api\.github\.com).*/
        const match = String(body.url).match(regex)
        if(!match){
            return NextResponse.json({ message: "タスクの更新に失敗しました" })
        }
        const url = match[0]
        if(markdown == ""){
            await fetchWrapper(url, {
                method: "DELETE"
            })
        }else {
            await fetchWrapper(url, {
                method: "PATCH",
                body: JSON.stringify({
                    body: markdown
                })
            })
        }

        return NextResponse.json({ message: "タスクの更新に成功しました"})
    } catch (e) {
        console.error(e)
        return NextResponse.json({ message: "タスクの更新中にエラーが発生しました", error: String(e) })
    }
}