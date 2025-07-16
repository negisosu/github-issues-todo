import { ReturnDashboard } from "@/components/ReturnDashboard";
import { RoughLoading } from "@/components/RoughLoading";
import { Todo } from "@/components/Todo";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";

export default async function Page({ params }: { params: SearchParams }) {

    const { owner, repo } = (await params)

    return(
        <div className="bg-muted/50">
            <ReturnDashboard/>
            <Suspense fallback={<RoughLoading/>}>
                <Todo owner={String(owner)} repo={String(repo)}/>
            </Suspense>
        </div>
    )

}