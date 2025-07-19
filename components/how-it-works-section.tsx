'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Play, Trophy, Zap, Crown, Check } from 'lucide-react'

export default function HowItWorksSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className='mt-16 space-y-8 container mx-auto px-4 pb-4'
    >
      <h2 className='text-3xl font-bold text-white text-center'>
        How Spacebar Clicker Works
      </h2>

      <Accordion type='multiple' className='w-full max-w-4xl mx-auto space-y-4'>
        <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
          <AccordionItem value='item-1' className='border-b-0'>
            <AccordionTrigger className='text-xl font-semibold text-white hover:no-underline px-6 py-4 flex items-center gap-3'>
              <Play className='h-6 w-6 text-green-400 flex-shrink-0' />
              Basic Gameplay: Click Your Way to Victory!
            </AccordionTrigger>
            <AccordionContent className='px-6 pb-4 text-slate-400 space-y-4'>
              <p>
                The core concept of Spacebar Clicker is elegantly simple: press
                your spacebar (or click the main game area) as rapidly as you
                can! Each press registers as a "click," contributing to your
                ever-growing total score. The faster and more consistently you
                click, the quicker your score accumulates. It's a pure test of
                your finger speed and endurance.
              </p>
              <p>
                Keep an eye on the main counter – it's your real-time display of
                progress. You'll also notice small floating numbers appearing
                with each click, visually confirming your score increments and
                adding a dynamic feel to your efforts.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Card>

        <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
          <AccordionItem value='item-2' className='border-b-0'>
            <AccordionTrigger className='text-xl font-semibold text-white hover:no-underline px-6 py-4 flex items-center gap-3'>
              <Trophy className='h-6 w-6 text-yellow-400 flex-shrink-0' />
              Achievements & Stages: Unlock Your Potential
            </AccordionTrigger>
            <AccordionContent className='px-6 pb-4 text-slate-400 space-y-4'>
              <p>
                Spacebar Clicker features a comprehensive achievement system
                with unique milestones, each representing a significant "stage"
                in your clicking journey. These aren't just badges; they're
                powerful upgrades!
              </p>
              <p>
                As your total clicks reach specific thresholds, you'll
                automatically unlock new achievements. Once unlocked, you can
                choose to "activate" them from the Achievements panel.
                Activating an achievement grants you permanent bonuses,
                fundamentally changing your gameplay:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>
                  <span className='font-semibold text-white'>
                    Click Multipliers:
                  </span>{' '}
                  Boost the value of every single click you make.
                </li>
                <li>
                  <span className='font-semibold text-white'>
                    Auto-Clickers:
                  </span>{' '}
                  Gain passive clicks per second, allowing your score to grow
                  even when you're not actively pressing the spacebar.
                </li>
                <li>
                  <span className='font-semibold text-white'>
                    Thematic Changes:
                  </span>{' '}
                  Some rare achievements even transform the visual theme of your
                  game, offering a fresh aesthetic experience!
                </li>
              </ul>
              <p>
                Achievements are categorized by rarity (Common, Rare, Epic,
                Legendary, Mythic), with rarer achievements offering more
                substantial bonuses and requiring higher click counts to unlock.
                Strategically activating your achievements is key to maximizing
                your score!
              </p>
            </AccordionContent>
          </AccordionItem>
        </Card>

        <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
          <AccordionItem value='item-3' className='border-b-0'>
            <AccordionTrigger className='text-xl font-semibold text-white hover:no-underline px-6 py-4 flex items-center gap-3'>
              <Zap className='h-6 w-6 text-purple-400 flex-shrink-0' />
              Click Speed & Multipliers: Optimize Your Output
            </AccordionTrigger>
            <AccordionContent className='px-6 pb-4 text-slate-400 space-y-4'>
              <p>
                Your "Clicks/sec" (CPS) is a dynamic metric, calculated every
                second based on your recent clicking activity. It gives you an
                immediate sense of your current performance.
              </p>
              <p>
                Beyond your raw speed, the game rewards rapid, continuous
                clicking with a "click streak." If you click fast enough, a
                streak bonus activates, temporarily multiplying the value of
                each click. Maintain your streak to keep the bonus active and
                watch your score skyrocket!
              </p>
              <p>
                Activated achievements play a crucial role here. They provide a
                base click multiplier that permanently increases the value of
                every click. Additionally, many achievements come with passive
                auto-clickers, which generate clicks for you automatically,
                adding to your total score and CPS without any manual effort.
                The combination of manual clicks, streak bonuses, and activated
                auto-clickers creates a powerful synergy for exponential score
                growth.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Card>

        <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
          <AccordionItem value='item-4' className='border-b-0'>
            <AccordionTrigger className='text-xl font-semibold text-white hover:no-underline px-6 py-4 flex items-center gap-3'>
              <Crown className='h-6 w-6 text-blue-400 flex-shrink-0' />
              Leaderboard & Ranks: Compete Globally
            </AccordionTrigger>
            <AccordionContent className='px-6 pb-4 text-slate-400 space-y-4'>
              <p>
                Think you're the fastest clicker in the world? Prove it!
                Spacebar Clicker features a real-time global leaderboard where
                your total clicks, clicks per second, and achievement progress
                are automatically submitted.
              </p>
              <p>
                To secure your spot on the leaderboard and compete for the
                coveted top rank, simply log in or register for an account. Your
                score will then be permanently associated with your unique
                username and country, allowing you to track your progress
                against players from around the globe. Climb the ranks, earn
                bragging rights, and see your country's flag proudly displayed
                next to your name!
              </p>
              <p>
                The leaderboard updates frequently, so every click counts in
                your quest for global domination. Keep an eye on your rank and
                push your limits!
              </p>
            </AccordionContent>
          </AccordionItem>
        </Card>

        <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
          <AccordionItem value='item-5' className='border-b-0'>
            <AccordionTrigger className='text-xl font-semibold text-white hover:no-underline px-6 py-4 flex items-center gap-3'>
              <Check className='h-6 w-6 text-green-400 flex-shrink-0' />
              Progress Persistence: Your Clicks Are Safe
            </AccordionTrigger>
            <AccordionContent className='px-6 pb-4 text-slate-400 space-y-4'>
              <p>
                Your game progress is automatically saved locally in your
                browser's storage, so you can close the tab and pick up right
                where you left off.
              </p>
              <p>
                For an even more robust experience, we highly recommend logging
                in or registering. When you're logged in, your local game
                progress is seamlessly merged with your online profile. This
                means your hard-earned clicks, unlocked achievements, and
                activated bonuses are securely stored on our servers, accessible
                from any device. No more worrying about losing your progress if
                you clear your browser data or switch computers!
              </p>
              <p className='text-sm text-slate-500'>
                *Note: For full game state restoration (including activated
                achievements and their effects) when logging in, ensure your
                backend API provides the IDs of unlocked and activated
                achievements with your user's score.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Card>
      </Accordion>
    </motion.section>
  )
}
