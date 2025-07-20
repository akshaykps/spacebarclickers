import type { Metadata } from 'next'
import LoginPage from './login-page'

export const metadata: Metadata = {
  title: 'Login - Access Your Spacebar Clicker Account',
  description:
    'Sign in to your Spacebar Clicker account to access your achievements, view your stats, and compete on the global leaderboard. Secure login for registered players.',
  keywords: [
    'login',
    'sign in',
    'account access',
    'user authentication',
    'spacebar clicker account',
    'player login',
    'secure access',
    'game account',
    'user portal',
  ],
  openGraph: {
    title: 'Login - Access Your Spacebar Clicker Account',
    description:
      'Sign in to your Spacebar Clicker account to access your achievements, view your stats, and compete on the global leaderboard.',
    url: 'https://spacebarclickers.com/auth/login',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Login - Access Your Spacebar Clicker Account',
    description:
      'Sign in to your Spacebar Clicker account to access your achievements, view your stats, and compete on the global leaderboard.',
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
  alternates: {
    canonical: 'https://spacebarclickers.com/auth/login',
  },
}

export default function Page() {
  return <LoginPage />
}
