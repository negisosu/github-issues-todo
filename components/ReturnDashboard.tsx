import Link from "next/link";

export function ReturnDashboard() {
    return(
        <div className="w-full p-8">
            <Link href={"/dashboard"} className=" text-xl hover:underline">
                ←ダッシュボードに戻る
            </Link>
        </div>
    )
}