import AccountTable from '@/components/AdminComponent/AccountTable'
import prisma from '@/db/prisma'
import React from 'react'

export default async function page() {
    const account = await prisma.account.findMany()

    return (
        <AccountTable data={account} />
    )
}
