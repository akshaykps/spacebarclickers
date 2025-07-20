'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Play,
  Trophy,
  Zap,
  Crown,
  Users,
  Sparkles,
  MousePointer2,
  Brain,
  Target,
  Timer,
  Award,
  Shield,
  Globe,
  Star,
  BookOpen,
  Lightbulb,
  BarChart3,
  Rocket,
  Heart,
  Smartphone,
} from 'lucide-react'

const mainSections = [
  {
    id: 'gameplay',
    icon: Play,
    title: 'Master the Art of Clicking',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/20',
    badge: 'Core Gameplay',
    badgeColor: 'bg-green-500/20 text-green-400',
  },
  {
    id: 'strategy',
    icon: Brain,
    title: 'Strategic Clicking Techniques',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
    badge: 'Pro Tips',
    badgeColor: 'bg-blue-500/20 text-blue-400',
  },
  {
    id: 'achievements',
    icon: Trophy,
    title: 'Achievement System & Progression',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20',
    badge: 'Progression',
    badgeColor: 'bg-yellow-500/20 text-yellow-400',
  },
  {
    id: 'community',
    icon: Users,
    title: 'Global Community & Competition',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/20',
    badge: 'Community',
    badgeColor: 'bg-purple-500/20 text-purple-400',
  },
  {
    id: 'benefits',
    icon: Brain,
    title: 'Cognitive Benefits & Skills',
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    borderColor: 'border-pink-400/20',
    badge: 'Benefits',
    badgeColor: 'bg-pink-500/20 text-pink-400',
  },
  {
    id: 'technology',
    icon: Zap,
    title: 'Technology & Innovation',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/20',
    badge: 'Tech',
    badgeColor: 'bg-cyan-500/20 text-cyan-400',
  },
]

const gameplayContent = {
  overview:
    'Spacebar Clicker is a precision-based browser game that challenges players to achieve maximum clicking efficiency while developing strategic thinking and hand-eye coordination.',
  sections: [
    {
      title: 'Getting Started',
      icon: Rocket,
      content: [
        'Simply press your spacebar or click anywhere on the game area to begin your clicking journey',
        'Each click is instantly registered and added to your total score with visual feedback',
        'Watch your clicks per second (CPS) metric to track your real-time performance',
        'The game automatically saves your progress locally, so you never lose your achievements',
      ],
    },
    {
      title: 'Clicking Mechanics',
      icon: Target,
      content: [
        'Every click contributes to your cumulative score, building towards achievement milestones',
        'Maintain consistent clicking rhythm to activate streak bonuses and multipliers',
        'Visual effects and sound feedback enhance the clicking experience',
        'Advanced players can achieve 10+ clicks per second with proper technique',
      ],
    },
    {
      title: 'Score System',
      icon: BarChart3,
      content: [
        'Base score increases by 1 for each click, modified by active multipliers',
        'Achievement bonuses can multiply your click value by 2x, 5x, or even 10x',
        "Auto-clickers provide passive score generation even when you're not actively playing",
        'Combo systems reward sustained high-speed clicking with exponential bonuses',
      ],
    },
  ],
}

const strategyContent = {
  overview:
    'Developing effective clicking strategies is essential for maximizing your score and climbing the global leaderboards. Learn from top players worldwide.',
  sections: [
    {
      title: 'Optimal Clicking Techniques',
      icon: Target,
      content: [
        'Use multiple fingers alternating on the spacebar for sustained high-speed clicking',
        'Maintain proper posture to prevent fatigue during extended clicking sessions',
        'Practice burst clicking: short periods of maximum speed followed by brief recovery',
        'Find your personal rhythm - consistency often beats pure speed',
      ],
    },
    {
      title: 'Achievement Prioritization',
      icon: Award,
      content: [
        'Focus on unlocking multiplier achievements first for exponential score growth',
        'Auto-clicker achievements provide passive income and long-term benefits',
        'Rare achievements offer unique bonuses that can dramatically change gameplay',
        'Plan your achievement activation strategy based on your playing style',
      ],
    },
    {
      title: 'Time Management',
      icon: Timer,
      content: [
        'Short, focused sessions often yield better CPS than marathon clicking',
        'Take regular breaks to maintain peak performance and prevent repetitive strain',
        'Use auto-clickers to maintain progress during breaks or offline periods',
        'Track your best performance times to identify optimal playing conditions',
      ],
    },
  ],
}

