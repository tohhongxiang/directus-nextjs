# Overview

We are going to create an e-commerce application with the following stack:

- NextJS with TypeScript
- Next-Auth for authentication
- TailwindCSS for styling
- Directus as a headless CMS

# Directus Setup

Create a postgres database `next-auth-client` within postgres

`npm run server` to get directus server running on port `8055`

# NextJS Setup

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

    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL,
})
```

Replace the content within `pages/index.tsx` to:

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
DATABASE_URL=
NEXTAUTH_URL=
```

- `GOOGLE_ID` and `GOOGLE_SECRET` can be found [here](https://developers.google.com/adwords/api/docs/guides/authentication). You will need to create a new OAuth2 client for google
- `DATABASE_URL` follows the format `postgres://username:password@127.0.0.1:5432/database_name`
- `NEXTAUTH_URL` is the canonical URL of the website, for Next-Auth to use.

Install more required packages

```
npm install pg
```

Run the following PostgreSQL command to create the required tables for Next-Auth

```sql
CREATE TABLE accounts
  (
    id                   SERIAL,
    compound_id          VARCHAR(255) NOT NULL,
    user_id              INTEGER NOT NULL,
    provider_type        VARCHAR(255) NOT NULL,
    provider_id          VARCHAR(255) NOT NULL,
    provider_account_id  VARCHAR(255) NOT NULL,
    refresh_token        TEXT,
    access_token         TEXT,
    access_token_expires TIMESTAMPTZ,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE sessions
  (
    id            SERIAL,
    user_id       INTEGER NOT NULL,
    expires       TIMESTAMPTZ NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    access_token  VARCHAR(255) NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE users
  (
    id             SERIAL,
    name           VARCHAR(255),
    email          VARCHAR(255),
    email_verified TIMESTAMPTZ,
    image          TEXT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE verification_requests
  (
    id         SERIAL,
    identifier VARCHAR(255) NOT NULL,
    token      VARCHAR(255) NOT NULL,
    expires    TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE UNIQUE INDEX compound_id
  ON accounts(compound_id);

CREATE INDEX provider_account_id
  ON accounts(provider_account_id);

CREATE INDEX provider_id
  ON accounts(provider_id);

CREATE INDEX user_id
  ON accounts(user_id);

CREATE UNIQUE INDEX session_token
  ON sessions(session_token);

CREATE UNIQUE INDEX access_token
  ON sessions(access_token);

CREATE UNIQUE INDEX email
  ON users(email);

CREATE UNIQUE INDEX token
  ON verification_requests(token);
```

# Resources

- [Directus Quickstart](https://docs.directus.io/getting-started/quickstart/)
- [Manually adding NextJS](https://nextjs.org/docs#manual-setup)
- [Adding Typescript to NextJS](https://nextjs.org/docs/basic-features/typescript)
- [Adding TailwindCSS to NextJS](https://tailwindcss.com/docs/guides/nextjs)
- [NextAuth Quickstart](https://next-auth.js.org/getting-started/example)
- [Configure NextAuth Database](https://next-auth.js.org/configuration/databases)
- [NextAuth Postgres Schema](https://next-auth.js.org/adapters/typeorm/postgres)
- [NextJS API Routes](https://nextjs.org/docs/api-routes/introduction) and for [typescript](https://nextjs.org/docs/basic-features/typescript#api-routes)
- [TypeORM documentation](https://github.com/typeorm/typeorm)
- [Add auth support to a Next.js app with a custom backend](https://arunoda.me/blog/add-auth-support-to-a-next-js-app-with-a-custom-backend)