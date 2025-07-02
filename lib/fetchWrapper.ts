import { auth } from "@/auth"

export async function fetchWrapper(input: RequestInfo, init: RequestInit = {}): Promise<Response> {

    const session = await auth()
    const token = (session as { sessionToken?: string })?.sessionToken

    const headers = new Headers(init.headers)
    headers.set("Accept", "application/vnd.github+json")
    headers.set("Authorization", `Bearer ${token}`)

    const res = await fetch(`${process.env.GITHUB_API_URL}${input}`, {
        ...init,
        headers
    })

    return res
}