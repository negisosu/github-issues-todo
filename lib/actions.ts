"use server"

import { auth } from "@/auth"
import { fetchWrapper } from "./fetchWrapper"
import { redirect } from "next/navigation"
import { Issue, Issues, Repos } from "./types"

// session情報からユーザーネームを取得する
export async function getUsername(): Promise<string> {
    const session = await auth()
    const username = session?.user?.name
    if(!username){
        redirect("/login")
    }
    return username
}

// プライベートリポジトリも含めて一覧を取得
export async function getReposPrivate(): Promise<Repos> {
    try{
        const res = await fetchWrapper(`/user/repos`)
        const data = await res.json()
        return data
    }catch(e){
        console.error(e)
        throw e
    }
}

// ユーザーがアクセスできる指定されたリポジトリのIssuesの一覧を取得
export async function getIssues(repo: string): Promise<Issues> {

    const username = await getUsername()

    try{
        const res = await fetchWrapper(`/repos/${username}/${repo}/issues`)
        const data = await res.json()
        return data
    }catch(e){
        console.error(e)
        throw e
    }
}

// ユーザーがアクセスできる指定されたリポジトリのTODOにあたるIssuesを取得
export async function getIssuesTodo(repo: string): Promise<Issue> {

    const username = await getUsername()

    const IssueId = ""

    try{
        const res = await fetchWrapper(`/repos/${username}/${repo}/issues/${IssueId}`)
        const data = await res.json()
        return data
    }catch(e){
        console.error(e)
        throw e
    }
}