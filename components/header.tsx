'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import LanguageSwitcher from './language-switcher'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/lib/i18n/config'

interface HeaderProps {
  dict: Dictionary
  locale: Locale
}

export default function Header({ dict, locale }: HeaderProps) {
  const getLocalizedPath = (path: string) => {
    return locale === 'en' ? path : `/${locale}${path}`
  }

  return (
    <header className='border-b border-slate-800/50 bg-slate-900/20 backdrop-blur-sm'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <motion.div
              className='text-3xl'
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              ⌨️
            </motion.div>
            <Link
              href={getLocalizedPath('/')}
              className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
            >
              {dict.game.title}
            </Link>
          </div>

          <nav className='hidden md:flex items-center gap-6'>
            <Link
              href={getLocalizedPath('/')}
              className='text-slate-300 hover:text-white transition-colors'
            >
              {dict.navigation.home}
            </Link>
            <Link
              href={getLocalizedPath('/about')}
              className='text-slate-300 hover:text-white transition-colors'
            >
              {dict.navigation.about}
            </Link>
            <Link
              href={getLocalizedPath('/help')}
              className='text-slate-300 hover:text-white transition-colors'
            >
              {dict.navigation.help}
            </Link>
            <Link
              href={getLocalizedPath('/contact')}
              className='text-slate-300 hover:text-white transition-colors'
            >
              {dict.navigation.contact}
            </Link>
          </nav>

          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  )
}