const achievementContent = {
  overview:
    'Our comprehensive achievement system features over 20 unique milestones, each offering distinct rewards and gameplay modifications.',
  sections: [
    {
      title: 'Achievement Categories',
      icon: Star,
      content: [
        'Milestone Achievements: Unlock at specific click count thresholds (100, 1K, 10K, 100K+)',
        'Speed Achievements: Reward sustained high clicks-per-second performance',
        'Endurance Achievements: Recognize long-term dedication and consistency',
        'Special Achievements: Hidden unlocks for discovering unique gameplay elements',
      ],
    },
    {
      title: 'Rarity System',
      icon: Crown,
      content: [
        'Common (White): Basic multipliers and small auto-clicker bonuses',
        'Rare (Blue): Enhanced multipliers and improved auto-clicker efficiency',
        'Epic (Purple): Significant gameplay bonuses and visual theme changes',
        'Legendary (Orange): Powerful multipliers and exclusive auto-clicker types',
        'Mythic (Red): Game-changing bonuses and prestige visual effects',
      ],
    },
    {
      title: 'Strategic Activation',
      icon: Lightbulb,
      content: [
        'Achievements must be manually activated to receive their benefits',
        'Plan your activation sequence to maximize synergistic effects',
        'Some achievements unlock new gameplay mechanics and features',
        'Higher rarity achievements provide exponentially greater benefits',
      ],
    },
  ],
}

const communityContent = {
  overview:
    'Join thousands of players worldwide in the ultimate clicking competition. Our global community spans over 50 countries and continues growing daily.',
  sections: [
    {
      title: 'Global Leaderboards',
      icon: Globe,
      content: [
        'Real-time rankings updated every few seconds showing top performers worldwide',
        'Country-based leaderboards to compete with players from your region',
        'Multiple ranking categories: total clicks, highest CPS, most achievements',
        'Historical data tracking to see your improvement over time',
      ],
    },
    {
      title: 'Competitive Features',
      icon: Trophy,
      content: [
        'Daily, weekly, and monthly challenges with special rewards',
        'Seasonal events featuring limited-time achievements and bonuses',
        'Community goals that unlock benefits for all players when reached',
        'Fair play systems ensuring legitimate competition and preventing cheating',
      ],
    },
    {
      title: 'Social Elements',
      icon: Heart,
      content: [
        'Share your achievements and high scores with friends and social media',
        'Compare your progress with players of similar skill levels',
        'Community forums and discussion areas for strategy sharing',
        'Regular community spotlights featuring exceptional players and their techniques',
      ],
    },
  ],
}

const benefitsContent = {
  overview:
    'Beyond entertainment, Spacebar Clicker offers genuine cognitive and motor skill benefits, making it both fun and educational.',
  sections: [
    {
      title: 'Cognitive Benefits',
      icon: Brain,
      content: [
        'Improved hand-eye coordination through precise timing and rhythm',
        'Enhanced reaction time and reflexes from rapid response requirements',
        'Better focus and concentration during sustained clicking sessions',
        'Strategic thinking development through achievement planning and optimization',
      ],
    },
    {
      title: 'Motor Skills',
      icon: Target,
      content: [
        'Fine motor control improvement through precise clicking techniques',
        'Finger dexterity and independence from multi-finger clicking methods',
        'Muscle memory development for consistent performance',
        'Ambidextrous coordination for players using both hands',
      ],
    },
    {
      title: 'Mental Wellness',
      icon: Heart,
      content: [
        'Stress relief through repetitive, meditative clicking motions',
        'Achievement satisfaction and dopamine release from reaching milestones',
        'Social connection through global community participation',
        'Mindfulness practice through focused, present-moment clicking',
      ],
    },
  ],
}

const technologyContent = {
  overview:
    'Built with cutting-edge web technologies, Spacebar Clicker delivers a smooth, responsive experience across all devices and platforms.',
  sections: [
    {
      title: 'Technical Excellence',
      icon: Zap,
      content: [
        'React and Next.js framework ensuring fast loading and smooth performance',
        'Real-time click detection with sub-millisecond accuracy',
        'Progressive Web App (PWA) technology for app-like experience',
        'Optimized for all devices: desktop, tablet, and mobile',
      ],
    },
    {
      title: 'Cross-Platform Compatibility',
      icon: Smartphone,
      content: [
        'Works seamlessly on Windows, macOS, Linux, iOS, and Android',
        'Browser compatibility across Chrome, Firefox, Safari, and Edge',
        'Touch-optimized interface for mobile and tablet users',
        'Keyboard and mouse support for desktop precision',
      ],
    },
    {
      title: 'Performance & Security',
      icon: Shield,
      content: [
        'Local storage ensures your progress is saved securely',
        'No personal data collection beyond basic game statistics',
        'GDPR compliant with transparent privacy practices',
        'Regular updates and improvements based on community feedback',
      ],
    },
  ],
}

const contentMap = {
  gameplay: gameplayContent,
  strategy: strategyContent,
  achievements: achievementContent,
  community: communityContent,
  benefits: benefitsContent,
  technology: technologyContent,
}

