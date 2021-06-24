import { API_URL } from "../constants"

export default async function getAccessToken() {
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

    return access_token as string
}