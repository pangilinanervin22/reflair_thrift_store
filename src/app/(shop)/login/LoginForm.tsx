"use client";

import { FormEvent, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import style from './page.module.scss';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { isEmailExist } from '@/lib/AccountAction';
import Image from 'next/image';

export default function LoginForm() {
    const [submitting, setSubmitting] = useState(false);
    const { status } = useSession();
    const router = useRouter();

    // Already signed in — go straight to the account area
    useEffect(() => {
        if (status === 'authenticated') router.replace('/account');
    }, [status, router]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        const loading = toast.loading('Login is pending');

        try {
            const formEl = e.currentTarget;
            const formData = new FormData(formEl);
            const email = String(formData.get('email') || '').trim();
            const password = String(formData.get('password') || '').trim();

            if (!email || !password) {
                toast.update(loading, { render: 'Please fill in all fields', type: 'error', autoClose: 2000, isLoading: false });
                return;
            }

            if (!(await isEmailExist(email))) {
                toast.update(loading, { render: 'Email not exist', type: 'error', autoClose: 2000, isLoading: false });
                return;
            }

            // Perform sign-in with a server redirect so cookies are set before hitting /account
            const res = await signIn('credentials', {
                email,
                password,
                redirect: true,
                callbackUrl: '/account',
            });

            // If redirect is prevented by the environment, handle error feedback
            if (res && (res as any).error) {
                toast.update(loading, { render: 'Invalid credentials', type: 'error', autoClose: 2000, isLoading: false });
                return;
            }
            // On success, NextAuth will redirect to /account
        } catch (error) {
            toast.update(loading, { render: 'Error occurred', type: 'error', autoClose: 2000, isLoading: false });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={style.container}>
            <div className={style.side}>
                <Image
                    src={'/assets/images/loginbgimage.jpg'}
                    alt='Archive editorial'
                    width={1080}
                    height={1080}
                    sizes="(max-width: 860px) 0px, 50vw"
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
