import { getIssues, getReposPrivate } from "@/lib/actions"

export async function Onboarding() {

    const repos = await getReposPrivate()
    console.log(repos)

    const issues = await getIssues("profile")
    console.log(issues)

    return(
        <div>
            onboarding
            {repos.map(async (repo) => {
                return <div key={repo.id}>
                </div>
            })}
        </div>
    )
}