import { signOut } from "next-auth/client";
import Layout from '../components/Layout'
import React from "react";

export default function Page() {
    return (
        <Layout>
            This is the home page
        </Layout>
    )
}