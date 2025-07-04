import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import SignIn from "./SignIn";

export function Login() {
    return(
        <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
        <div className="w-full max-w-md">
          {/* 戻るボタン */}
        <div className="mb-6">
            <Button variant="ghost" asChild className="p-0 h-auto">
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    ホームに戻る
                </Link>
            </Button>
        </div>

        <Card>
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">ログイン</CardTitle>
                <CardDescription>アカウントにログインして、サービスをご利用ください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex items-center justify-center">
                <SignIn/>
            </CardContent>
        </Card>

        </div>
      </div>
    )
}