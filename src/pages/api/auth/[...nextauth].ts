import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {User} from "~/backend/User/User";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const authOptions = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: "Email", type: "text", placeholder: "jsmith@gmail.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials?.email && !credentials?.password)
                    return null

                const user = new User(credentials.email)
                const isCorrectCredentials = await user.verifyPassword(credentials.password)

                if (isCorrectCredentials) {
                    return {
                        id: '' //Fixear typescript error
                    }
                }
                return null
            }
        })
    ],
    callbacks: {
        async session({session, token}: { session: any, token: any }) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
            session.accessToken = token.accessToken
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            session.user.id = token.id
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            const _user = new User(session.user.email)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            const userData = await _user.getUserData()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            session.user.name = userData.name

            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return session

        },
    },

}
export default NextAuth(authOptions)