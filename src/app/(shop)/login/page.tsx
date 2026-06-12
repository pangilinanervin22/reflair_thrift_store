import LoginForm from './LoginForm';

// Static page — the "already signed in" redirect happens client-side in
// LoginForm so this route doesn't need per-request rendering.
export default function LoginPage() {
    return <LoginForm />;
}
