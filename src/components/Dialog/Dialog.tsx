"use client"

import { useEffect, useRef } from 'react'
import style from './Dialog.module.scss'

type Props = {
    open: boolean;
    onClose: () => void;
    onOk: () => void | Promise<void>;
    children: React.ReactNode;
    buttonConfirm?: string;
}

// Native <dialog> confirm box. State lives with the caller (e.g. the id of the
// row awaiting deletion), not in the URL, so opening/closing it never disturbs
// other query params and a deep link can't open it with nothing selected.
export default function Dialog({ open, onClose, onOk, children, buttonConfirm }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (open) dialogRef.current?.showModal()
    }, [open])

    if (!open) return null

    const confirm = async () => {
        await onOk()
        onClose()
    }

    return (
        <dialog
            ref={dialogRef}
            className={style.dialog}
            // Esc closes a native <dialog> on its own — keep our state in sync
            onCancel={(event) => { event.preventDefault(); onClose(); }}
        >
            <div className={style.dialog_container}>
                <button type="button" onClick={onClose} className={style.close} aria-label="Close">
                    {'X'}
                </button>
                <div className={style.dialog_content}>
                    <div className={style.dialog_children}>
                        {children}
                    </div>
                    <div className={style.action}>
                        <button type="button" onClick={onClose}>
                            {'CANCEL'}
                        </button>
                        <button type="button" onClick={confirm}>
                            {buttonConfirm || 'CONFIRM'}
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}
