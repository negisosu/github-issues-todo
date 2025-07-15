import { CountRepo } from "@/components/dashboard/CountRepo";
import { GitHubButton } from "@/components/dashboard/GitHubButton";

export default function Page() {
    return(
        <div className="w-full min-h-[120vh] sm:min-h-screen flex justify-center bg-muted/50 p-4 sm:p-8">
            <div className="w-full max-w-4xl grid grid-cols-2 grid-rows-8 sm:grid-cols-4 sm:grid-rows-4">
                <div className=" col-span-2 row-span-1 sm:col-span-1 sm:row-span-2 flex sm:block">
                    <div className="w-1/2 sm:w-full h-full sm:h-1/2 flex items-center justify-center p-2 sm:p-4">
                    {/* 登録しているリポジトリの数 */}
                    <CountRepo/>
                    </div>
                    <div className="w-1/2 sm:w-full h-full sm:h-1/2 flex items-center justify-center p-2 sm:p-4">
                    {/* セッションのGitHubページ */}
                    <GitHubButton/>
                    </div>
                </div>
                <div className=" col-span-2 row-span-3 sm:col-span-3 sm:row-span-2 flex items-center justify-center border">
                    {/*　登録しているリポジトリ一覧 */}
                </div>
                <div className=" col-span-2 row-span-2 flex items-center justify-center border">
                    {/* お気に入りのリポジトリのタスクリストを表示 */}
                </div>
                <div className=" col-span-2 row-span-1 flex items-center justify-center border">
                    {/* 最近のログ（予定） */}
                </div>
                <div className=" col-span-2 row-span-1 flex items-center justify-center border ">
                    {/*　セッションのGitHubのページ */}
                </div>
            </div>
        </div>
    )
}