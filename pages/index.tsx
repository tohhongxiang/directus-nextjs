import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'
import sayHi from '../utils'

export default function Page() {
    const [session, loading] = useSession()

    return <>
        {!session && <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>}
        {session && <>
            Signed in as {session.user.email} <br />
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <button onClick={() => signOut()}>Sign out</button>
        </>}
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context
    const session = await getSession({ req })

    sayHi()
    if (!session) return {
        props: {}
    }

    return {
        props: session
    }
}