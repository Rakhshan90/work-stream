import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith@gamil.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                return {
                    id: '1',
                    name: 'rakhshan',
                    email: 'rakhshan@gamil.com'
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: ({session, user, token}: any)=>{
            if(session && session.user){
                session.user.id = token.sub;
            }
            return session;
        }
    }
}