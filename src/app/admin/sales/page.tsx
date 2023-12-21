
import Dialog from '@/components/Dialog/Dialog'
import React from 'react'

export default function SalesPage() {

    async function handleSubmit(e: any) {
        "use server"

        console.log('submit', e)
    }

    async function c() {
        "use server"

        console.log('c')
    }

    async function o() {
        "use server"

        console.log('o')
    }

    return (
        <div>
            <h1>Sales Coming soon...</h1>
            <form action={handleSubmit}>
                <input type="text" defaultValue={"sample"} />
                <input type="image" />
                <button type='submit'>submit</button>
            </form>

            <Dialog onClose={c} onOk={o}>
                <p>Est adipisicing cupidatat fugiat deserunt et velit esse anim cupidatat sint.</p>
            </Dialog>
        </div>
    )
}
