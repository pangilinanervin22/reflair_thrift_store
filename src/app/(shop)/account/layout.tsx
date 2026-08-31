import type { Metadata } from 'next';
import AccountShell from './AccountShell';

// Private area — never indexed. The shell (nav, sign-out, client guard) is a
// client component; this server layout exists so the metadata can be declared.
export const metadata: Metadata = {
    title: 'My account',
    robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return <AccountShell>{children}</AccountShell>;
}
