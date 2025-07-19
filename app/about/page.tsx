'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Target, Users, Trophy, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Footer from '@/components/footer'

export default function AboutPage() {
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
            <div className='flex items-center gap-4'>
              <Link href='/'>
                <Button
                  variant='outline'
                  size='icon'
                  className='border-slate-600 hover:bg-slate-700 bg-slate-800/50'
                >
                  <ArrowLeft className='h-4 w-4' />
                </Button>
              </Link>
              <div className='flex items-center gap-3'>
                <motion.div
                  className='text-3xl'
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  ⌨️
                </motion.div>
                <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                  About Spacebar Clicker
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className='container mx-auto px-4 py-12'>
          <div className='max-w-4xl mx-auto space-y-12'>
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center space-y-6'
            >
              <h2 className='text-4xl font-bold text-white mb-4'>
                The Ultimate Clicking Experience
              </h2>
              <p className='text-xl text-slate-300 max-w-2xl mx-auto'>
                Spacebar Clicker is more than just a game - it's a test of
                speed, endurance, and determination. Challenge yourself, unlock
                achievements, and compete with players worldwide.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm h-full'>
                  <CardHeader className='text-center'>
                    <Target className='h-12 w-12 text-blue-400 mx-auto mb-4' />
                    <CardTitle className='text-white'>
                      Precision Gaming
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-slate-400 text-center'>
                      Test your clicking speed and accuracy with our responsive
                      game engine.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm h-full'>
                  <CardHeader className='text-center'>
                    <Trophy className='h-12 w-12 text-yellow-400 mx-auto mb-4' />
                    <CardTitle className='text-white'>Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-slate-400 text-center'>
                      Unlock 20+ achievements with unique rewards and
                      multipliers.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm h-full'>
                  <CardHeader className='text-center'>
                    <Users className='h-12 w-12 text-green-400 mx-auto mb-4' />
                    <CardTitle className='text-white'>
                      Global Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-slate-400 text-center'>
                      Compete with players worldwide and climb the rankings.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm h-full'>
                  <CardHeader className='text-center'>
                    <Zap className='h-12 w-12 text-purple-400 mx-auto mb-4' />
                    <CardTitle className='text-white'>Auto-Clickers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-slate-400 text-center'>
                      Unlock powerful auto-clickers to boost your performance.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Story Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-2xl text-white text-center'>
                    Our Story
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-6 text-slate-300'>
                  <p>
                    Spacebar Clicker was born from a simple idea: what if we
                    could turn the most basic computer interaction into an
                    engaging, competitive experience? We wanted to create
                    something that anyone could play, regardless of their gaming
                    experience or technical skills.
                  </p>
                  <p>
                    What started as a weekend project quickly evolved into a
                    full-featured game with achievements, leaderboards, and a
                    global community of players. We've carefully crafted every
                    aspect of the game to provide the most satisfying clicking
                    experience possible.
                  </p>
                  <p>
                    Today, thousands of players from around the world compete
                    daily, pushing the boundaries of human clicking speed and
                    endurance. Join them and see how far you can go!
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-2xl text-white text-center'>
                    Game Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
                    <div>
                      <div className='text-3xl font-bold text-blue-400'>
                        1M+
                      </div>
                      <div className='text-slate-400'>Total Clicks</div>
                    </div>
                    <div>
                      <div className='text-3xl font-bold text-green-400'>
                        500+
                      </div>
                      <div className='text-slate-400'>Active Players</div>
                    </div>
                    <div>
                      <div className='text-3xl font-bold text-yellow-400'>
                        20+
                      </div>
                      <div className='text-slate-400'>Achievements</div>
                    </div>
                    <div>
                      <div className='text-3xl font-bold text-purple-400'>
                        50+
                      </div>
                      <div className='text-slate-400'>Countries</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className='text-center'
            >
              <Link href='/'>
                <Button
                  size='lg'
                  className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                >
                  Start Playing Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
