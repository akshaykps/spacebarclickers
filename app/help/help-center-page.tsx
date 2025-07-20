'use client'

import { motion } from 'framer-motion'
import {
  HelpCircle,
  Play,
  Trophy,
  Settings,
  MessageCircle,
  Book,
  Zap,
  Target,
  Users,
  Shield,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Footer from '@/components/footer'

const helpSections = [
  {
    icon: Play,
    title: 'Getting Started',
    color: 'text-green-400',
    items: [
      {
        question: 'How do I start playing Spacebar Clicker?',
        answer:
          'Simply visit our homepage and start clicking! Press your spacebar or click anywhere on the game area to begin accumulating clicks. Your progress is automatically saved in your browser.',
      },
      {
        question: 'Do I need to create an account?',
        answer:
          'No account is required to play! However, creating an account allows you to save progress across devices, compete on global leaderboards, and unlock additional features.',
      },
      {
        question: 'Is Spacebar Clicker free to play?',
        answer:
          'Yes! Spacebar Clicker is completely free to play. There are no hidden costs, subscriptions, or pay-to-win mechanics. Everyone has equal opportunity to achieve high scores.',
      },
    ],
  },
  {
    icon: Trophy,
    title: 'Achievements & Progression',
    color: 'text-yellow-400',
    items: [
      {
        question: 'How do achievements work?',
        answer:
          'Achievements unlock automatically when you reach specific milestones. Each achievement provides unique bonuses like click multipliers, auto-clickers, or visual themes. You must manually activate achievements to receive their benefits.',
      },
      {
        question: 'What are the different achievement rarities?',
        answer:
          'Achievements come in 5 rarities: Common (white), Rare (blue), Epic (purple), Legendary (orange), and Mythic (red). Higher rarity achievements provide more powerful bonuses and are harder to unlock.',
      },
      {
        question: 'Can I lose my achievements?',
        answer:
          'No! Once unlocked, achievements are permanent. Your progress is saved locally and backed up to our servers if you have an account. You can deactivate and reactivate achievements at any time.',
      },
    ],
  },
  {
    icon: Target,
    title: 'Gameplay Mechanics',
    color: 'text-blue-400',
    items: [
      {
        question: 'What is CPS and how is it calculated?',
        answer:
          "CPS (Clicks Per Second) measures your clicking speed over recent activity. It's calculated using a rolling average of your last 10 seconds of clicking. Higher CPS can trigger streak bonuses and special effects.",
      },
      {
        question: 'How do auto-clickers work?',
        answer:
          "Auto-clickers are unlocked through achievements and provide passive clicks even when you're not actively playing. They continue working in the background and stack with your manual clicking for maximum efficiency.",
      },
      {
        question: 'What are click multipliers?',
        answer:
          'Multipliers increase the value of each click. For example, a 2x multiplier makes each click worth 2 points instead of 1. Multiple multipliers can stack together for exponential growth.',
      },
    ],
  },
  {
    icon: Users,
    title: 'Leaderboards & Competition',
    color: 'text-purple-400',
    items: [
      {
        question: 'How do global leaderboards work?',
        answer:
          'Leaderboards rank players by total clicks, highest CPS, and achievement count. Rankings update in real-time and display country flags. You need an account to appear on leaderboards.',
      },
      {
        question: 'Are there different leaderboard categories?',
        answer:
          'Yes! We have separate leaderboards for total clicks, peak CPS, most achievements unlocked, and fastest time to reach milestones. This ensures fair competition across different play styles.',
      },
      {
        question: 'How do you prevent cheating?',
        answer:
          'We use advanced detection systems to identify impossible click rates, automated scripts, and other cheating methods. Suspicious scores are reviewed and removed to maintain fair competition.',
      },
    ],
  },
  {
    icon: Settings,
    title: 'Technical Support',
    color: 'text-cyan-400',
    items: [
      {
        question: "The game isn't loading properly",
        answer:
          'Try refreshing the page, clearing your browser cache, or disabling browser extensions. Ensure JavaScript is enabled. If problems persist, try a different browser or contact support.',
      },
      {
        question: "My clicks aren't registering",
        answer:
          "This can happen if your browser is lagging or if you're clicking too fast for the system to process. Try clicking at a steady rhythm. On mobile, ensure you're tapping directly on the game area.",
      },
      {
        question: 'Can I play on mobile devices?',
        answer:
          'Spacebar Clicker is fully optimized for mobile devices. On mobile, tap the screen instead of using the spacebar. The game automatically adapts to touch controls.',
      },
    ],
  },
  {
    icon: Shield,
    title: 'Account & Privacy',
    color: 'text-red-400',
    items: [
      {
        question: 'Is my data safe?',
        answer:
          'Yes! We use industry-standard security measures to protect your data. Game progress is stored locally and optionally backed up to secure servers. We never share personal information with third parties.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          "Contact us at privacy@spacebarclickers.com to request account deletion. We'll remove all your data within 30 days. Note that this action is irreversible and you'll lose all progress.",
      },
      {
        question: 'What data do you collect?',
        answer:
          'We only collect essential game data: click counts, achievements, and basic browser information. No personal information is required to play. See our Privacy Policy for complete details.',
      },
    ],
  },
]

export default function HelpCenterPage() {
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
          <div className='max-w-6xl mx-auto space-y-8'>
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center space-y-4'
            >
              <div className='flex items-center justify-center gap-3 mb-4'>
                <HelpCircle className='h-12 w-12 text-blue-400' />
                <h1 className='text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                  Help Center
                </h1>
              </div>
              <p className='text-xl text-slate-300 max-w-3xl mx-auto'>
                Find answers to common questions, learn gameplay mechanics, and
                get the support you need to master Spacebar Clicker.
              </p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='grid grid-cols-1 md:grid-cols-3 gap-4'
            >
              <Link href='/faq'>
                <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/60 transition-all cursor-pointer'>
                  <CardContent className='p-6 text-center'>
                    <Book className='h-8 w-8 text-green-400 mx-auto mb-3' />
                    <h3 className='text-lg font-semibold text-white mb-2'>
                      FAQ
                    </h3>
                    <p className='text-slate-400 text-sm'>
                      Quick answers to frequently asked questions
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href='/tips'>
                <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/60 transition-all cursor-pointer'>
                  <CardContent className='p-6 text-center'>
                    <Zap className='h-8 w-8 text-yellow-400 mx-auto mb-3' />
                    <h3 className='text-lg font-semibold text-white mb-2'>
                      Pro Tips
                    </h3>
                    <p className='text-slate-400 text-sm'>
                      Advanced strategies and techniques
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href='/contact'>
                <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/60 transition-all cursor-pointer'>
                  <CardContent className='p-6 text-center'>
                    <MessageCircle className='h-8 w-8 text-blue-400 mx-auto mb-3' />
                    <h3 className='text-lg font-semibold text-white mb-2'>
                      Contact Support
                    </h3>
                    <p className='text-slate-400 text-sm'>
                      Get personalized help from our team
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Help Sections */}
            <div className='space-y-8'>
              {helpSections.map((section, sectionIndex) => {
                const IconComponent = section.icon
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + sectionIndex * 0.1,
                    }}
                  >
                    <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                      <CardHeader>
                        <CardTitle className='text-white flex items-center gap-3'>
                          <IconComponent
                            className={`h-6 w-6 ${section.color}`}
                          />
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className='space-y-6'>
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className='space-y-2'>
                            <h3 className='text-lg font-semibold text-white'>
                              {item.question}
                            </h3>
                            <p className='text-slate-300 leading-relaxed'>
                              {item.answer}
                            </p>
                            {itemIndex < section.items.length - 1 && (
                              <hr className='border-slate-700/50 my-4' />
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className='bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 backdrop-blur-sm'>
                <CardContent className='p-8 text-center'>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    Still Need Help?
                  </h2>
                  <p className='text-slate-300 mb-6'>
                    Can't find what you're looking for? Our support team is here
                    to help you with any questions or issues.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <Button asChild className='bg-blue-600 hover:bg-blue-700'>
                      <Link href='/contact'>Contact Support</Link>
                    </Button>
                    <Button
                      asChild
                      variant='outline'
                      className='border-slate-600 hover:bg-slate-800 text-white bg-transparent'
                    >
                      <Link href='/faq'>View FAQ</Link>
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
