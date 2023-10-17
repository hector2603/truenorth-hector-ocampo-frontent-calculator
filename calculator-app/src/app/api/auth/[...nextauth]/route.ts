import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import AuthService from "../../../../../shared/service/AuthService"
import UserService from "../../../../../shared/service/UserService";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "User Name", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (typeof credentials !== "undefined") {
                    try {
                        const res = await AuthService.login({ username: credentials.username, password: credentials.password })
                        if (typeof res !== "undefined") {
                            const user = await UserService.getUser(res.token);
                            console.log("user -> ", user)
                            return { id:user.data.id, username:user.data.username, status:user.data.status, apiToken: res.token}
                        } else {
                            return null
                        }
                    } catch (error) {
                        console.log("error -> ", error)
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
});

export { handler as GET, handler as POST };