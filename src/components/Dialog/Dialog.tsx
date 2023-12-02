"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useEffect } from 'react'

type Props = {
    title: string,
    onClose: () => void,
    onOk: () => void,
    children: React.ReactNode,
}

export default function Dialog({ title, onClose, onOk, children }: Props) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const dialogRef = useRef<null | HTMLDialogElement>(null)
    const showDialog = searchParams.get('showDialog')

    useEffect(() => {
        if (showDialog === 'y') {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }


    }, [showDialog])

    const closeDialog = () => {
        dialogRef.current?.close()
        onClose();
        router.push(pathname);
    }

    const clickOk = () => {
        onOk()
        closeDialog()
    }

    const dialog: JSX.Element | null = showDialog === 'y' ? (
        <dialog ref={dialogRef} >
            <div >
                <div >
                    <h1 >{title}</h1>
                    <button onClick={closeDialog}>x</button>
                </div>
                <div >
                    {children}
                    <div >
                        <button onClick={clickOk}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    ) : null


    return dialog
}