export default function ComprehensiveContentSection() {
  const [activeTab, setActiveTab] = useState('gameplay')
  const [openItems, setOpenItems] = useState<string[]>(['gameplay'])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.section
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='mt-16 space-y-12 container mx-auto px-4 pb-8'
    >
      {/* Header */}
      <motion.div variants={itemVariants} className='text-center space-y-6'>
        <div className='flex items-center justify-center gap-4 mb-6'>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className='text-5xl'
          >
            🎮
          </motion.div>
          <h2 className='text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
            Complete Guide to Spacebar Clicker
          </h2>
        </div>
        <p className='text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed'>
          Discover everything about the world's most engaging clicking game.
          From basic mechanics to advanced strategies, community features to
          cognitive benefits - your comprehensive resource for mastering
          Spacebar Clicker.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div variants={itemVariants}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-slate-900/50 p-1 rounded-xl'>
            {mainSections.map((section) => {
              const IconComponent = section.icon
              return (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className='flex items-center gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400 rounded-lg transition-all'
                >
                  <IconComponent className='h-4 w-4' />
                  <span className='hidden sm:inline'>{section.badge}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {/* Tab Content */}
          {mainSections.map((section) => {
            const content = contentMap[section.id as keyof typeof contentMap]
            const IconComponent = section.icon

            return (
              <TabsContent key={section.id} value={section.id} className='mt-8'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    className={`${section.bgColor} ${section.borderColor} border-2 backdrop-blur-sm`}
                  >
                    <CardHeader className='text-center pb-6'>
                      <div className='flex items-center justify-center gap-4 mb-4'>
                        <div className={`p-3 rounded-xl ${section.bgColor}`}>
                          <IconComponent
                            className={`h-8 w-8 ${section.color}`}
                          />
                        </div>
                        <CardTitle className='text-3xl text-white'>
                          {section.title}
                        </CardTitle>
                      </div>
                      <p className='text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed'>
                        {content.overview}
                      </p>
                    </CardHeader>

                    <CardContent className='space-y-6'>
                      {content.sections.map((subsection, index) => {
                        const SubIcon = subsection.icon
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className='bg-slate-900/30 rounded-xl p-6 border border-slate-700/30'
                          >
                            <div className='flex items-center gap-3 mb-4'>
                              <SubIcon className={`h-6 w-6 ${section.color}`} />
                              <h3 className='text-xl font-semibold text-white'>
                                {subsection.title}
                              </h3>
                            </div>
                            <div className='space-y-3'>
                              {subsection.content.map((item, itemIndex) => (
                                <motion.div
                                  key={itemIndex}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    delay: index * 0.1 + itemIndex * 0.05,
                                  }}
                                  className='flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg'
                                >
                                  <Sparkles className='h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0' />
                                  <span className='text-slate-300 leading-relaxed'>
                                    {item}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            )
          })}
        </Tabs>
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        variants={itemVariants}
        className='grid grid-cols-1 md:grid-cols-4 gap-6'
      >
        {[
          {
            icon: Users,
            label: 'Active Players',
            value: '10,000+',
            color: 'text-blue-400',
          },
          {
            icon: MousePointer2,
            label: 'Total Clicks',
            value: '50M+',
            color: 'text-green-400',
          },
          {
            icon: Globe,
            label: 'Countries',
            value: '75+',
            color: 'text-purple-400',
          },
          {
            icon: Trophy,
            label: 'Achievements',
            value: '25+',
            color: 'text-yellow-400',
          },
        ].map((stat, index) => {
          const StatIcon = stat.icon
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className='bg-slate-900/40 border border-slate-700/50 rounded-xl p-6 text-center backdrop-blur-sm'
            >
              <StatIcon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className='text-slate-400 text-sm'>{stat.label}</div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Call to Action */}
      <motion.div variants={itemVariants} className='text-center space-y-6'>
        <h3 className='text-3xl font-bold text-white'>
          Ready to Start Your Clicking Journey?
        </h3>
        <p className='text-lg text-slate-300 max-w-2xl mx-auto'>
          Join thousands of players worldwide and discover why Spacebar Clicker
          is the most addictive and rewarding browser game ever created.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button
            size='lg'
            className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white group px-8 py-3'
          >
            <MousePointer2 className='h-5 w-5 mr-2 group-hover:animate-pulse' />
            Start Playing Now
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='border-slate-600 hover:bg-slate-800 text-white bg-transparent px-8 py-3'
          >
            <BookOpen className='h-5 w-5 mr-2' />
            Learn More
          </Button>
        </div>
      </motion.div>
    </motion.section>
  )
}
