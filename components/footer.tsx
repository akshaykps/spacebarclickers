'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Heart,
  Github,
  Twitter,
  Mail,
  ExternalLink,
  ArrowUp,
  Gamepad2,
  Shield,
  Coffee,
  X,
  RssIcon,
  FacebookIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const footerSections = [
  {
    title: 'Game',
    icon: Gamepad2,
    links: [
      { href: '/', label: 'Play Now' },
      { href: '/about', label: 'About Game' },
      { href: '/contact', label: 'Contact Us' },
    ],
  },
  {
    title: 'Legal',
    icon: Shield,
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' },
    ],
  },
  {
    title: 'Resources',
    icon: Coffee,
    links: [
      { href: '/help', label: 'Help Center' },
      { href: '/frequently-asked-questions', label: 'FAQ' },
      { href: '/tips', label: 'Pro Tips' },
    ],
  },
]

const socialLinks = [
  {
    href: 'https://facebook.com/spacebarclickers',
    icon: FacebookIcon,
    label: 'Facebook',
    color: 'hover:text-gray-300',
  },
  {
    href: 'https://x.com/spacebarclicker',
    icon: X,
    label: 'X',
    color: 'hover:text-blue-400',
  },
  {
    href: 'mailto:hello@spacebarclickers.com',
    icon: Mail,
    label: 'Email',
    color: 'hover:text-green-400',
  },
]

export default function Footer() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <footer className='bg-slate-950 border-t border-slate-700/50 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]'></div>
      </div>

      <motion.div
        ref={ref}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className='container mx-auto px-4 py-12 relative z-10'
      >
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12'>
          {/* Brand Section */}
          <motion.div variants={itemVariants} className='space-y-6'>
            <div className='flex items-center gap-3'>
              <motion.div
                className='text-3xl'
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                whileHover={{ scale: 1.2 }}
              >
                ⌨️
              </motion.div>
              <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                Spacebar Clicker
              </h3>
            </div>

            <p className='text-slate-400 leading-relaxed'>
              The ultimate clicking experience that combines entertainment with
              skill development. Test your speed, unlock achievements, and join
              a global community of clicking enthusiasts.
            </p>

            {/* Stats */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='text-center p-3 bg-slate-900/50 rounded-lg border border-slate-800'>
                <div className='text-xl font-bold text-blue-400'>50M+</div>
                <div className='text-xs text-slate-500'>Total Clicks</div>
              </div>
              <div className='text-center p-3 bg-slate-900/50 rounded-lg border border-slate-800'>
                <div className='text-xl font-bold text-green-400'>10K+</div>
                <div className='text-xs text-slate-500'>Players</div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Sections */}
          {footerSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon
            return (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className='space-y-4'
                onMouseEnter={() => setHoveredSection(section.title)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className='flex items-center gap-2'>
                  <SectionIcon
                    className={`h-5 w-5 transition-colors ${
                      hoveredSection === section.title
                        ? 'text-blue-400'
                        : 'text-slate-400'
                    }`}
                  />
                  <h4 className='text-white font-semibold text-lg'>
                    {section.title}
                  </h4>
                </div>

                <ul className='space-y-3'>
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.href}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        href={link.href}
                        className='text-slate-400 hover:text-white transition-all duration-200 flex items-center gap-2 group'
                      >
                        <span className='group-hover:underline underline-offset-2'>
                          {link.label}
                        </span>
                        {link.href.startsWith('http') && (
                          <ExternalLink className='h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity' />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className='border-t border-slate-700/50 mt-12 pt-8'
        >
          <div className='flex flex-col lg:flex-row justify-between items-center gap-6'>
            {/* Copyright */}
            <div className='text-slate-400 text-sm flex items-center gap-2'>
              <span>© {new Date().getFullYear()} SpacebarClickers.com.</span>
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className='inline h-4 w-4 text-red-400' />
              </motion.div>
              <span>for clickers worldwide.</span>
            </div>

            {/* Social Links */}
            <div className='flex items-center gap-6'>
              {socialLinks.map((social, index) => {
                const SocialIcon = social.icon
                return (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target={
                      social.href.startsWith('http') ? '_blank' : undefined
                    }
                    rel={
                      social.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className={`text-slate-400 transition-all duration-200 ${social.color} transform hover:scale-110`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SocialIcon className='h-6 w-6' />
                    <span className='sr-only'>{social.label}</span>
                  </motion.a>
                )
              })}
            </div>

            {/* Scroll to Top */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={scrollToTop}
                variant='outline'
                size='sm'
                className='border-slate-600 hover:bg-slate-800 text-slate-400 hover:text-white group bg-transparent'
              >
                <ArrowUp className='h-4 w-4 mr-2 group-hover:animate-bounce' />
                Back to Top
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Fun Easter Egg */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className='text-center mt-8 pt-4 border-t border-slate-800/50'
        >
          <p className='text-xs text-slate-300'>
            🎮 Every click counts towards building the world's largest clicking
            community!
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
