'use client'

import type React from 'react'

import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import Footer from '@/components/footer'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
    setSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
          </div>
        </header>

        {/* Main Content */}
        <main className='container mx-auto px-4 py-12'>
          <div className='max-w-4xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center mb-12'
            >
              <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                Contact Us
              </h1>
              <p className='text-xl text-slate-300'>
                Have questions, feedback, or need support? We'd love to hear
                from you!
              </p>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='space-y-6'
              >
                <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                  <CardHeader>
                    <CardTitle className='text-white flex items-center gap-2'>
                      <Mail className='h-5 w-5 text-blue-400' />
                      Email Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-slate-300 mb-2'>General inquiries:</p>
                    <a
                      href='mailto:hello@spacebarclickers.com'
                      className='text-blue-400 hover:text-blue-300'
                    >
                      hello@spacebarclickers.com
                    </a>
                    <p className='text-slate-300 mt-4 mb-2'>Support:</p>
                    <a
                      href='mailto:support@spacebarclickers.com'
                      className='text-blue-400 hover:text-blue-300'
                    >
                      support@spacebarclickers.com
                    </a>
                  </CardContent>
                </Card>

                <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                  <CardHeader>
                    <CardTitle className='text-white flex items-center gap-2'>
                      <Clock className='h-5 w-5 text-green-400' />
                      Response Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-slate-300'>
                      We typically respond within 24 hours during business days.
                    </p>
                  </CardContent>
                </Card>

                <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                  <CardHeader>
                    <CardTitle className='text-white flex items-center gap-2'>
                      <MapPin className='h-5 w-5 text-purple-400' />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-slate-300'>
                      Based globally, serving players worldwide 🌍
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='lg:col-span-2'
              >
                <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                  <CardHeader>
                    <CardTitle className='text-white flex items-center gap-2'>
                      <MessageSquare className='h-5 w-5 text-yellow-400' />
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {submitted ? (
                      <div className='text-center py-8'>
                        <div className='text-4xl mb-4'>✅</div>
                        <h3 className='text-xl font-semibold text-white mb-2'>
                          Message Sent!
                        </h3>
                        <p className='text-slate-300'>
                          Thank you for contacting us. We'll get back to you
                          soon!
                        </p>
                        <Button
                          onClick={() => setSubmitted(false)}
                          variant='outline'
                          className='mt-4 border-slate-600 hover:bg-slate-700'
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='space-y-2'>
                            <Label htmlFor='name' className='text-slate-300'>
                              Name
                            </Label>
                            <Input
                              id='name'
                              name='name'
                              value={formData.name}
                              onChange={handleChange}
                              placeholder='Your name'
                              className='bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
                              required
                            />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='email' className='text-slate-300'>
                              Email
                            </Label>
                            <Input
                              id='email'
                              name='email'
                              type='email'
                              value={formData.email}
                              onChange={handleChange}
                              placeholder='your@email.com'
                              className='bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
                              required
                            />
                          </div>
                        </div>

                        <div className='space-y-2'>
                          <Label htmlFor='subject' className='text-slate-300'>
                            Subject
                          </Label>
                          <Input
                            id='subject'
                            name='subject'
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What's this about?"
                            className='bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400'
                            required
                          />
                        </div>

                        <div className='space-y-2'>
                          <Label htmlFor='message' className='text-slate-300'>
                            Message
                          </Label>
                          <Textarea
                            id='message'
                            name='message'
                            value={formData.message}
                            onChange={handleChange}
                            placeholder='Tell us more...'
                            rows={6}
                            className='bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 resize-none'
                            required
                          />
                        </div>

                        <Button
                          type='submit'
                          disabled={loading}
                          className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                        >
                          {loading ? (
                            <div className='flex items-center gap-2'>
                              <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                              Sending...
                            </div>
                          ) : (
                            <div className='flex items-center gap-2'>
                              <Send className='h-4 w-4' />
                              Send Message
                            </div>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
