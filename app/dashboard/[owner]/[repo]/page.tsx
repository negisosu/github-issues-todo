import { ReturnDashboard } from "@/components/ReturnDashboard";
import { RoughLoading } from "@/components/RoughLoading";
import { Todo } from "@/components/Todo";
import { Suspense } from "react";

export default async function Page({params}: {params: Promise<{ [key: string]: string}>}) {

    const { owner } = await params
    const { repo } = await params

    return(
        <div className="bg-muted/50">
            <ReturnDashboard/>
            <Suspense fallback={<RoughLoading/>}>
                <Todo owner={String(owner)} repo={String(repo)}/>
            </Suspense>
        </div>
    )

}