import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-slate-900/40 border-t border-slate-800/50 backdrop-blur-sm py-8 text-slate-400'>
      <div className='container mx-auto px-4 text-center'>
        <div className='flex flex-col sm:flex-row justify-center items-center gap-4 mb-4'>
          <Link href='/' className='hover:text-white transition-colors'>
            Home
          </Link>
          <Link href='/about' className='hover:text-white transition-colors'>
            About
          </Link>
          <Link href='/contact' className='hover:text-white transition-colors'>
            Contact
          </Link>
          <Link
            href='/privacy-policy'
            className='hover:text-white transition-colors'
          >
            Privacy Policy
          </Link>
        </div>
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} Spacebar Clicker. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}

// 'use client'

// import Link from 'next/link'
// import { motion } from 'framer-motion'
// import { Heart, Github, Twitter, Mail, User, LogIn } from 'lucide-react'

// export default function Footer() {
//   return (
//     <footer className='bg-slate-950 border-t border-slate-700/50'>
//       <div className='container mx-auto px-4 py-8'>
//         <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
//           {/* Brand */}
//           <div className='space-y-4'>
//             <div className='flex items-center gap-2'>
//               <motion.div
//                 className='text-2xl'
//                 animate={{ rotate: [0, 10, -10, 0] }}
//                 transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//               >
//                 ⌨️
//               </motion.div>
//               <h3 className='text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
//                 Spacebar Clicker
//               </h3>
//             </div>
//             <p className='text-slate-400 text-sm'>
//               The ultimate clicking experience. Test your speed, unlock
//               achievements, and climb the leaderboard!
//             </p>
//           </div>

//           {/* Game */}
//           <div className='space-y-4'>
//             <h4 className='text-white font-semibold'>Game</h4>
//             <ul className='space-y-2 text-sm'>
//               <li>
//                 <Link
//                   href='/'
//                   className='text-slate-400 hover:text-white transition-colors'
//                 >
//                   Play Now
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href='/leaderboard'
//                   className='text-slate-400 hover:text-white transition-colors'
//                 >
//                   Leaderboard
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href='/achievements'
//                   className='text-slate-400 hover:text-white transition-colors'
//                 >
//                   Achievements
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href='/help'
//                   className='text-slate-400 hover:text-white transition-colors'
//                 >
//                   How to Play
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Company */}
//           <div className='space-y-4'>
//             <h4 className='text-white font-semibold'>Company</h4>
//             <ul className='space-y-2 text-sm'>
//               <li>
//                 <Link
//                   href='/about'
//                   className='text-slate-400 hover:text-white transition-colors'
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href='/contact'
//                   className='text-slate-400 hover:text-white transition-colors'
//                 >
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href='/privacy-policy'
//                   className='text-slate-400 hover:text-white transition-colors'
//                 >
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href='/terms'
//                   className='text-slate-400 hover:text-white transition-colors'
//                 >
//                   Terms of Service
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Account */}
//           <div className='space-y-4'>
//             <h4 className='text-white font-semibold'>Account</h4>
//             <ul className='space-y-2 text-sm'>
//               <li>
//                 <Link
//                   href='/auth/register'
//                   className='text-slate-400 hover:text-white transition-colors flex items-center gap-2'
//                 >
//                   <User className='h-3 w-3' />
//                   Sign Up
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href='/auth/login'
//                   className='text-slate-400 hover:text-white transition-colors flex items-center gap-2'
//                 >
//                   <LogIn className='h-3 w-3' />
//                   Sign In
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href='/profile'
//                   className='text-slate-400 hover:text-white transition-colors'
//                 >
//                   My Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href='/stats'
//                   className='text-slate-400 hover:text-white transition-colors'
//                 >
//                   My Stats
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className='border-t border-slate-700/50 mt-8 pt-8'>
//           <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
//             <div className='text-slate-400 text-sm'>
//               © 2024 SpacebarClickers.com. Made with{' '}
//               <Heart className='inline h-4 w-4 text-red-400' /> for clickers
//               worldwide.
//             </div>

//             <div className='flex items-center gap-4'>
//               <a
//                 href='https://github.com/spacebarclickers'
//                 target='_blank'
//                 rel='noopener noreferrer'
//                 className='text-slate-400 hover:text-white transition-colors'
//               >
//                 <Github className='h-5 w-5' />
//               </a>
//               <a
//                 href='https://twitter.com/spacebarclicker'
//                 target='_blank'
//                 rel='noopener noreferrer'
//                 className='text-slate-400 hover:text-white transition-colors'
//               >
//                 <Twitter className='h-5 w-5' />
//               </a>
//               <a
//                 href='mailto:hello@spacebarclickers.com'
//                 className='text-slate-400 hover:text-white transition-colors'
//               >
//                 <Mail className='h-5 w-5' />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }
