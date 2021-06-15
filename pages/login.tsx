import { GetServerSidePropsContext } from 'next'
import { getProviders, signIn, ClientSafeProvider, getSession } from 'next-auth/client'
import Layout from '../components/Layout'

interface LoginProps {
    providers: Record<string, ClientSafeProvider>
}

export default function Login({ providers }: LoginProps) {
    return (
        <div>
            {Object.values(providers).map(provider => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                </div>
            ))}
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res } = context
    const session = await getSession({ req })

    if (session && res) {
        res.writeHead(302, {
            Location: '/'
        })

        res.end()
        return { props: {} }
    }


    const providers = await getProviders()

    return {
        props: { providers }
    }
}