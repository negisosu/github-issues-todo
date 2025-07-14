import { Onboarding } from "@/components/Onboarding";
import { RoughLoading } from "@/components/RoughLoading";
import { Suspense } from "react";

export default function Page() {
    return(
        <div>
            <Suspense fallback={<RoughLoading/>}>
                <Onboarding/>
            </Suspense>
        </div>
    )
}