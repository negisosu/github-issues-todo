import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const functions = [
    {
        title: "a",
        description: "a"
    },
    {
        title: "b",
        description: "b"
    }
]

export function LPContents() {
    return(
        <div>
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                タイトル
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                説明
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link href={"/dashboard"}>
                                <Button size="lg" className="h-12 px-8">
                                    ダッシュボードへ
                                <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            主要機能
                        </h2>
                    </div>
                </div>
                <div className="mx-auto px-8 grid max-w-5xl items-start gap-6 py-12 lg:gap-12">
                    {
                        functions.map((func) => (
                            <Card className="relative overflow-hidden" key={func.title}>
                                <CardHeader>
                                    <CardTitle className="text-xl">{func.title}</CardTitle>
                                    <CardDescription>
                                        {func.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>

                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}