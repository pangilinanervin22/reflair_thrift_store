"use client"

import { CartRemoveAction } from '@/lib/CartAction'
import React from 'react'

interface RemoveCartButtonProps {
    email: string
    item_id: string
}

export default function RemoveCartButton({ email, item_id }: RemoveCartButtonProps) {
    return (
        <button onClick={() => CartRemoveAction(email, item_id)}>
            REMOVE
        </button>
    )
}
