import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const API_URL = `http://localhost:${process.env.PORT}/items`
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        // ...add more providers here
    ],
    pages: {
        signIn: '/login',
        signOut: '/logout',
        verifyRequest: null, // (used for check email message)
        newUser: null // If set, new users will be directed here on first sign in
    },
    callbacks: {
        async signIn(user, account, profile) {
            // check if user exists within database
            const { id, name, email } = user
            const { data } = await fetch(`${API_URL}/users?filter[id][_eq]=${id}`).then(response => response.json())

            if (data.length == 0) {
                await fetch(`${API_URL}/users`, {
                    method: 'POST',
                    body: JSON.stringify({ id, name, email }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
            }

            return true
        },
        async session(session, user) {
            // get user from database
            const { email } = user
            const { data } = await fetch(`${API_URL}/users?filter[email][_eq]=${email}`).then(response => response.json())
            const currentUser = data[0];

            (session.user as any).id = currentUser.id
            // extend session object
            return session
        },
    }
})