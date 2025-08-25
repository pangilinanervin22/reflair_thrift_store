"use client";

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import style from './page.module.scss';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { isEmailExist } from '@/lib/AccountAction';
import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';

const font = Playfair_Display({
    display: 'swap',
    weight: '600',
    subsets: ['latin'],
});

export default function LoginForm() {
    const [submitting, setSubmitting] = useState(false);

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
                <Image src={'/assets/images/loginbgimage.jpg'} alt='wew' width={1080} height={1080} />
            </div>
            <form onSubmit={handleSubmit}>
                <h1 className={font.className}>Welcome to ReFlair</h1>
                <h4> Unearth the Hidden Flair of Timeless Fashion</h4>
                <hr className={style.underline} />
                <input id='email' name='email' type='email' placeholder='Enter Email' autoComplete='email' required />
                <input id='password' name='password' type='password' placeholder='Enter Password' autoComplete='current-password' required />
                <button type='submit' disabled={submitting}>{submitting ? 'Logging in…' : 'Log In'}</button>
                <p>Don&#39;t have an Account?</p>
                <Link href={'/register'}><span>Register Here</span></Link>
                <hr className={style.underline} />
            </form>
        </section>
    );
}
