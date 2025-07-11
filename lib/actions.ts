"use server"

import { auth } from "@/auth"
import { fetchWrapper } from "./fetchWrapper"
import { redirect } from "next/navigation"
import { Issue, Issues, Repos } from "./types"
import { CreateIssue, createIssueState } from "./schemas"
import { revalidatePath } from "next/cache"
import { prisma } from "./prisma"

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

//　onboardingから呼び出す。バリデーションを行い、TODOの作成、このサービスへのアカウントの登録、リポジトリに対してTODOがどれかを認識するテーブルで作成
export async function createIssue(prevState: createIssueState, formData: FormData){

    // 認証情報の取得
    const session = await auth()

    // 後に使うidとnameをnull・undefinedチェック
    if(!session?.user?.id || !session?.user?.name){
        return {
            message: "Issueの作成に失敗しました。"
        }
    }

    // バリデーション
    const validatedFields = CreateIssue.safeParse({
        title: formData.get("title"),
        body: formData.get("body"),
        owner: formData.get("owner"),
        repo: formData.get("repo")
    })

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Issueの作成に失敗しました"
        }
    }

    // 値を扱いやすく
    const { title, body, owner, repo } = validatedFields.data


    // 非同期処理
    try{
        // TODOの作成
        const res = await fetchWrapper(`/repos/${owner}/${repo}/issues`, {
            method: "POST",
            body: JSON.stringify({
                title: title,
                body: body
            })
        })

        const data: Issue = await res.json()

        // ユーザーの作成（登録）
        const user = await prisma.user.create({
            data: {
                githubId: String(session?.user?.id),
                githubName: session?.user?.name
            }
        })

        // TODOの判定用作成
        await prisma.todoIssue.create({
            data: {
                owner: owner,
                repo: repo,
                issuesNumber: data.number,
                userId: user.githubId,
                userName: user.githubName
            }
        })
    }catch(e){
        console.error(e)
        return {
            message: "Issueの作成に失敗しました"
        }
    }

    // dashboardでの情報取得をリセット
    revalidatePath("/dashboard")
    // dashboardにリダイレクト
    redirect("/dashboard")
}