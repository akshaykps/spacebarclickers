'use client'

import type React from 'react'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api' // Updated import path

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.login(formData)

      if (response.success && response.data) {
        localStorage.setItem('auth_token', response.data.token)
        localStorage.setItem('user_data', JSON.stringify(response.data.user))
        router.push('/')
      } else {
        setError(response.error || 'Login failed')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className='min-h-screen bg-slate-950 flex items-center justify-center p-4'>
      {/* Background Grid */}
      <div className='fixed inset-0'>
        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      </div>

      <div className='relative z-10 w-full max-w-md'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
            <CardHeader className='text-center'>
              <motion.div
                className='text-4xl mb-4'
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                ⌨️
              </motion.div>
              <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                Welcome Back
              </CardTitle>
              <p className='text-slate-400'>
                Sign in to your Spacebar Clicker account
              </p>
            </CardHeader>

            <CardContent className='space-y-6'>
              {error && (
                <Alert className='border-red-500/50 bg-red-500/10'>
                  <AlertDescription className='text-red-400'>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email' className='text-slate-300'>
                    Email
                  </Label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400' />
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='Enter your email'
                      className='pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='password' className='text-slate-300'>
                    Password
                  </Label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400' />
                    <Input
                      id='password'
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder='Enter your password'
                      className='pl-10 pr-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300'
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                >
                  {loading ? (
                    <div className='flex items-center gap-2'>
                      <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                      Signing In...
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <LogIn className='h-4 w-4' />
                      Sign In
                    </div>
                  )}
                </Button>
              </form>

              <div className='text-center space-y-4'>
                <p className='text-slate-400'>
                  Don't have an account?{' '}
                  <Link
                    href='/auth/register'
                    className='text-blue-400 hover:text-blue-300 font-medium'
                  >
                    Sign up
                  </Link>
                </p>

                <Link
                  href='/'
                  className='inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors'
                  prefetch={false}
                >
                  <ArrowLeft className='h-4 w-4' />
                  Back to Game
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
