import { Client } from 'pg'

export default async function getUsers() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    })
    await client.connect();
    
    const result = await client.query('SELECT * FROM users')
    console.log(result.rows)
    return result
}