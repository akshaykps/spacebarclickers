'use client'

import { motion } from 'framer-motion'
import {
  Scale,
  FileText,
  Shield,
  AlertTriangle,
  Users,
  Gavel,
  Clock,
  Mail,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Footer from '@/components/footer'

export default function TermsOfServicePage() {
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
                <Scale className='h-12 w-12 text-blue-400' />
                <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                  Terms of Service
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
                    <FileText className='h-5 w-5 text-green-400' />
                    Agreement to Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <p>
                    By accessing and using Spacebar Clicker ("the Game", "our
                    Service"), you accept and agree to be bound by the terms and
                    provision of this agreement.
                  </p>
                  <p>
                    These Terms of Service ("Terms") govern your use of our
                    website located at spacebarclickers.com (the "Service")
                    operated by Spacebar Clicker ("us", "we", or "our").
                  </p>
                  <p>
                    If you do not agree to abide by the above, please do not use
                    this service.
                  </p>
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
                    <Users className='h-5 w-5 text-blue-400' />
                    Use License
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <h3 className='text-lg font-semibold text-white'>
                    Permitted Use
                  </h3>
                  <p>
                    Permission is granted to temporarily access and use Spacebar
                    Clicker for personal, non-commercial transitory viewing
                    only. This is the grant of a license, not a transfer of
                    title, and under this license you may not:
                  </p>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>Modify or copy the game materials</li>
                    <li>
                      Use the materials for any commercial purpose or for any
                      public display
                    </li>
                    <li>
                      Attempt to reverse engineer any software contained on the
                      website
                    </li>
                    <li>
                      Remove any copyright or other proprietary notations from
                      the materials
                    </li>
                  </ul>

                  <h3 className='text-lg font-semibold text-white'>
                    Fair Play Policy
                  </h3>
                  <p>
                    Users must play fairly and honestly. The following
                    activities are strictly prohibited:
                  </p>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>Using automated clicking software, bots, or scripts</li>
                    <li>Exploiting bugs or glitches for unfair advantage</li>
                    <li>
                      Creating multiple accounts to manipulate leaderboards
                    </li>
                    <li>
                      Sharing accounts or allowing others to play on your
                      account
                    </li>
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
                    <Shield className='h-5 w-5 text-green-400' />
                    User Accounts and Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <h3 className='text-lg font-semibold text-white'>
                    Account Creation
                  </h3>
                  <p>
                    When you create an account with us, you must provide
                    information that is accurate, complete, and current at all
                    times. You are responsible for safeguarding the password and
                    for all activities that occur under your account.
                  </p>

                  <h3 className='text-lg font-semibold text-white'>
                    User Conduct
                  </h3>
                  <p>You agree not to use the Service:</p>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>
                      For any unlawful purpose or to solicit others to perform
                      unlawful acts
                    </li>
                    <li>
                      To violate any international, federal, provincial, or
                      state regulations, rules, laws, or local ordinances
                    </li>
                    <li>
                      To infringe upon or violate our intellectual property
                      rights or the intellectual property rights of others
                    </li>
                    <li>
                      To harass, abuse, insult, harm, defame, slander,
                      disparage, intimidate, or discriminate
                    </li>
                    <li>To submit false or misleading information</li>
                  </ul>
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
                  <CardTitle className='text-white flex items-center gap-2'>
                    <AlertTriangle className='h-5 w-5 text-yellow-400' />
                    Disclaimer and Limitations
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <h3 className='text-lg font-semibold text-white'>
                    Service Availability
                  </h3>
                  <p>
                    The materials on Spacebar Clicker's website are provided on
                    an 'as is' basis. Spacebar Clicker makes no warranties,
                    expressed or implied, and hereby disclaims and negates all
                    other warranties including without limitation, implied
                    warranties or conditions of merchantability, fitness for a
                    particular purpose, or non-infringement of intellectual
                    property or other violation of rights.
                  </p>

                  <h3 className='text-lg font-semibold text-white'>
                    Limitation of Liability
                  </h3>
                  <p>
                    In no event shall Spacebar Clicker or its suppliers be
                    liable for any damages (including, without limitation,
                    damages for loss of data or profit, or due to business
                    interruption) arising out of the use or inability to use the
                    materials on Spacebar Clicker's website, even if Spacebar
                    Clicker or an authorized representative has been notified
                    orally or in writing of the possibility of such damage.
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
                  <CardTitle className='text-white flex items-center gap-2'>
                    <Gavel className='h-5 w-5 text-red-400' />
                    Enforcement and Termination
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <h3 className='text-lg font-semibold text-white'>
                    Violations
                  </h3>
                  <p>
                    We reserve the right to terminate or suspend your account
                    and access to the Service immediately, without prior notice
                    or liability, for any reason whatsoever, including without
                    limitation if you breach the Terms.
                  </p>

                  <h3 className='text-lg font-semibold text-white'>
                    Account Termination
                  </h3>
                  <p>
                    Upon termination, your right to use the Service will cease
                    immediately. If you wish to terminate your account, you may
                    simply discontinue using the Service or contact us for
                    account deletion.
                  </p>

                  <h3 className='text-lg font-semibold text-white'>
                    Cheating Consequences
                  </h3>
                  <p>
                    Accounts found to be using cheating methods will be
                    immediately banned from leaderboards and may have their
                    accounts permanently suspended. We use advanced detection
                    systems to identify unfair play.
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
                  <CardTitle className='text-white flex items-center gap-2'>
                    <Clock className='h-5 w-5 text-purple-400' />
                    Changes to Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 text-slate-300'>
                  <p>
                    Spacebar Clicker may revise these terms of service for its
                    website at any time without notice. By using this website,
                    you are agreeing to be bound by the then current version of
                    these terms of service.
                  </p>
                  <p>
                    We will notify users of any material changes to these Terms
                    by posting the new Terms on this page and updating the "Last
                    updated" date. You are advised to review these Terms
                    periodically for any changes.
                  </p>
                  <p>
                    Changes to these Terms are effective when they are posted on
                    this page. Your continued use of the Service after any
                    changes constitutes acceptance of the new Terms.
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
                    <Mail className='h-5 w-5 text-blue-400' />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-slate-300'>
                  <p>
                    If you have any questions about these Terms of Service,
                    please contact us at:
                  </p>
                  <div className='mt-4 space-y-2'>
                    <p>
                      Email:{' '}
                      <a
                        href='mailto:legal@spacebarclickers.com'
                        className='text-blue-400 hover:text-blue-300'
                      >
                        legal@spacebarclickers.com
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
                    <p>Website: spacebarclickers.com</p>
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
