import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
        authorization: { params: { scope: "read:user user:email repo issues" }}
    })],
    callbacks: {
        async jwt({ token, account, profile }){
            if(account){
                token.access_token = account.access_token
                token.id = profile?.id
            }

            return token
        },
        async session({ session, token }){
            session.sessionToken = token.access_token as string
            return session
        }
    }
})