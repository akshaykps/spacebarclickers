import type { Metadata } from 'next'
import RegisterPage from './register-page'

export const metadata: Metadata = {
  title: 'Sign Up - Create Your Spacebar Clicker Account',
  description:
    'Create a free Spacebar Clicker account to save your progress, unlock achievements, and compete with players worldwide on our leaderboard. Join thousands of players today!',
  keywords: [
    'sign up',
    'register',
    'create account',
    'free registration',
    'spacebar clicker account',
    'join game',
    'new player',
    'account creation',
    'player registration',
    'free account',
  ],
  openGraph: {
    title: 'Sign Up - Create Your Spacebar Clicker Account',
    description:
      'Create a free Spacebar Clicker account to save your progress, unlock achievements, and compete with players worldwide on our leaderboard.',
    url: 'https://spacebarclickers.com/auth/register',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Sign Up - Create Your Spacebar Clicker Account',
    description:
      'Create a free Spacebar Clicker account to save your progress, unlock achievements, and compete with players worldwide on our leaderboard.',
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
  alternates: {
    canonical: 'https://spacebarclickers.com/auth/register',
  },
}

export default function Page() {
  return <RegisterPage />
}
