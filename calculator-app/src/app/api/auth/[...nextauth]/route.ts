import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import AuthService from "../../../../../shared/service/AuthService"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "User Name", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (typeof credentials !== "undefined") {
                    const res = await AuthService.login({ username: credentials.username, password: credentials.password })
                    if (typeof res !== "undefined") {
                        return { id: "", apiToken: res.token }
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }