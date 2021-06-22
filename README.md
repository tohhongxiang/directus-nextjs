# Setup from a clean ubuntu

1. From local, create a database dump and copy into remote

```
pg_dump next-auth-client > directus-dump 
scp directus-dump username@host:/home/user/directus-dump
```

2. Update all packages. Install postgres and relevant packages. Create a new database, and dump data into the database.

```
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres createdb shopping-seshuri
sudo -u postgres psql shopping-seshuri < directus-dump
```

3. Create a new postgres user. Check that the user exists with the command `\du`

```
sudo -su postgres psql
CREATE USER username WITH SUPERUSER PASSWORD 'password'
\du
\q
```

4. Clone the repository, and install required packages

```
git clone https://github.com/tohhongxiang123/directus-nextjs.git
cd directus-nextjs
npm ci
```

5. Create `.env` file and fill it in

```
touch .env
nano .env
```

# Overview

We are going to create an e-commerce application with the following stack:

- Directus as a headless CMS
- NextJS with TypeScript
- Next-Auth for authentication
- TailwindCSS for styling
- Snipcart for shopping cart

Here is the following feature scope we would like to achieve

- Customer able to login and view their purchase history
- Shopping cart that also allows user to be sent to checkout
- Customer able to pay
- Website owner able to login and update product catalogs (Add product, delete product, update product)

# Directus Setup

In the root of the project, run

```
npx create-directus-project .
```

Follow the prompts. We will be using the following configuration:
- Database client: PostgreSQL
- Host: 127.0.0.1
- Port: 5432
- Database name: next-auth-client
- Database user: postgres
- Database password: postgrespassword

Then you will be prompted to create your first admin user for directus. We will be using
- Email: admin@example.com
- Password: 123456789

Create a postgres database `next-auth-client` within postgres, to allow directus to start using that database.

Inside `package.json`, add a new `scripts` command:

```
"server": "npx directus start"
```

`npm run server` to get directus server running on port `8055`. Go to `http://localhost:8055` and login with the admin user created above to check that it works.

# NextJS Setup

We will now integrate NextJS into our project as well.

```
npm install next react react-dom
```

Create a new folder `pages` to store NextJS pages. Create a new file `index.jsx` within `pages` 

```jsx
import React from 'react'

export default function index() {
    return (
        <div>
            Hello world
        </div>
    )
}
```

Running `npm run dev` will run NextJS on `http://localhost:3000` and you can see `index.jsx` being served.

# Adding TypeScript to NextJS

Create an empty `tsconfig.json` within the root of the project. Then run

```
npm install --save-dev typescript @types/react
```

Rename `index.jsx` to `index.tsx`. Now restarting NextJS, we are able to get `index.tsx` served.

# Adding TailwindCSS to NextJS


Install packages required for tailwind

```
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

Generate `tailwind.config.js` and `postcss.config.js`:

```
npx tailwindcss init -p
```

Within `tailwind.config.js`, configure `purge` option with paths to all your pages and components

```js
module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
```

Create the file `pages/_app.tsx` and paste the following inside:

```jsx
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp
```

This imports TailwindCSS into the project.

# Using NextAuth with NextJS

Install the package

```
npm install next-auth
```

Create a file called `[...nextauth].ts` in `pages/api/auth`, and fill it up with the following:

```ts
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        // ...add more providers here
    ],
})
```

Here, we will only be using Google's OAuth to sign in to our application. 

Now, replace the content within `pages/index.tsx` to:

```tsx
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Page() {
    const [session, loading] = useSession()

    return <>
        {!session && <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>}
        {session && <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
        </>}
    </>
}
```

This converts `index.tsx` into a page to allow the user to sign in. 

Replace the content within `pages/_app.tsx` to:

```tsx
import 'tailwindcss/tailwind.css'
import { Provider } from 'next-auth/client'

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
```

This allows the current login session to be accessed throughout the app through the `useSession()` hook.

Within .env, add the following:

```
GOOGLE_ID=
GOOGLE_SECRET=
NEXTAUTH_URL=
```

- `GOOGLE_ID` and `GOOGLE_SECRET` can be found [here](https://developers.google.com/adwords/api/docs/guides/authentication). You will need to create a new OAuth2 client for google
- `NEXTAUTH_URL` is the canonical URL of the website, for Next-Auth to use.

# Making Directus and NextJS run at the same time

Install `concurrently`

```
npm install concurrently
```

Then change `dev` in `package.json` to:

```
"dev": "concurrently \"next dev\" \"npm run server\"",
```

# Custom Login Page

We are going to use `/login` to be our login page. Within `/pages/api/auth/[...nextauth].ts` we will add the `pages` option to next-auth

```ts
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        // ...add more providers here
    ],
    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL,
    pages: {
        signIn: '/login',
        signOut: '/logout',
        verifyRequest: null, // (used for check email message)
        newUser: null // If set, new users will be directed here on first sign in
    }
})
```

Now we can create a page under `/pages/login.tsx` and fill it with what we want

```tsx
import { GetServerSidePropsContext } from 'next'
import { getProviders, signIn, ClientSafeProvider, getSession } from 'next-auth/client'

