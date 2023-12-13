"use client"

import { CartProductRemoveAction } from '@/lib/CartAction'
import React from 'react'

interface RemoveCartButtonProps {
    email: string
    item_id: string
}

export default function RemoveCartButton({ email, item_id }: RemoveCartButtonProps) {
    return (
        <button onClick={() => CartProductRemoveAction(email, item_id)}>
            REMOVE
        </button>
    )
}
