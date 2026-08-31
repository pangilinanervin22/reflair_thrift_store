"use client";

import { FormEvent, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import style from './page.module.scss';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Image from 'next/image';

// Where to go after signing in. Read from window (not useSearchParams) so this
// page stays fully static; only same-origin paths are honoured.
function readCallbackUrl(): string {
    const raw = new URLSearchParams(window.location.search).get('callbackUrl');
    return raw && raw.startsWith('/') && !raw.startsWith('//') ? raw : '/account';
}

export default function LoginForm() {
    const [submitting, setSubmitting] = useState(false);
    const { status } = useSession();
    const router = useRouter();

    // Already signed in — continue to where the user was heading
    useEffect(() => {
        if (status === 'authenticated') router.replace(readCallbackUrl());
    }, [status, router]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        const loading = toast.loading('Signing you in…');

        try {
            const formData = new FormData(e.currentTarget);
            const email = String(formData.get('email') || '').trim();
            const password = String(formData.get('password') || '');

            if (!email || !password) {
                toast.update(loading, { render: 'Please fill in all fields', type: 'error', autoClose: 2000, isLoading: false });
                return;
            }

            const res = await signIn('credentials', { email, password, redirect: false });

            if (res?.ok) {
                toast.update(loading, { render: 'Welcome back', type: 'success', autoClose: 1500, isLoading: false });
                router.push(readCallbackUrl());
                router.refresh();
            } else {
                // One generic message — never reveal whether the email exists
                toast.update(loading, { render: 'Invalid email or password', type: 'error', autoClose: 2500, isLoading: false });
            }
        } catch {
            toast.update(loading, { render: 'Something went wrong. Please try again.', type: 'error', autoClose: 2500, isLoading: false });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={style.container}>
            <div className={style.side}>
                <Image
                    src={'/assets/images/loginbgimage.webp'}
                    alt='Archive editorial'
                    width={1080}
                    height={1080}
                    sizes="(max-width: 860px) 1px, 50vw"
                    priority
                />
                <p className={style.side_caption}>
                    Worn well. <em>Loved again.</em>
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <p className={style.eyebrow}>ReFlair · Members</p>
                <h1 className={style.title}>Welcome back</h1>
                <p className={style.subtitle}>Unearth the hidden flair of timeless fashion.</p>

                <div className={style.fields}>
                    <div className={style.field}>
                        <label htmlFor='email'>Email</label>
                        <input id='email' name='email' type='email' placeholder='you@example.com' autoComplete='email' required />
                    </div>
                    <div className={style.field}>
                        <label htmlFor='password'>Password</label>
                        <input id='password' name='password' type='password' placeholder='••••••••' autoComplete='current-password' required />
                    </div>
                </div>

                <button type='submit' disabled={submitting}>{submitting ? 'Logging in…' : 'Log in'}</button>

                <p className={style.switch_note}>
                    {"Don't have an account?"}{' '}
                    <Link href={'/register'}><span>Register here</span></Link>
                </p>
            </form>
        </section>
    );
}
