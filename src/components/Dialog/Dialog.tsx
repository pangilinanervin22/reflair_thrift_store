"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import style from './Dialog.module.scss'
import { useRef, useEffect } from 'react'

type Props = {
    title: string,
    onClose: () => void,
    onOk: () => void,
    children: React.ReactNode,
    buttonConfirm?: string,
}

export default function Dialog({ title, onClose, onOk, children, buttonConfirm: buttonConfirm }: Props) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const dialogRef = useRef<null | HTMLDialogElement>(null)
    const showDialog = searchParams.get('showDialog')

    useEffect(() => {
        if (showDialog === 'y')
            dialogRef.current?.showModal()
        else
            dialogRef.current?.close()

    }, [showDialog])

    const closeDialog = () => {
        onClose();
        dialogRef.current?.close()
        router.push(pathname);
    }

    const clickOk = () => {
        onOk()
        closeDialog()
    }

    const dialog: JSX.Element | null = showDialog === 'y' ? (
        <dialog ref={dialogRef} className={style.dialog} >
            <div className={style.dialog_container} >
                <button onClick={closeDialog} className={style.close}>
                    {'X'}
                </button>
                <div className={style.dialog_content}>
                    <div className={style.dialog_children}>
                        {children}
                    </div>
                    <div className={style.action}>
                        <button onClick={closeDialog}>
                            {'CANCEL'}
                        </button>
                        <button onClick={clickOk}>
                            {buttonConfirm || 'CONFIRM'}
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    ) : null
    return dialog
}