interface LoginProps {
    providers: Record<string, ClientSafeProvider>
}

export default function Login({ providers }: LoginProps) {
    return (
        <>
            {Object.values(providers).map(provider => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                </div>
            ))}
        </>
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
```

Important things to note:
- Inside `getServerSideProps`, we try and see if a session already exists. If it does, we redirect to `/`. If not, we get all the available providers to login with, and we return them as props to the login page to render.
- For each provider, we sign in with `signIn(provider.id)` provided by next-auth

You can see a more elaborate tutorial [here](https://www.youtube.com/watch?v=kB6YNYZ63fw).

# Global Layout

We will now write the layout we want to use throughout the app. It will have a navbar on top, the main content in the middle, and a footer below. Refer to the following files:
- Navbar: `/components/Navbar.tsx`
- Footer: `/components/Footer.tsx`
- Layout: `/components/Layout.tsx`

The navbar is based off [TailwindUI's navbar](https://tailwindui.com/components/application-ui/navigation/navbars). Important things to note:
- `Navbar` should have links to `/login` to login, and display different things based on whether the user is logged in or not. To check whether the user is logged in, you can use the `useSession` hook provided by next auth. 

```ts
const [session, isLoading] = useSession();
const isLoggedIn = session !== null
```

- Within `Navbar`, we also used a `useOnClickOutside(ref, handler)` hook, which runs `handler` whenever a click **outside** `ref` is detected. Code for the hook is found [here](https://usehooks.com/useOnClickOutside/)

An important thing to note is that we will use `Layout` globally. Within `/pages/_app.tsx`, it looks like:

```tsx
export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
```

# Setting Up Users

Now we will save users into our database. The flow will be:

- User logs in with NextAuth
- The user is created within the database if he does not already exist
- We extend the session object to include more information about the user
- We return the new extended session object instead

We will do this inside the `signIn` callback that runs everytime a user signs in, provided by NextAuth. Also, we want to be able to fetch the user stored within our database, and then extend the `session` object provided by next-auth to give more details. (In this example, we will simply extend the session object with the user's `id`) All this will be done within the `callback` option passed into `NextAuth` within `/pages/api/auth/[...nextauth].ts`.

But first, we must create our user data model.

Our user schema will have the following columns:
- id (Primary not null string. We are not having this automatically generated because we want to use the ID provided by google's OAuth)
- email (Not null string)
- name (Not null string)
- date_created (Timestamp)
- date_updated (Timestamp)

Go to http://localhost:8055 and login with admin@example.com. Then create a new collection `users` with those fields above. Make sure to enable permissions for public users to GET the `users` data model (By default public users has no access to any collection). We will not allow public users to POST, PATCH, or DELETE users.

Now within `/pages/api/auth/[...nextauth].ts`, we will update our `NextAuth` object to

```ts
const API_URL = `${process.env.BASE_URL}:${process.env.PORT}`
export default NextAuth({
    // ...already exists
    callbacks: {
        async signIn(user, account, profile) {
            if (!user) return false

            // check if user exists within database
            const { id, name, email } = user
            const { data } = await fetch(`${API_URL}/items/users?filter[id][_eq]=${id}`).then(response => response.json())

            // if no user, get directus access token, then create a new user
            if (data.length == 0) {
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
            // get user from database
            const { email } = user
            const { data } = await fetch(`${API_URL}/items/users?filter[email][_eq]=${email}`).then(response => response.json())

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
```

Note: The following new variables were added to `.env`
- `BASE_URL` - the base url of our site. For local development, it is `http://localhost`
- `DIRECTUS_EMAIL`
- `DIRECTUS_PASSWORD`

Now if we were to sign in using google onto our webpage, and then check directus, we will see our new user appearing within our database. And, our session object will also include `id`

# Adding SnipCart

We will now add [Snipcart](https://snipcart.com/), which is a shopping cart that supports international payments, onto the site. Within `/components/Layout.tsx`, we will include assets for snipcart. Specifically, within the head:

```tsx
<link rel="preconnect" href="https://app.snipcart.com"></link>
<link rel="preconnect" href="https://cdn.snipcart.com"></link>
<link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css" />
<script async src="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js"></script>
```

Snipcart's CDN assets, css and js. Then, within the body of the layout, we include the cart itself, hidden

```tsx
<div hidden id="snipcart" data-api-key={process.env.SNIPCART_KEY} data-config-modal-style="side"></div>
```

If you want a full screen cart rather than a side modal, remove `data-config-modal-style="side"`.

Another thing to note is the region. Available regions will be the regions you allow your customers to checkout from. Under `Dashboard/Regional Settings`, there is a section for `Enabled Countries`. Ensure the correct countries are checked.

# Adding Products

Our product schema will look like this:

- id (Primary not null auto-increment)
- name (string not null)
- price (float not null)
- description (rich text)
- image (file)
- date_created (timestamp)
- date_updated (timestamp)

Create a new collection in directus, called `products`, and fill up the details accordingly. Then create a product within directus. To get products, you will have to GET http://localhost:8055/items/products. A sample product will look like this when retrieved

```json
{
    "id": 1,
    "date_created": "2021-06-15T11:40:55+08:00",
    "date_updated": "2021-06-15T12:38:21+08:00",
    "price": 79.99,
    "description": "<p>Vincent Van Gogh's&nbsp;<strong>amazing</strong> starry night</p>",
    "image": "f3823afc-873e-4b97-ae46-b06f19c9bd6b",
    "name": "Starry Night Painting"
}
```

To get the image, we must do 2 things

1. Within directus dashboard, go to `Settings/Roles and Permissions` and expand `System Collections`. Make sure that the public is able to view `Directus Files`
2. To actually get the file, make a GET request to `http://localhost:8055/assets/:file-id`. This endpoint also supports query arguments, which can be found [here](https://docs.directus.io/reference/api/assets/)

## Many to Many Relationships

We will add a many-to-many relationship called `categories` within our products. First, we must create a collection called `categories` which has the following schema

- id
- name

Now in `products`, create a new many-to-many field called `categories`. Check that it maps `products.id` to `categories.id` in a junction collection called `products_categories`. If required, check "Add Many-to-Many to categories" under the relationship section as well. This creates a corresponding `products` column in the `categories` table.

Now, to be able to see this new field, we must go to `Settings/Roles and Permissions` in the directus dashboard and make sure public users are able to see the `Products Categories` table.

We will now also add another many-to-many field within `products` called `secondary_images`, which will be additional images for the product. Under directus' dashboard, create a new field with the option "Multiple Files", name it `secondary_images`. After that, under `Settings/Roles and Permissions`, also make sure that the public can view the `Products Directus Files` collection





# Resources

- [Directus Quickstart](https://docs.directus.io/getting-started/quickstart/)
- [Manually adding NextJS](https://nextjs.org/docs#manual-setup)
- [Adding Typescript to NextJS](https://nextjs.org/docs/basic-features/typescript)
- [Adding TailwindCSS to NextJS](https://tailwindcss.com/docs/guides/nextjs)
- [NextAuth Quickstart](https://next-auth.js.org/getting-started/example)
- [Configure NextAuth Database](https://next-auth.js.org/configuration/databases)
- [NextAuth Postgres Schema](https://next-auth.js.org/adapters/typeorm/postgres)
- [NextJS API Routes](https://nextjs.org/docs/api-routes/introduction) and for [typescript](https://nextjs.org/docs/basic-features/typescript#api-routes)
- [Add auth support to a Next.js app with a custom backend](https://arunoda.me/blog/add-auth-support-to-a-next-js-app-with-a-custom-backend)
- [Custom next-auth Login Page](https://www.youtube.com/watch?v=kB6YNYZ63fw)
- [NextJS Authentication Crash Course with NextAuth.js](https://www.youtube.com/watch?v=o_wZIVmWteQ)
- [TailwindUI's navbar](https://tailwindui.com/components/application-ui/navigation/navbars)
- [useOnClickOutside](https://usehooks.com/useOnClickOutside/)
- [Snipcart Getting Started](https://docs.snipcart.com/v3/setup/installation)
- [Directus Assets](https://docs.directus.io/reference/api/assets/)
- [SEO](https://snipcart.com/blog/react-nextjs-single-page-application-seo)
- [Snipcart API](https://docs.snipcart.com/v3/api-reference/introduction)