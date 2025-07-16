import { CountRepo } from "@/components/dashboard/CountRepo";
import { GitHubButton } from "@/components/dashboard/GitHubButton";
import { ShowRepos } from "@/components/dashboard/ShowRepos";
import { MyDescription } from "@/components/myTemplates/MyDescription";
import { MyTitle } from "@/components/myTemplates/MyTitle";
import { Suspense } from "react";

export default function Page() {
    return(
        <div className="w-full min-h-[200vh] sm:min-h-screen flex flex-col items-center justify-center bg-muted/50 p-4 sm:p-8">
            <div className="w-full max-w-3xl">
                <MyTitle>
                    ダッシュボード
                </MyTitle>
                <MyDescription>
                    ここであなたのTODOを管理できます！
                </MyDescription>
            </div>
            <div className="w-full max-w-4xl h-[200vh] sm:h-[100vh] grid grid-cols-2 grid-rows-8 sm:grid-cols-4 sm:grid-rows-4">
                <div className=" col-span-2 row-span-1 sm:col-span-1 sm:row-span-2 flex sm:block">
                    <div className="w-1/2 sm:w-full h-full sm:h-1/2 flex items-center justify-center p-2 sm:p-4">
                    {/* 登録しているリポジトリの数 */}
                    <Suspense>
                        <CountRepo/>
                    </Suspense>
                    </div>
                    <div className="w-1/2 sm:w-full h-full sm:h-1/2 flex items-center justify-center p-2 sm:p-4">
                    {/* セッションのGitHubページ */}
                    <Suspense>
                        <GitHubButton/>
                    </Suspense>
                    </div>
                </div>
                <div className=" col-span-2 row-span-3 sm:col-span-3 sm:row-span-2 h-full min-h-0 flex items-center justify-center p-2 sm:p-4">
                    {/*　登録しているリポジトリ一覧 */}
                    <Suspense>
                        <ShowRepos/>
                    </Suspense>
                </div>
                <div className=" col-span-2 row-span-2 flex items-center justify-center p-2 sm:p-4 border">
                    {/* お気に入りのリポジトリのタスクリストを表示 */}
                </div>
                <div className=" col-span-2 row-span-1 flex items-center justify-center p-2 sm:p-4 border">
                    {/* 最近のログ（予定） */}
                </div>
                <div className=" col-span-2 row-span-1 flex items-center justify-center p-2 sm:p-4 border ">
                    {/*　セッションのGitHubのページ */}
                </div>
            </div>
        </div>
    )
}