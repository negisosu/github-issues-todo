"use server"

import { auth } from "@/auth"
import { fetchWrapper } from "./fetchWrapper"
import { redirect } from "next/navigation"
import { Repos } from "./types"

export async function getUsername(): Promise<string> {
    const session = await auth()
    const username = session?.user?.name
    if(!username){
        redirect("/login")
    }
    return username
}

export async function getRepos(): Promise<Repos> {

    const username = await getUsername()

    try{
        const res = await fetchWrapper(`/users/${username}/repos`)
        const data = await res.json()
        return data
    }catch(e){
        console.error(e)
        throw e
    }
}