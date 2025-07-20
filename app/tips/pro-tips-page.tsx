'use client'

import { motion } from 'framer-motion'
import {
  Zap,
  Target,
  Trophy,
  Brain,
  Timer,
  TrendingUp,
  Star,
  Crown,
  Lightbulb,
  Award,
  Rocket,
  Shield,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Footer from '@/components/footer'

const tipCategories = [
  {
    icon: Target,
    title: 'Clicking Techniques',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/20',
    difficulty: 'Beginner',
    tips: [
      {
        title: 'The Two-Finger Alternation',
        description:
          'Use your index and middle finger alternating on the spacebar for sustained high-speed clicking. This technique reduces fatigue and allows for consistent 8-12 CPS.',
        proTip:
          'Practice the rhythm: Index-Middle-Index-Middle. Start slow and gradually increase speed while maintaining accuracy.',
      },
      {
        title: 'Optimal Hand Position',
        description:
          'Keep your wrists straight and hands relaxed. Position your fingers directly above the spacebar with minimal travel distance. Tension kills speed and causes fatigue.',
        proTip:
          'Take a 30-second break every 2 minutes to shake out your hands and maintain peak performance.',
      },
      {
        title: 'The Burst Technique',
        description:
          'Instead of constant clicking, use short bursts of maximum speed (3-5 seconds) followed by brief recovery periods. This can achieve higher peak CPS than sustained clicking.',
        proTip:
          'Time your bursts with achievement unlocks or special events for maximum impact on your score.',
      },
    ],
  },
  {
    icon: Brain,
    title: 'Strategic Planning',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
    difficulty: 'Intermediate',
    tips: [
      {
        title: 'Achievement Activation Order',
        description:
          'Activate multiplier achievements first, then auto-clickers, then specialty bonuses. The order matters because multipliers affect all subsequent clicks, including auto-clicker output.',
        proTip:
          'Save Mythic achievements for when you have a solid foundation of Common and Rare bonuses already active.',
      },
      {
        title: 'The Compound Growth Strategy',
        description:
          'Focus on achievements that provide percentage-based bonuses rather than flat increases. A 50% multiplier becomes more valuable as your base score increases.',
        proTip:
          'Calculate your effective CPS (manual + auto-clickers × multipliers) to optimize your achievement selection.',
      },
      {
        title: 'Session Planning',
        description:
          'Plan your clicking sessions around your energy levels. Most players achieve peak CPS in the first 10-15 minutes of a session before fatigue sets in.',
        proTip:
          'Use auto-clickers to maintain progress during breaks, then return for focused high-intensity clicking sessions.',
      },
    ],
  },
  {
    icon: Trophy,
    title: 'Achievement Mastery',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20',
    difficulty: 'Advanced',
    tips: [
      {
        title: 'Hidden Achievement Hunting',
        description:
          'Some achievements have secret unlock conditions beyond the obvious milestones. Experiment with different clicking patterns, timing, and combinations to discover hidden bonuses.',
        proTip:
          'Try clicking in specific rhythms, maintaining exact CPS targets, or playing at unusual times of day.',
      },
      {
        title: 'Rarity Optimization',
        description:
          "Higher rarity achievements aren't always better for your current situation. Sometimes multiple Common achievements provide better total bonuses than one Legendary achievement.",
        proTip:
          'Use the achievement calculator (coming soon) to determine the optimal combination for your play style.',
      },
      {
        title: 'Achievement Synergy',
        description:
          "Certain achievements work better together. Look for combinations that multiply each other's effects rather than just adding bonuses.",
        proTip:
          'Auto-clicker achievements pair excellently with multiplier achievements, creating exponential growth.',
      },
    ],
  },
  {
    icon: TrendingUp,
    title: 'Performance Optimization',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/20',
    difficulty: 'Expert',
    tips: [
      {
        title: 'Browser Optimization',
        description:
          'Close unnecessary tabs, disable browser extensions, and use hardware acceleration for maximum game performance. A laggy browser can cost you 20-30% of your potential CPS.',
        proTip:
          'Use Chrome or Firefox in incognito mode with no extensions for competitive clicking sessions.',
      },
      {
        title: 'Hardware Considerations',
        description:
          'A mechanical keyboard with low actuation force can improve your clicking speed and reduce fatigue. Gaming keyboards often have faster response times than standard keyboards.',
        proTip:
          'If using a laptop, connect an external keyboard for better ergonomics and performance.',
      },
      {
        title: 'Environmental Factors',
        description:
          'Room temperature, lighting, and even background music can affect your performance. Most top players prefer slightly cool rooms (68-72°F) and instrumental music.',
        proTip:
          'Experiment with different environments to find your optimal clicking conditions.',
      },
    ],
  },
  {
    icon: Crown,
    title: 'Competitive Strategies',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/20',
    difficulty: 'Master',
    tips: [
      {
        title: 'Leaderboard Climbing',
        description:
          "Study the top players' achievement combinations and clicking patterns. Most leaderboard champions use specific strategies that aren't immediately obvious to casual players.",
        proTip:
          'Focus on one leaderboard category at a time. Trying to excel in all categories simultaneously often leads to suboptimal results.',
      },
      {
        title: 'Psychological Warfare',
        description:
          'Maintain consistency rather than chasing peak performance. Steady, reliable clicking often beats sporadic bursts of high CPS in long-term competition.',
        proTip:
          "Don't let other players' scores intimidate you. Focus on beating your personal best, and leaderboard success will follow.",
      },
      {
        title: 'The Long Game',
        description:
          'Top competitive players think in terms of weeks and months, not individual sessions. Build sustainable habits and gradually improve rather than burning out quickly.',
        proTip:
          'Track your progress with screenshots and notes. Patterns in your improvement will reveal optimization opportunities.',
      },
    ],
  },
]

const quickTips = [
  {
    icon: Lightbulb,
    tip: 'Use both hands on desktop - one for spacebar, one for mouse clicking',
    category: 'Technique',
  },
  {
    icon: Timer,
    tip: 'Take 5-minute breaks every 20 minutes to prevent repetitive strain',
    category: 'Health',
  },
  {
    icon: Star,
    tip: 'Auto-clickers work even when the browser tab is inactive',
    category: 'Strategy',
  },
  {
    icon: Award,
    tip: "Mythic achievements are worth waiting for - don't waste them early",
    category: 'Progression',
  },
  {
    icon: Rocket,
    tip: 'Your first 1000 clicks are the hardest - persistence pays off',
    category: 'Motivation',
  },
  {
    icon: Shield,
    tip: "Never use auto-clicking software - it's against the rules and detectable",
    category: 'Fair Play',
  },
]

export default function ProTipsPage() {
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
          <div className='max-w-6xl mx-auto space-y-12'>
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center space-y-6'
            >
              <div className='flex items-center justify-center gap-4 mb-6'>
                <Zap className='h-12 w-12 text-yellow-400' />
                <h1 className='text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent'>
                  Pro Tips & Advanced Strategies
                </h1>
              </div>
              <p className='text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed'>
                Master the art of clicking with expert techniques used by top
                players worldwide. From basic finger positioning to advanced
                competitive strategies, elevate your game to championship level.
              </p>
            </motion.div>

            {/* Quick Tips Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            >
              {quickTips.map((tip, index) => {
                const IconComponent = tip.icon
                return (
                  <Card
                    key={index}
                    className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/60 transition-all'
                  >
                    <CardContent className='p-4'>
                      <div className='flex items-start gap-3'>
                        <IconComponent className='h-5 w-5 text-yellow-400 mt-1 flex-shrink-0' />
                        <div>
                          <p className='text-white text-sm font-medium mb-1'>
                            {tip.tip}
                          </p>
                          <Badge
                            variant='outline'
                            className='text-xs border-slate-600 text-slate-400'
                          >
                            {tip.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </motion.div>

            {/* Detailed Tip Categories */}
            <div className='space-y-8'>
              {tipCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + categoryIndex * 0.1,
                    }}
                  >
                    <Card
                      className={`${category.bgColor} ${category.borderColor} border-2 backdrop-blur-sm`}
                    >
                      <CardHeader>
                        <div className='flex items-center justify-between'>
                          <CardTitle className='text-white flex items-center gap-3'>
                            <IconComponent
                              className={`h-6 w-6 ${category.color}`}
                            />
                            {category.title}
                          </CardTitle>
                          <Badge
                            variant='outline'
                            className={`${category.borderColor} ${category.color} border-current`}
                          >
                            {category.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className='space-y-6'>
                        {category.tips.map((tip, tipIndex) => (
                          <div
                            key={tipIndex}
                            className='bg-slate-900/30 rounded-xl p-6 border border-slate-700/30'
                          >
                            <h3 className='text-xl font-semibold text-white mb-3'>
                              {tip.title}
                            </h3>
                            <p className='text-slate-300 leading-relaxed mb-4'>
                              {tip.description}
                            </p>
                            <div
                              className={`p-4 rounded-lg ${category.bgColor} border ${category.borderColor}`}
                            >
                              <p className='text-white font-medium'>
                                <span className={`${category.color} font-bold`}>
                                  💡 Pro Tip:
                                </span>{' '}
                                {tip.proTip}
                              </p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className='bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30 backdrop-blur-sm'>
                <CardContent className='p-8 text-center'>
                  <h2 className='text-3xl font-bold text-white mb-4'>
                    Ready to Dominate the Leaderboards?
                  </h2>
                  <p className='text-slate-300 mb-6 text-lg'>
                    Apply these pro techniques and watch your scores soar.
                    Remember: champions are made through consistent practice and
                    smart strategy.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <Link
                      href='/'
                      className='bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all'
                    >
                      Start Practicing Now
                    </Link>
                    <Link
                      href='/help'
                      className='border border-slate-600 hover:bg-slate-800 text-white bg-transparent px-8 py-3 rounded-lg font-semibold transition-all'
                    >
                      Need More Help?
                    </Link>
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
