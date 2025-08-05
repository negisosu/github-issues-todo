import { auth } from "@/auth";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default auth(async (req: NextRequest) => {
  // セッション情報を取得
  const session = await auth();

  console.log(session)

  // 未認証のユーザーはログインページにリダイレクト
  if (!session) {
    console.log("ユーザーは未認証です。ログインページにリダイレクトします。");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //　ユーザーがこのサービスに登録しているかを確認するAPI
  const apiUrl = new URL('/api/user/registered', req.url) 
  const res = await fetch(apiUrl.toString(), {
    method: "POST",
    body: JSON.stringify({ id: session.user?.id, name: session.user?.name })
  })

  // prismaでの接続ができなかったりした時のリダイレクト
  if(!res.ok){
    return NextResponse.redirect(new URL("/", req.url))
  }

  const data = await res.json()

  const { registered } = data

  // 未登録のユーザーは新規登録ページにリダイレクト
  if(!registered){
    console.log("ユーザーは初めてのログインです。新規登録ページにリダイレクトします。")
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // 認証済みの場合はそのまま次の処理へ進む
  return NextResponse.next();
});

// matcherで特定のパスにのみミドルウェアを適用
export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};