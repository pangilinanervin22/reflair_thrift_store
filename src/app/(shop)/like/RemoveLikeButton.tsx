"use client"

import { LikeProductRemoveAction } from '@/lib/LikeAction'
import React from 'react'

interface RemoveCartButtonProps {
    email: string
    item_id: string
    classStyle?: string
}

export default function RemoveLikeButton({ email, item_id, classStyle }: RemoveCartButtonProps) {
    return (
        <button className={classStyle || ""} onClick={() => LikeProductRemoveAction(email, item_id)}>
            REMOVE
        </button>
    )
}
