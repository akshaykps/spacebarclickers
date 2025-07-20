'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  UserPlus,
  Check,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api, getUserCountry } from '@/lib/api' // Updated import path
import { motion } from 'framer-motion'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
  })
  const [countryData, setCountryData] = useState({
    country: '',
    country_code: '',
    flag_emoji: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validation, setValidation] = useState({
    username: { available: null as boolean | null, checking: false },
    email: { available: null as boolean | null, checking: false },
  })
  const router = useRouter()

  useEffect(() => {
    // Get user's country on component mount
    getUserCountry().then(setCountryData)
  }, [])

  const checkUsername = async (username: string) => {
    if (username.length < 3) return

    setValidation((prev) => ({
      ...prev,
      username: { ...prev.username, checking: true },
    }))

    try {
      const response = await api.checkUsername(username)
      if (response.success && response.data) {
        setValidation((prev) => ({
          ...prev,
          username: { available: response.data!.available, checking: false },
        }))
      }
    } catch (error) {
      setValidation((prev) => ({
        ...prev,
        username: { available: null, checking: false },
      }))
    }
  }

  const checkEmail = async (email: string) => {
    if (!email.includes('@')) return

    setValidation((prev) => ({
      ...prev,
      email: { ...prev.email, checking: true },
    }))

    try {
      const response = await api.checkEmail(email)
      if (response.success && response.data) {
        setValidation((prev) => ({
          ...prev,
          email: { available: response.data!.available, checking: false },
        }))
      }
    } catch (error) {
      setValidation((prev) => ({
        ...prev,
        email: { available: null, checking: false },
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.password_confirm) {
      setError("Passwords don't match")
      setLoading(false)
      return
    }

    try {
      const response = await api.register({
        ...formData,
        ...countryData,
      })

      if (response.success && response.data) {
        localStorage.setItem('auth_token', response.data.token)
        localStorage.setItem('user_data', JSON.stringify(response.data.user))
        router.push('/')
      } else {
        setError(response.error || 'Registration failed')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Debounced validation checks
    if (name === 'username') {
      setTimeout(() => checkUsername(value), 500)
    } else if (name === 'email') {
      setTimeout(() => checkEmail(value), 500)
    }
  }

  const getValidationIcon = (field: 'username' | 'email') => {
    const { available, checking } = validation[field]
    if (checking)
      return (
        <div className='w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin' />
      )
    if (available === true) return <Check className='h-4 w-4 text-green-400' />
    if (available === false) return <X className='h-4 w-4 text-red-400' />
    return null
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
                Join the Game
              </CardTitle>
              <p className='text-slate-400'>
                Create your Spacebar Clicker account
                {countryData.flag_emoji && (
                  <span className='ml-2'>
                    {countryData.flag_emoji} {countryData.country}
                  </span>
                )}
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
                  <Label htmlFor='username' className='text-slate-300'>
                    Username
                  </Label>
                  <div className='relative'>
                    <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400' />
                    <Input
                      id='username'
                      name='username'
                      type='text'
                      value={formData.username}
                      onChange={handleChange}
                      placeholder='Choose a username'
                      className='pl-10 pr-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
                      required
                      minLength={3}
                    />
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                      {getValidationIcon('username')}
                    </div>
                  </div>
                  {validation.username.available === false && (
                    <p className='text-xs text-red-400'>
                      Username is already taken
                    </p>
                  )}
                </div>

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
                      className='pl-10 pr-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
                      required
                    />
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                      {getValidationIcon('email')}
                    </div>
                  </div>
                  {validation.email.available === false && (
                    <p className='text-xs text-red-400'>
                      Email is already registered
                    </p>
                  )}
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
                      placeholder='Create a password'
                      className='pl-10 pr-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
                      required
                      minLength={8}
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

                <div className='space-y-2'>
                  <Label htmlFor='password_confirm' className='text-slate-300'>
                    Confirm Password
                  </Label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400' />
                    <Input
                      id='password_confirm'
                      name='password_confirm'
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.password_confirm}
                      onChange={handleChange}
                      placeholder='Confirm your password'
                      className='pl-10 pr-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
                      required
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300'
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type='submit'
                  disabled={
                    loading ||
                    validation.username.available === false ||
                    validation.email.available === false
                  }
                  className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                >
                  {loading ? (
                    <div className='flex items-center gap-2'>
                      <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                      Creating Account...
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <UserPlus className='h-4 w-4' />
                      Create Account
                    </div>
                  )}
                </Button>
              </form>

              <div className='text-center space-y-4'>
                <p className='text-slate-400'>
                  Already have an account?{' '}
                  <Link
                    href='/auth/login'
                    className='text-blue-400 hover:text-blue-300 font-medium'
                    prefetch={false}
                  >
                    Sign in
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
