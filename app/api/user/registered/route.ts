import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const id = String(body.id)
    const name = String(body.name)

    try{
        // userの取得
        const user = await prisma.user.findUnique({
            where: {
                githubName_githubId: {
                    githubId: id,
                    githubName: name
                }
            }
        })

        // userが登録されていない場合
        if(!user){
            return NextResponse.json({
                registered: false
            })
        }

        return NextResponse.json({
            registered: true
        })
    }catch(e){
        console.error(e)
        throw e
    }
}