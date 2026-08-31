import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
    title: 'Log in',
    description: 'Sign in to your ReFlair account to manage your bag, saved pieces and orders.',
    robots: { index: false, follow: true },
};

// Static page — the "already signed in" redirect happens client-side in
// LoginForm so this route doesn't need per-request rendering.
export default function LoginPage() {
    return <LoginForm />;
}
