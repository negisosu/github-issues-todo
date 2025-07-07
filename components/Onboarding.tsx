import { getReposPrivate } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { OnboardingInputs } from "./OnboardingInputs"


export async function Onboarding() {

    const repos = await getReposPrivate()

    return(
        <div className="w-full min-h-screen flex items-center justify-center bg-muted/50">
            <Card className="w-full max-w-md mx-2">
                <CardHeader>
                    <CardTitle>
                        TODOを作成
                    </CardTitle>
                    <CardDescription>
                        TODOリストを作成するリポジトリを選んでみましょう！
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <OnboardingInputs repos={repos}/>
                </CardContent>
            </Card>
        </div>
    )
}