'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { localeNames, localeFlags, type Locale } from '@/lib/i18n/config'

interface LanguageSwitcherProps {
  currentLocale: string
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: Locale) => {
    setIsOpen(false)

    // Remove current locale from pathname if it exists
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'

    // Add new locale to path (except for default locale 'en')
    const newPath =
      newLocale === 'en'
        ? pathWithoutLocale
        : `/${newLocale}${pathWithoutLocale}`

    router.push(newPath)
  }

  const currentLocaleData = {
    code: currentLocale as Locale,
    name: localeNames[currentLocale as Locale] || localeNames.en,
    flag: localeFlags[currentLocale as Locale] || localeFlags.en,
  }

  return (
    <div className='relative'>
      <Button
        variant='outline'
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 bg-slate-900/40 border-slate-700/50 text-white hover:bg-slate-800/60 backdrop-blur-sm'
      >
        <Globe className='h-4 w-4' />
        <span className='text-lg'>{currentLocaleData.flag}</span>
        <span className='hidden sm:inline'>{currentLocaleData.name}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className='fixed inset-0 z-40'
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className='absolute top-full mt-2 right-0 z-50 min-w-[200px]'
            >
              <Card className='bg-slate-900/95 border-slate-700/50 backdrop-blur-md shadow-xl'>
                <CardContent className='p-2'>
                  <div className='space-y-1'>
                    {Object.entries(localeNames).map(([code, name]) => {
                      const isSelected = code === currentLocale
                      return (
                        <motion.button
                          key={code}
                          onClick={() => handleLocaleChange(code as Locale)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                            isSelected
                              ? 'bg-blue-600/20 text-blue-400'
                              : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                          }`}
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className='text-lg'>
                            {localeFlags[code as Locale]}
                          </span>
                          <span className='flex-1'>{name}</span>
                          {isSelected && (
                            <Check className='h-4 w-4 text-blue-400' />
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
