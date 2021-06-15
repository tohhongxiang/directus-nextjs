import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { API_URL } from '../../../constants'
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
            if (!user) return false

            // get directus access token
            const directus_admin = {
                email: process.env.DIRECTUS_EMAIL,
                password: process.env.DIRECTUS_PASSWORD
            }
            const { data: { access_token } } = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(directus_admin),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(r => r.json())

            // check if user exists within database
            const { id, name, email } = user
            const { data } = await fetch(`${API_URL}/items/users?filter[id][_eq]=${id}`, { headers: { 'Authorization': `Bearer ${access_token}` } }).then(response => response.json())

            if (data.length == 0) {
                await fetch(`${API_URL}/items/users`, {
                    method: 'POST',
                    body: JSON.stringify({ id, name, email }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                })
            }

            return true
        },
        async session(session, user) {
            // get directus access token
            const directus_admin = {
                email: process.env.DIRECTUS_EMAIL,
                password: process.env.DIRECTUS_PASSWORD
            }
            const { data: { access_token } } = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(directus_admin),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(r => r.json())

            // get user from database
            const { email } = user
            const { data } = await fetch(`${API_URL}/items/users?filter[email][_eq]=${email}`, { headers: { 'Authorization': `Bearer ${access_token}` } }).then(response => response.json())

            const currentUser = data[0];
            if (!currentUser) {
                return session
            }

            // extend session object
            (session.user as any).id = currentUser.id
            return session
        },
    }
})