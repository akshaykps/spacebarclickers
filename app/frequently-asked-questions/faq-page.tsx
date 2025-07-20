'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Footer from '@/components/footer'

const faqData = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I play Spacebar Clicker?',
        answer:
          'Simply press your spacebar or click anywhere on the game area to start accumulating clicks. Your goal is to achieve the highest score possible while unlocking achievements and competing on global leaderboards. The game automatically saves your progress.',
      },
      {
        question: 'Is Spacebar Clicker free?',
        answer:
          'Yes! Spacebar Clicker is completely free to play with no hidden costs, subscriptions, or pay-to-win mechanics. Everyone has equal opportunity to achieve high scores through skill and dedication.',
      },
      {
        question: 'Do I need to download anything?',
        answer:
          'No downloads required! Spacebar Clicker runs entirely in your web browser. Simply visit our website and start playing immediately on any device with internet access.',
      },
      {
        question: 'Can I play without creating an account?',
        answer:
          'You can play and enjoy the full game without registration. However, creating an account allows you to save progress across devices and compete on global leaderboards.',
      },
    ],
  },
  {
    category: 'Gameplay',
    questions: [
      {
        question: 'What is the goal of the game?',
        answer:
          'The primary goal is to accumulate as many clicks as possible while unlocking achievements that provide powerful bonuses. You can compete for high scores on global leaderboards and work towards unlocking all 25+ achievements.',
      },
      {
        question: 'How do achievements work?',
        answer:
          'Achievements unlock automatically when you reach specific milestones (like 1,000 clicks or 10 CPS). Each achievement provides unique bonuses such as click multipliers or auto-clickers. You must manually activate achievements to receive their benefits.',
      },
      {
        question: 'What are auto-clickers?',
        answer:
          "Auto-clickers are special bonuses unlocked through achievements that provide passive clicks even when you're not actively playing. They continue working in the background and stack with your manual clicking.",
      },
      {
        question: 'How is my CPS calculated?',
        answer:
          'CPS (Clicks Per Second) is calculated using a rolling average of your clicking activity over the last 10 seconds. This provides an accurate real-time measurement of your clicking speed and can trigger special bonuses.',
      },
    ],
  },
  {
    category: 'Achievements & Progression',
    questions: [
      {
        question: 'How many achievements are there?',
        answer:
          'There are over 25 unique achievements spanning 5 rarity levels: Common, Rare, Epic, Legendary, and Mythic. Each rarity provides increasingly powerful bonuses and visual effects.',
      },
      {
        question: 'Can I lose my achievements?',
        answer:
          'No! Once unlocked, achievements are permanent and cannot be lost. Your progress is automatically saved locally and backed up to our servers if you have an account.',
      },
      {
        question: 'What do achievement rarities mean?',
        answer:
          'Common (white) achievements provide basic bonuses, while Mythic (red) achievements offer game-changing multipliers and effects. Higher rarity achievements are harder to unlock but provide exponentially greater benefits.',
      },
      {
        question: 'How do I activate achievements?',
        answer:
          'Click on any unlocked achievement in your achievement panel to activate or deactivate it. You can have multiple achievements active simultaneously, and their effects stack together.',
      },
    ],
  },
  {
    category: 'Leaderboards & Competition',
    questions: [
      {
        question: 'How do leaderboards work?',
        answer:
          'Global leaderboards rank players by total clicks, highest CPS achieved, and number of achievements unlocked. Rankings update in real-time and display country flags. You need an account to appear on leaderboards.',
      },
      {
        question: 'Are there different leaderboard categories?',
        answer:
          'Yes! We have separate rankings for total clicks, peak CPS performance, most achievements unlocked, and fastest time to reach major milestones like 100K clicks.',
      },
      {
        question: 'How do you prevent cheating?',
        answer:
          'We use sophisticated detection systems to identify impossible click rates, automated scripts, and other cheating methods. Suspicious scores are reviewed by our team and removed to maintain fair competition.',
      },
      {
        question: 'Can I compete with friends?',
        answer:
          "While we don't have private leaderboards yet, you can share your scores and achievements with friends through social media integration and compare your progress informally.",
      },
    ],
  },
  {
    category: 'Technical Support',
    questions: [
      {
        question: "The game won't load or is running slowly",
        answer:
          'Try refreshing the page, clearing your browser cache, or disabling browser extensions. Ensure JavaScript is enabled. If problems persist, try a different browser or contact our support team.',
      },
      {
        question: "My clicks aren't registering properly",
        answer:
          "This can happen if your browser is overloaded or if you're clicking faster than the system can process. Try maintaining a steady rhythm rather than frantic clicking. On mobile, ensure you're tapping directly on the game area.",
      },
      {
        question: 'Can I play on mobile devices?',
        answer:
          'Yes! Spacebar Clicker is fully optimized for mobile devices. On smartphones and tablets, tap the screen instead of using the spacebar. The game automatically adapts to touch controls.',
      },
      {
        question: 'Which browsers are supported?',
        answer:
          'Spacebar Clicker works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your preferred browser.',
      },
    ],
  },
  {
    category: 'Account & Privacy',
    questions: [
      {
        question: 'What data do you collect?',
        answer:
          'We only collect essential game data: click counts, achievements, CPS records, and basic browser information for optimization. No personal information is required to play. See our Privacy Policy for complete details.',
      },
      {
        question: 'Is my data secure?',
        answer:
          'Yes! We use industry-standard security measures to protect all data. Game progress is stored locally in your browser and optionally backed up to our secure servers. We never share data with third parties.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          "Contact us at privacy@spacebarclickers.com to request account deletion. We'll remove all your data within 30 days. Note that this action is irreversible and you'll lose all progress and achievements.",
      },
      {
        question: 'Can I export my game data?',
        answer:
          'Yes! Account holders can request a complete export of their game data including click history, achievements, and statistics. Contact our support team to request your data export.',
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0)

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
                  Frequently Asked Questions
                </h1>
              </div>
              <p className='text-xl text-slate-300 max-w-3xl mx-auto'>
                Quick answers to the most common questions about Spacebar
                Clicker gameplay, features, and technical support.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='relative'
            >
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
              <Input
                type='text'
                placeholder='Search FAQ...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 bg-slate-900/40 border-slate-700/50 text-white placeholder-slate-400'
              />
            </motion.div>

            {/* FAQ Categories */}
            <div className='space-y-6'>
              {filteredFAQ.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + categoryIndex * 0.1,
                  }}
                >
                  <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                    <CardHeader>
                      <CardTitle className='text-white text-xl'>
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      {category.questions.map((faq, faqIndex) => {
                        const itemId = `${category.category}-${faqIndex}`
                        const isOpen = openItems.includes(itemId)

                        return (
                          <div
                            key={faqIndex}
                            className='border border-slate-700/30 rounded-lg'
                          >
                            <button
                              onClick={() => toggleItem(itemId)}
                              className='w-full p-4 text-left flex items-center justify-between hover:bg-slate-800/30 transition-colors'
                            >
                              <span className='text-white font-medium pr-4'>
                                {faq.question}
                              </span>
                              {isOpen ? (
                                <ChevronUp className='h-5 w-5 text-slate-400 flex-shrink-0' />
                              ) : (
                                <ChevronDown className='h-5 w-5 text-slate-400 flex-shrink-0' />
                              )}
                            </button>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className='px-4 pb-4'
                              >
                                <p className='text-slate-300 leading-relaxed'>
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredFAQ.length === 0 && searchTerm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-center py-12'
              >
                <p className='text-slate-400 text-lg mb-4'>
                  No results found for "{searchTerm}"
                </p>
                <Button
                  onClick={() => setSearchTerm('')}
                  variant='outline'
                  className='border-slate-600 hover:bg-slate-800 text-white bg-transparent'
                >
                  Clear Search
                </Button>
              </motion.div>
            )}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className='bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 backdrop-blur-sm'>
                <CardContent className='p-8 text-center'>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    Didn't Find Your Answer?
                  </h2>
                  <p className='text-slate-300 mb-6'>
                    If you couldn't find the answer you were looking for, our
                    support team is ready to help you personally.
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
                      <Link href='/help'>Help Center</Link>
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
