import AccountTable from '@/components/AdminComponent/AccountTable'
import prisma from '@/db/prisma'
import React from 'react'

export default async function page() {
    const account = await prisma.account.findMany()

    return (
        <AccountTable data={account} />
    )
}

`
"use client"

import { useEffect, useState } from 'react';
import AccountTable from '@/components/AdminComponent/AccountTable';



export default function Page() {
    const [account, setAccount] = useState([]);

    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/account', { cache: "no-store" });
                const data = await response.json();
                setAccount(data);
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        };

        fetchAccountData();
    }, []);

    return <AccountTable data={account} />;
}

`