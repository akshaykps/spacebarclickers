'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock, Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Footer from '@/components/footer'

export default function PrivacyPolicyPage() {
  return (
    <div className='min-h-screen bg-slate-950'>
      {/* Background Grid */}
      <div className='fixed inset-0'>
        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      </div>

      <div className='relative z-10'>
        {/* Header */}
        <header className='border-b border-slate-800/50 bg-slate-900/20 backdrop-blur-sm'>
          <div className='container mx-auto px-4 py-4'>
            <div className='flex items-center gap-3'>
              <motion.div
                className='text-3xl'
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                ⌨️
              </motion.div>
              <Link
                href='/'
                className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
              >
                Spacebar Clicker
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className='container mx-auto px-4 py-12'>
          <div className='max-w-4xl mx-auto space-y-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center'
            >
              <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                Privacy Policy
              </h1>
              <p className='text-xl text-slate-300'>
                Last updated: December 2024
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-white flex items-center gap-2'>
                    <Eye className='h-5 w-5 text-blue-400' />
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <h3 className='text-lg font-semibold text-white'>
                    Account Information
                  </h3>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>Username and email address when you register</li>
                    <li>
                      Country information (automatically detected from your IP
                      address)
                    </li>
                    <li>Game statistics and achievements</li>
                  </ul>

                  <h3 className='text-lg font-semibold text-white'>
                    Game Data
                  </h3>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>Click counts and game performance metrics</li>
                    <li>Achievement progress and unlocks</li>
                    <li>Leaderboard rankings and scores</li>
                    <li>Time spent playing</li>
                  </ul>

                  <h3 className='text-lg font-semibold text-white'>
                    Technical Information
                  </h3>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>IP address for country detection and security</li>
                    <li>Browser type and device information</li>
                    <li>Game session data stored locally in your browser</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-white flex items-center gap-2'>
                    <Lock className='h-5 w-5 text-green-400' />
                    How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <ul className='list-disc list-inside space-y-2'>
                    <li>Provide and maintain the game service</li>
                    <li>Display your scores on leaderboards</li>
                    <li>Track your achievements and progress</li>
                    <li>Detect and prevent fraud or abuse</li>
                    <li>Improve game performance and features</li>
                    <li>Send important account notifications</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-white flex items-center gap-2'>
                    <Cookie className='h-5 w-5 text-yellow-400' />
                    Data Storage and Security
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <h3 className='text-lg font-semibold text-white'>
                    Local Storage
                  </h3>
                  <p>
                    Game progress is primarily stored in your browser's local
                    storage. This includes your click count, achievements, and
                    game settings. This data remains on your device and is not
                    transmitted to our servers unless you create an account.
                  </p>

                  <h3 className='text-lg font-semibold text-white'>
                    Server Storage
                  </h3>
                  <p>
                    When you create an account, your game data is securely
                    stored on our servers to enable leaderboards and
                    cross-device synchronization. We use industry-standard
                    encryption and security measures to protect your data.
                  </p>

                  <h3 className='text-lg font-semibold text-white'>
                    Data Retention
                  </h3>
                  <p>
                    We retain your account data as long as your account is
                    active. You can request account deletion at any time by
                    contacting us.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-white'>Your Rights</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <p>You have the right to:</p>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>Access your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and data</li>
                    <li>Export your game data</li>
                    <li>Opt out of non-essential communications</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us at{' '}
                    <a
                      href='mailto:privacy@spacebarclickers.com'
                      className='text-blue-400 hover:text-blue-300'
                    >
                      privacy@spacebarclickers.com
                    </a>
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-white'>
                    Third-Party Services
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <h3 className='text-lg font-semibold text-white'>
                    IP Geolocation
                  </h3>
                  <p>
                    We use IP geolocation services to automatically detect your
                    country for leaderboard display. This helps provide a better
                    user experience without requiring manual input.
                  </p>

                  <h3 className='text-lg font-semibold text-white'>
                    reCAPTCHA
                  </h3>
                  <p>
                    We use Google reCAPTCHA to protect against spam and abuse.
                    Google's privacy policy applies to their service.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-white'>Contact Us</CardTitle>
                </CardHeader>
                <CardContent className='text-slate-300'>
                  <p>
                    If you have any questions about this Privacy Policy, please
                    contact us at:
                  </p>
                  <div className='mt-4 space-y-2'>
                    <p>
                      Email:{' '}
                      <a
                        href='mailto:privacy@spacebarclickers.com'
                        className='text-blue-400 hover:text-blue-300'
                      >
                        privacy@spacebarclickers.com
                      </a>
                    </p>
                    <p>
                      General:{' '}
                      <a
                        href='mailto:hello@spacebarclickers.com'
                        className='text-blue-400 hover:text-blue-300'
                      >
                        hello@spacebarclickers.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
