import type { Metadata } from 'next';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = {
    title: 'Create an account',
    description: 'Join the ReFlair archive — one account for the bag, saved pieces and order history.',
    robots: { index: false, follow: true },
};

// Static page — the "already signed in" redirect happens client-side in
// RegisterForm so this route doesn't need per-request rendering.
export default function RegisterPage() {
    return <RegisterForm />;
}
