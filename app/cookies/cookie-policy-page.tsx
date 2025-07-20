'use client'

import { motion } from 'framer-motion'
import {
  Cookie,
  Settings,
  Eye,
  Shield,
  Database,
  Trash2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Footer from '@/components/footer'

const cookieTypes = [
  {
    name: 'Essential Cookies',
    icon: CheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/20',
    required: true,
    description:
      'These cookies are necessary for the website to function and cannot be switched off.',
    examples: [
      'Game state and progress storage',
      'User preferences and settings',
      'Security and authentication tokens',
      'Session management',
    ],
    retention: 'Until browser is closed or manually cleared',
  },
  {
    name: 'Performance Cookies',
    icon: Eye,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
    required: false,
    description:
      'These cookies help us understand how visitors interact with our website by collecting anonymous information.',
    examples: [
      'Page load times and performance metrics',
      'Click tracking and user interaction data',
      'Error reporting and debugging information',
      'Feature usage statistics',
    ],
    retention: 'Up to 2 years',
  },
  {
    name: 'Analytics Cookies',
    icon: Database,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/20',
    required: false,
    description:
      'These cookies allow us to count visits and traffic sources to measure and improve site performance.',
    examples: [
      'Google Analytics tracking',
      'User demographics and interests',
      'Traffic source identification',
      'Conversion tracking',
    ],
    retention: 'Up to 2 years',
  },
]

export default function CookiePolicyPage() {
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
              <div className='flex items-center justify-center gap-3 mb-4'>
                <Cookie className='h-12 w-12 text-yellow-400' />
                <h1 className='text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent'>
                  Cookie Policy
                </h1>
              </div>
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
                    <Cookie className='h-5 w-5 text-yellow-400' />
                    What Are Cookies?
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <p>
                    Cookies are small text files that are placed on your
                    computer or mobile device when you visit our website. They
                    are widely used to make websites work more efficiently and
                    provide information to website owners.
                  </p>
                  <p>
                    Spacebar Clicker uses cookies and similar technologies (like
                    local storage) to enhance your gaming experience, save your
                    progress, and understand how our game is being used.
                  </p>
                  <div className='bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4'>
                    <p className='text-yellow-200 font-medium'>
                      <AlertCircle className='inline h-4 w-4 mr-2' />
                      Important: Most of your game data is stored locally in
                      your browser, not in traditional cookies. This means your
                      progress stays on your device and isn't transmitted to our
                      servers unless you create an account.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cookie Types */}
            <div className='space-y-6'>
              {cookieTypes.map((cookieType, index) => {
                const IconComponent = cookieType.icon
                return (
                  <motion.div
                    key={cookieType.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <Card
                      className={`${cookieType.bgColor} ${cookieType.borderColor} border-2 backdrop-blur-sm`}
                    >
                      <CardHeader>
                        <div className='flex items-center justify-between'>
                          <CardTitle className='text-white flex items-center gap-3'>
                            <IconComponent
                              className={`h-6 w-6 ${cookieType.color}`}
                            />
                            {cookieType.name}
                          </CardTitle>
                          <Badge
                            variant={
                              cookieType.required ? 'default' : 'outline'
                            }
                            className={
                              cookieType.required
                                ? 'bg-green-600 text-white'
                                : 'border-slate-600 text-slate-400'
                            }
                          >
                            {cookieType.required ? 'Required' : 'Optional'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className='space-y-4'>
                        <p className='text-slate-300'>
                          {cookieType.description}
                        </p>

                        <div>
                          <h4 className='text-white font-semibold mb-2'>
                            Examples:
                          </h4>
                          <ul className='list-disc list-inside space-y-1 text-slate-300 ml-4'>
                            {cookieType.examples.map(
                              (example, exampleIndex) => (
                                <li key={exampleIndex}>{example}</li>
                              )
                            )}
                          </ul>
                        </div>

                        <div className='flex items-center gap-2 text-sm'>
                          <span className='text-slate-400'>Retention:</span>
                          <span className='text-white'>
                            {cookieType.retention}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-white flex items-center gap-2'>
                    <Settings className='h-5 w-5 text-blue-400' />
                    Managing Your Cookie Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <h3 className='text-lg font-semibold text-white'>
                    Browser Settings
                  </h3>
                  <p>
                    You can control and/or delete cookies as you wish. You can
                    delete all cookies that are already on your computer and you
                    can set most browsers to prevent them from being placed.
                  </p>

                  <h3 className='text-lg font-semibold text-white'>
                    Game Data Storage
                  </h3>
                  <p>
                    Your game progress is primarily stored in your browser's
                    local storage. To clear this data:
                  </p>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>
                      <strong>Chrome:</strong> Settings → Privacy and Security →
                      Clear browsing data → Cookies and other site data
                    </li>
                    <li>
                      <strong>Firefox:</strong> Settings → Privacy & Security →
                      Clear Data → Cookies and Site Data
                    </li>
                    <li>
                      <strong>Safari:</strong> Preferences → Privacy → Manage
                      Website Data → Remove All
                    </li>
                    <li>
                      <strong>Edge:</strong> Settings → Privacy, search, and
                      services → Clear browsing data
                    </li>
                  </ul>

                  <div className='bg-red-900/20 border border-red-500/30 rounded-lg p-4'>
                    <p className='text-red-200 font-medium'>
                      <AlertCircle className='inline h-4 w-4 mr-2' />
                      Warning: Clearing cookies and local storage will delete
                      your game progress unless you have an account and your
                      data is backed up to our servers.
                    </p>
                  </div>
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
                  <CardTitle className='text-white flex items-center gap-2'>
                    <Shield className='h-5 w-5 text-green-400' />
                    Third-Party Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <h3 className='text-lg font-semibold text-white'>
                    Google Analytics
                  </h3>
                  <p>
                    We use Google Analytics to understand how visitors use our
                    site. Google Analytics uses cookies to collect this
                    information. You can opt out of Google Analytics by
                    installing the Google Analytics Opt-out Browser Add-on.
                  </p>

                  <h3 className='text-lg font-semibold text-white'>
                    Social Media
                  </h3>
                  <p>
                    When you share content from our site on social media
                    platforms, those platforms may set their own cookies. We
                    have no control over these cookies.
                  </p>

                  <h3 className='text-lg font-semibold text-white'>
                    Advertising
                  </h3>
                  <p>
                    We may display advertisements from third-party networks.
                    These advertisers may use cookies to show you relevant ads
                    based on your interests. You can opt out of personalized
                    advertising through your browser settings or ad network
                    preferences.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-white flex items-center gap-2'>
                    <Trash2 className='h-5 w-5 text-red-400' />
                    Data Retention and Deletion
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <h3 className='text-lg font-semibold text-white'>
                    Automatic Deletion
                  </h3>
                  <p>
                    Most cookies expire automatically after a set period.
                    Essential cookies are deleted when you close your browser,
                    while analytics cookies may persist for up to 2 years.
                  </p>

                  <h3 className='text-lg font-semibold text-white'>
                    Manual Deletion
                  </h3>
                  <p>
                    You can delete cookies at any time through your browser
                    settings. However, this may affect your game experience and
                    you may lose saved progress.
                  </p>

                  <h3 className='text-lg font-semibold text-white'>
                    Account Deletion
                  </h3>
                  <p>
                    If you have an account and request its deletion, we will
                    also remove any associated cookies and tracking data from
                    our systems within 30 days.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-white'>
                    Contact Us About Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-slate-300'>
                  <p>
                    If you have any questions about our use of cookies or this
                    Cookie Policy, please contact us at:
                  </p>
                  <div className='mt-4 space-y-2'>
                    <p>
                      Privacy:{' '}
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

            {/* Cookie Consent Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card className='bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 backdrop-blur-sm'>
                <CardContent className='p-8 text-center'>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    Manage Your Cookie Preferences
                  </h2>
                  <p className='text-slate-300 mb-6'>
                    You can adjust your cookie preferences at any time.
                    Essential cookies are required for the game to function
                    properly.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <Button className='bg-green-600 hover:bg-green-700'>
                      Accept All Cookies
                    </Button>
                    <Button
                      variant='outline'
                      className='border-slate-600 hover:bg-slate-800 text-white bg-transparent'
                    >
                      Essential Only
                    </Button>
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
