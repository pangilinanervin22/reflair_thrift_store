import { getServerSession } from 'next-auth';
import { authOptions } from '@/db/options';
import LoginForm from './LoginForm';

export default async function LoginPage() {
    const session = await getServerSession(authOptions);
    if (session) {
        // Already signed in — let Next.js handle the redirect on the server
        // Using the Route Handler redirect util would require next/navigation in a server context
        // but since this is a server component, simply redirect via headers
        // However to keep it simple and aligned with app router, use Next's redirect
        const { redirect } = await import('next/navigation');
        redirect('/account');
    }

    return <LoginForm />;
}



