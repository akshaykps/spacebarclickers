'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy,
  Settings,
  RotateCcw,
  Share2,
  Users,
  Crown,
  Zap,
  Target,
  Flame,
  Volume2,
  VolumeX,
  Menu,
  Info,
  Mail,
  HelpCircle,
  Home,
  Play,
  Check,
  LogIn,
  LogOut,
  UserCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  api,
  type BackendAchievement,
  type LeaderboardEntry as BackendLeaderboardEntry,
  getUserCountry, // Import getUserCountry
  type User as BackendUser, // Import User type from api.ts
} from '@/lib/api'
import Link from 'next/link' // Import Link for navigation
import { useRouter } from 'next/navigation' // Import useRouter for navigation
import Footer from '@/components/footer' // Import the new Footer component
import HowItWorksSection from '@/components/how-it-works-section' // Import the new HowItWorksSection

interface Achievement {
  id: number
  name: string
  description: string
  unlockAt: number
  speed: number
  clickMultiplier: number
  unlocked: boolean
  activated: boolean // New field for manual activation
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'
  theme?: {
    primary: string
    secondary: string
    accent: string
    background: string
    bgClass: string
  }
}

interface FloatingPoint {
  id: number
  x: number
  y: number
  value: number
  type: 'click' | 'auto' | 'bonus'
}

interface Confetti {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
}

interface GameStats {
  totalClicks: number
  clicksPerSecond: number
  timePlayedSeconds: number
  achievementsUnlocked: number
  achievementsActivated: number
  highestClicksPerSecond: number
}

export const predefinedAchievements: Omit<
  Achievement,
  'unlocked' | 'activated'
>[] = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Make your first click',
    unlockAt: 1,
    speed: 0,
    clickMultiplier: 1,
    icon: '🎯',
    rarity: 'common',
    theme: {
      primary: 'from-blue-400 to-blue-600',
      secondary: 'blue-500',
      accent: 'blue-400',
      background: 'blue-900',
      bgClass: 'bg-blue-950',
    },
  },
  {
    id: 2,
    name: 'Getting Warmed Up',
    description: 'Click 10 times',
    unlockAt: 10,
    speed: 0.1,
    clickMultiplier: 1.1,
    icon: '🔥',
    rarity: 'common',
    theme: {
      primary: 'from-orange-400 to-red-500',
      secondary: 'orange-500',
      accent: 'orange-400',
      background: 'orange-900',
      bgClass: 'bg-orange-950',
    },
  },
  {
    id: 3,
    name: 'Clicking Novice',
    description: 'Reach 50 clicks',
    unlockAt: 50,
    speed: 0.2,
    clickMultiplier: 1.2,
    icon: '👶',
    rarity: 'common',
    theme: {
      primary: 'from-green-400 to-green-600',
      secondary: 'green-500',
      accent: 'green-400',
      background: 'green-900',
      bgClass: 'bg-green-950',
    },
  },
  {
    id: 4,
    name: 'Steady Progress',
    description: 'Achieve 100 clicks',
    unlockAt: 100,
    speed: 0.5,
    clickMultiplier: 1.3,
    icon: '⚡',
    rarity: 'common',
    theme: {
      primary: 'from-yellow-400 to-yellow-600',
      secondary: 'yellow-500',
      accent: 'yellow-400',
      background: 'yellow-900',
      bgClass: 'bg-yellow-950',
    },
  },
  {
    id: 5,
    name: 'Click Enthusiast',
    description: 'Reach 250 clicks',
    unlockAt: 250,
    speed: 1,
    clickMultiplier: 1.4,
    icon: '🚀',
    rarity: 'rare',
    theme: {
      primary: 'from-purple-400 to-purple-600',
      secondary: 'purple-500',
      accent: 'purple-400',
      background: 'purple-900',
      bgClass: 'bg-purple-950',
    },
  },
  {
    id: 6,
    name: 'Speed Demon',
    description: 'Hit 500 clicks',
    unlockAt: 500,
    speed: 2,
    clickMultiplier: 1.5,
    icon: '💨',
    rarity: 'rare',
    theme: {
      primary: 'from-cyan-400 to-cyan-600',
      secondary: 'cyan-500',
      accent: 'cyan-400',
      background: 'cyan-900',
      bgClass: 'bg-cyan-950',
    },
  },
  {
    id: 7,
    name: 'Click Master',
    description: 'Achieve 1,000 clicks',
    unlockAt: 1000,
    speed: 3,
    clickMultiplier: 1.6,
    icon: '🎖️',
    rarity: 'rare',
    theme: {
      primary: 'from-indigo-400 to-indigo-600',
      secondary: 'indigo-500',
      accent: 'indigo-400',
      background: 'indigo-900',
      bgClass: 'bg-indigo-950',
    },
  },
  {
    id: 8,
    name: 'Rapid Fire',
    description: 'Reach 2,500 clicks',
    unlockAt: 2500,
    speed: 5,
    clickMultiplier: 1.7,
    icon: '🔫',
    rarity: 'epic',
    theme: {
      primary: 'from-pink-400 to-pink-600',
      secondary: 'pink-500',
      accent: 'pink-400',
      background: 'pink-900',
      bgClass: 'bg-pink-950',
    },
  },
  {
    id: 9,
    name: 'Click Legend',
    description: 'Hit 5,000 clicks',
    unlockAt: 5000,
    speed: 8,
    clickMultiplier: 1.8,
    icon: '👑',
    rarity: 'epic',
    theme: {
      primary: 'from-amber-400 to-orange-500',
      secondary: 'amber-500',
      accent: 'amber-400',
      background: 'amber-900',
      bgClass: 'bg-amber-950',
    },
  },
  {
    id: 10,
    name: 'Spacebar Warrior',
    description: 'Achieve 10,000 clicks',
    unlockAt: 10000,
    speed: 12,
    clickMultiplier: 1.9,
    icon: '⚔️',
    rarity: 'epic',
    theme: {
      primary: 'from-red-400 to-red-600',
      secondary: 'red-500',
      accent: 'red-400',
      background: 'red-900',
      bgClass: 'bg-red-950',
    },
  },
  {
    id: 11,
    name: 'Click Overlord',
    description: 'Reach 25,000 clicks',
    unlockAt: 25000,
    speed: 20,
    clickMultiplier: 2.0,
    icon: '👹',
    rarity: 'legendary',
    theme: {
      primary: 'from-violet-400 to-purple-600',
      secondary: 'violet-500',
      accent: 'violet-400',
      background: 'violet-900',
      bgClass: 'bg-violet-950',
    },
  },
  {
    id: 12,
    name: 'Finger Lightning',
    description: 'Hit 50,000 clicks',
    unlockAt: 50000,
    speed: 30,
    clickMultiplier: 2.2,
    icon: '⚡',
    rarity: 'legendary',
    theme: {
      primary: 'from-blue-400 to-purple-600',
      secondary: 'blue-500',
      accent: 'blue-400',
      background: 'blue-900',
      bgClass: 'bg-blue-950',
    },
  },
  {
    id: 13,
    name: 'Click Tsunami',
    description: 'Achieve 100,000 clicks',
    unlockAt: 100000,
    speed: 50,
    clickMultiplier: 2.4,
    icon: '🌊',
    rarity: 'legendary',
    theme: {
      primary: 'from-teal-400 to-blue-600',
      secondary: 'teal-500',
      accent: 'teal-400',
      background: 'teal-900',
      bgClass: 'bg-teal-950',
    },
  },
  {
    id: 14,
    name: 'Spacebar God',
    description: 'Reach 250,000 clicks',
    unlockAt: 250000,
    speed: 80,
    clickMultiplier: 2.6,
    icon: '🔱',
    rarity: 'mythic',
    theme: {
      primary: 'from-yellow-400 to-red-500',
      secondary: 'yellow-500',
      accent: 'yellow-400',
      background: 'yellow-900',
      bgClass: 'bg-gradient-to-br from-yellow-950 to-red-950',
    },
  },
  {
    id: 15,
    name: 'Infinite Clicker',
    description: 'Hit 500,000 clicks',
    unlockAt: 500000,
    speed: 120,
    clickMultiplier: 2.8,
    icon: '♾️',
    rarity: 'mythic',
    theme: {
      primary: 'from-purple-400 to-pink-600',
      secondary: 'purple-500',
      accent: 'purple-400',
      background: 'purple-900',
      bgClass: 'bg-gradient-to-br from-purple-950 to-pink-950',
    },
  },
  {
    id: 16,
    name: 'Reality Breaker',
    description: 'Achieve 1,000,000 clicks',
    unlockAt: 1000000,
    speed: 200,
    clickMultiplier: 3.0,
    icon: '💥',
    rarity: 'mythic',
    theme: {
      primary: 'from-red-400 to-pink-600',
      secondary: 'red-500',
      accent: 'red-400',
      background: 'red-900',
      bgClass: 'bg-gradient-to-br from-red-950 to-pink-950',
    },
  },
  {
    id: 17,
    name: 'Universe Clicker',
    description: 'Reach 2,500,000 clicks',
    unlockAt: 2500000,
    speed: 350,
    clickMultiplier: 3.5,
    icon: '🌌',
    rarity: 'mythic',
    theme: {
      primary: 'from-indigo-400 to-purple-600',
      secondary: 'indigo-500',
      accent: 'indigo-400',
      background: 'indigo-900',
      bgClass: 'bg-gradient-to-br from-indigo-950 to-purple-950',
    },
  },
  {
    id: 18,
    name: 'Dimension Hopper',
    description: 'Hit 5,000,000 clicks',
    unlockAt: 5000000,
    speed: 500,
    clickMultiplier: 4.0,
    icon: '🌀',
    rarity: 'mythic',
    theme: {
      primary: 'from-cyan-400 to-blue-600',
      secondary: 'cyan-500',
      accent: 'cyan-400',
      background: 'cyan-900',
      bgClass: 'bg-gradient-to-br from-cyan-950 to-blue-950',
    },
  },
  {
    id: 19,
    name: 'Time Manipulator',
    description: 'Achieve 10,000,000 clicks',
    unlockAt: 10000000,
    speed: 800,
    clickMultiplier: 4.5,
    icon: '⏰',
    rarity: 'mythic',
    theme: {
      primary: 'from-emerald-400 to-teal-600',
      secondary: 'emerald-500',
      accent: 'emerald-400',
      background: 'emerald-900',
      bgClass: 'bg-gradient-to-br from-emerald-950 to-teal-950',
    },
  },
  {
    id: 20,
    name: 'Omnipotent Clicker',
    description: 'Reach 25,000,000 clicks',
    unlockAt: 25000000,
    speed: 1200,
    clickMultiplier: 5.0,
    icon: '🔮',
    rarity: 'mythic',
    theme: {
      primary: 'from-pink-400 to-purple-600',
      secondary: 'pink-500',
      accent: 'pink-400',
      background: 'pink-900',
      bgClass: 'bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950',
    },
  },
]

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-500',
  mythic: 'from-pink-400 to-red-500',
}

const rarityBorders = {
  common: 'border-gray-500/50',
  rare: 'border-blue-500/50',
  epic: 'border-purple-500/50',
  legendary: 'border-yellow-500/50',
  mythic: 'border-pink-500/50',
}

export default function SpacebarClickerGame() {
  const [totalClicks, setTotalClicks] = useState(0)
  const [clickMultiplier, setClickMultiplier] = useState(1)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [floatingPoints, setFloatingPoints] = useState<FloatingPoint[]>([])
  const [confetti, setConfetti] = useState<Confetti[]>([])
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)
  const [currentTheme, setCurrentTheme] = useState({
    primary: 'from-blue-400 via-purple-400 to-pink-400',
    secondary: 'purple-500',
    accent: 'purple-400',
    background: 'slate-950',
    bgClass: 'bg-slate-950',
  })
  const [currentUser, setCurrentUser] = useState<BackendUser | null>(null) // New state for logged-in user
  const [anonymousUsername, setAnonymousUsername] = useState<string | null>(
    null
  ) // New state for anonymous user
  const [showSettings, setShowSettings] = useState(false)
  const [gameStats, setGameStats] = useState<GameStats>({
    totalClicks: 0,
    clicksPerSecond: 0,
    timePlayedSeconds: 0,
    achievementsUnlocked: 0,
    achievementsActivated: 0,
    highestClicksPerSecond: 0,
  })
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [clickStreak, setClickStreak] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const [autoClickerTotal, setAutoClickerTotal] = useState(0)
  const [isThemeChanging, setIsThemeChanging] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showMobileStats, setShowMobileStats] = useState(false)
  const [leaderboardData, setLeaderboardData] = useState<
    BackendLeaderboardEntry[]
  >([])
  const [leaderboardLoading, setLeaderboardLoading] = useState(true)
  const highScoreData = leaderboardData.length > 0 ? leaderboardData[0] : null
  const [userCountryInfo, setUserCountryInfo] = useState({
    country: 'Unknown',
    country_code: 'XX',
    flag_emoji: '🌍',
  })
  const [scoreAlert, setScoreAlert] = useState<{
    message: string
    type: 'success' | 'info' | 'error'
  } | null>(null)

  const gameAreaRef = useRef<HTMLDivElement>(null)
  const autoClickerRef = useRef<NodeJS.Timeout[]>([])
  const statsIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const scoreSubmitDebounceRef = useRef<NodeJS.Timeout | null>(null) // Ref for debounced score submission
  const clickCountRef = useRef(0)
  const startTimeRef = useRef(Date.now())
  const confettiIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter() // Initialize useRouter

  // Create an Audio object for the click sound
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    clickSoundRef.current = new Audio('/sounds/click.mp3')
    clickSoundRef.current.volume = 0.5 // Set a default volume
    clickSoundRef.current.load() // Preload the audio
  }, [])

  // Function to play the click sound
  const playClickSound = useCallback(() => {
    if (soundEnabled && clickSoundRef.current) {
      // Only play if the audio is ready
      if (clickSoundRef.current.readyState >= 2) {
        clickSoundRef.current.currentTime = 0 // Reset to start for rapid clicks
        clickSoundRef.current
          .play()
          .catch((e) => console.error('Error playing sound:', e))
      } else {
        console.warn('Click sound not ready to play.')
      }
    }
  }, [soundEnabled])

  // Fetch and refresh leaderboard
  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await api.getLeaderboard()
      if (response.success && response.data) {
        setLeaderboardData(response.data.leaderboard)
      } else {
        console.error('Failed to load leaderboard data:', response.error)
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    } finally {
      setLeaderboardLoading(false)
    }
  }, [])

  // Initialize game and load user data
  useEffect(() => {
    const initializeGame = async () => {
      const savedData = localStorage.getItem('spacebar-clicker-data')
      let initialTotalClicks = 0
      let initialClickMultiplier = 1
      let initialGameStats = { ...gameStats } // Copy default stats
      let initialSoundEnabled = true
      let initialCurrentTheme = { ...currentTheme } // Copy default theme
      let initialAchievements: Achievement[] = []

      try {
        // Always fetch backend achievements first to get the latest definitions
        initialAchievements = await initializeAchievements()

        if (savedData) {
          try {
            const data = JSON.parse(savedData)
            initialTotalClicks = data.totalClicks || 0
            initialClickMultiplier = data.clickMultiplier || 1
            initialGameStats = data.gameStats || initialGameStats
            initialSoundEnabled = data.soundEnabled !== false
            initialCurrentTheme = data.currentTheme || initialCurrentTheme

            // Merge backend achievements with saved user progress
            initialAchievements = initialAchievements.map((backendAch) => {
              const savedAch = (data.achievements || []).find(
                (saved: Achievement) => saved.id === backendAch.id
              )
              return {
                ...backendAch,
                unlocked: savedAch?.unlocked || false,
                activated: savedAch?.activated || false,
              }
            })
          } catch (error) {
            console.error('Failed to parse saved data, starting fresh:', error)
            // If parsing fails, use default/backend achievements
          }
        }
      } catch (error) {
        console.error('Error during initial achievement load:', error)
        // Fallback to predefined if backend fails
        initialAchievements = getFallbackAchievements()
      }

      // Fetch user country info
      const countryInfo = await getUserCountry()
      setUserCountryInfo(countryInfo)

      // Load current user from localStorage
      const userDataString = localStorage.getItem('user_data')
      if (userDataString) {
        try {
          const userData = JSON.parse(userDataString)
          setCurrentUser(userData)

          // If logged in, fetch user's score from backend and override local state
          console.log('User logged in, fetching score from backend...')
          const myScoreResponse = await api.getMyScore()
          if (myScoreResponse.success && myScoreResponse.data) {
            const userScore = myScoreResponse.data.entry
            console.log('Fetched user score:', userScore)
            setTotalClicks(userScore.total_clicks)
            setGameStats((prev) => ({
              ...prev,
              totalClicks: userScore.total_clicks,
              clicksPerSecond: userScore.clicks_per_second,
              timePlayedSeconds: userScore.time_played_seconds,
              achievementsUnlocked: userScore.achievementsUnlocked,
              achievementsActivated: userScore.achievementsActivated,
            }))

            // Re-apply activated achievement effects based on fetched data
            // IMPORTANT: Backend must provide achievements_unlocked_ids and achievements_activated_ids
            initialAchievements = initialAchievements.map((ach) => {
              const isUnlocked =
                userScore.achievements_unlocked_ids?.includes(ach.id) || false
              const isActivated =
                userScore.achievements_activated_ids?.includes(ach.id) || false
              return { ...ach, unlocked: isUnlocked, activated: isActivated }
            })
            // Recalculate multiplier based on activated achievements
            const newMultiplier = initialAchievements
              .filter((a) => a.activated)
              .reduce((mult, a) => mult * a.clickMultiplier, 1)
            setClickMultiplier(newMultiplier)
          } else {
            console.warn(
              'Failed to fetch user score from backend, using local data or defaults.'
            )
            setTotalClicks(initialTotalClicks)
            setClickMultiplier(initialClickMultiplier)
            setGameStats(initialGameStats)
          }
        } catch (error) {
          console.error('Failed to parse user data or fetch score:', error)
          localStorage.removeItem('user_data')
          localStorage.removeItem('auth_token')
          setCurrentUser(null)
          setTotalClicks(initialTotalClicks)
          setClickMultiplier(initialClickMultiplier)
          setGameStats(initialGameStats)
        }
      } else {
        // Not logged in, handle anonymous user
        let guestUsername = localStorage.getItem('guest_username')
        if (!guestUsername) {
          guestUsername = `Guest-${Math.random().toString(36).substring(2, 8)}`
          localStorage.setItem('guest_username', guestUsername)
        }
        setAnonymousUsername(guestUsername)
        setTotalClicks(initialTotalClicks)
        setClickMultiplier(initialClickMultiplier)
        setGameStats(initialGameStats)
      }

      setAchievements(initialAchievements)
      setSoundEnabled(initialSoundEnabled)
      setCurrentTheme(initialCurrentTheme)
      startTimeRef.current =
        Date.now() - (initialGameStats?.timePlayedSeconds || 0) * 1000

      // Start stats tracking
      statsIntervalRef.current = setInterval(updateStats, 1000)
    }

    initializeGame()
    fetchLeaderboard() // Initial fetch of leaderboard only

    return () => {
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current)
      }
      if (scoreSubmitDebounceRef.current) {
        clearTimeout(scoreSubmitDebounceRef.current)
      }
    }
  }, [fetchLeaderboard]) // Only fetchLeaderboard dependency

  // Periodic leaderboard and high score refresh (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLeaderboard() // Only refresh leaderboard
    }, 30000)
    return () => clearInterval(interval)
  }, [fetchLeaderboard])

  // Debounced score submission on inactivity
  useEffect(() => {
    if (scoreSubmitDebounceRef.current) {
      clearTimeout(scoreSubmitDebounceRef.current)
    }

    // Set a timeout to submit score after 2 seconds of inactivity
    scoreSubmitDebounceRef.current = setTimeout(() => {
      // Submit score for both logged-in and anonymous users if clicks exist
      if (totalClicks > 0) {
        submitGameScore()
      }
    }, 2000) // 2 seconds debounce

    return () => {
      if (scoreSubmitDebounceRef.current) {
        clearTimeout(scoreSubmitDebounceRef.current)
      }
    }
  }, [
    totalClicks,
    currentUser,
    anonymousUsername,
    gameStats,
    achievements,
    userCountryInfo,
  ]) // Re-run when relevant game state changes

  // Save to localStorage
  useEffect(() => {
    const data = {
      totalClicks,
      clickMultiplier,
      achievements,
      username: currentUser?.username || anonymousUsername || '', // Save username from currentUser or anonymousUsername
      gameStats,
      soundEnabled,
      currentTheme,
    }
    localStorage.setItem('spacebar-clicker-data', JSON.stringify(data))
  }, [
    totalClicks,
    clickMultiplier,
    achievements,
    currentUser, // Dependency changed to currentUser
    anonymousUsername, // Added anonymousUsername as dependency
    gameStats,
    soundEnabled,
    currentTheme,
  ])

  // Auto-clicker system - Only use ACTIVATED achievements
  useEffect(() => {
    // Clear existing auto-clickers
    autoClickerRef.current.forEach(clearInterval)
    autoClickerRef.current = []

    // Start auto-clickers for activated achievements only
    achievements.forEach((achievement) => {
      if (
        achievement.unlocked &&
        achievement.activated &&
        achievement.speed > 0
      ) {
        const interval = setInterval(() => {
          const autoClicks = Math.floor(achievement.speed * clickMultiplier)
          setTotalClicks((prev) => prev + autoClicks)
          setAutoClickerTotal((prev) => prev + autoClicks)

          // Create floating points for auto-clicks
          if (gameAreaRef.current && Math.random() < 0.3) {
            createFloatingPoint(autoClicks, 'auto')
          }
        }, 1000)
        autoClickerRef.current.push(interval)
      }
    })

    return () => {
      autoClickerRef.current.forEach(clearInterval)
    }
  }, [achievements, clickMultiplier])

  // Check for new achievements - Only unlock, don't activate
  useEffect(() => {
    achievements.forEach((achievement) => {
      if (!achievement.unlocked && totalClicks >= achievement.unlockAt) {
        unlockAchievement(achievement.id)
      }
    })
  }, [totalClicks, achievements])

  // Keyboard event listener
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !event.repeat) {
        event.preventDefault()
        handleClick()
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [clickMultiplier, playClickSound]) // Added playClickSound to dependencies

  // Confetti animation
  useEffect(() => {
    if (confetti.length > 0) {
      confettiIntervalRef.current = setInterval(() => {
        setConfetti((prev) =>
          prev
            .map((piece) => ({
              ...piece,
              x: piece.x + piece.vx,
              y: piece.y + piece.vy,
              vy: piece.vy + 0.5, // gravity
              rotation: piece.rotation + piece.rotationSpeed,
            }))
            .filter((piece) => piece.y < window.innerHeight + 50)
        )
      }, 16)
    } else if (confettiIntervalRef.current) {
      clearInterval(confettiIntervalRef.current)
    }

    return () => {
      if (confettiIntervalRef.current) {
        clearInterval(confettiIntervalRef.current)
      }
    }
  }, [confetti.length])

  const submitGameScore = useCallback(async () => {
    const usernameToSubmit =
      currentUser?.username || anonymousUsername || 'AnonymousGuest' // Use logged-in username or generated anonymous username
    if (totalClicks === 0) {
      console.log('Skipping score submission: no clicks.')
      return
    }

    // Extract unlocked and activated achievement IDs
    const achievements_unlocked_ids = achievements
      .filter((a) => a.unlocked)
      .map((a) => a.id)
    const achievements_activated_ids = achievements
      .filter((a) => a.activated)
      .map((a) => a.id)

    const scoreData = {
      username: usernameToSubmit,
      total_clicks: totalClicks,
      clicks_per_second: gameStats.clicksPerSecond,
      achievements_unlocked: gameStats.achievementsUnlocked,
      achievements_activated: gameStats.achievementsActivated,
      time_played_seconds: gameStats.timePlayedSeconds,
      country: userCountryInfo.country,
      country_code: userCountryInfo.flag_code,
      flag_emoji: userCountryInfo.flag_emoji,
      // Add the new fields for backend submission
      achievements_unlocked_ids,
      achievements_activated_ids,
    }

    try {
      const response = await api.submitScore(scoreData)
      if (response.success) {
        console.log('Score submitted successfully:', response.data)
        if (response.data?.is_new_record) {
          setScoreAlert({
            message: "🎉 New High Score! You're on the leaderboard!",
            type: 'success',
          })
        } else if (response.data?.score_improved) {
          setScoreAlert({
            message: '📈 Score Improved! Keep climbing!',
            type: 'info',
          })
        }
        fetchLeaderboard() // Refresh leaderboard immediately after submission
      } else {
        console.error('Failed to submit score:', response.error)
        setScoreAlert({
          message: `Failed to submit score: ${response.error}`,
          type: 'error',
        })
      }
    } catch (error) {
      console.error('Error submitting score:', error)
      setScoreAlert({
        message: `Error submitting score: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        type: 'error',
      })
    }
  }, [
    currentUser,
    anonymousUsername, // Added anonymousUsername to dependencies
    totalClicks,
    gameStats,
    achievements,
    userCountryInfo,
    fetchLeaderboard,
  ])

  // Score submission on component unmount or page close
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Submit score for both logged-in and anonymous users if clicks exist
      if (totalClicks > 0) {
        submitGameScore()
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [submitGameScore, totalClicks]) // Removed currentUser from dependencies

  // Score alert timeout
  useEffect(() => {
    if (scoreAlert) {
      const timer = setTimeout(() => {
        setScoreAlert(null)
      }, 5000) // Hide after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [scoreAlert])

  const updateStats = useCallback(() => {
    const currentTime = Date.now()
    const timePlayedSeconds = Math.floor(
      (currentTime - startTimeRef.current) / 1000
    )
    const clicksPerSecond = clickCountRef.current
    clickCountRef.current = 0

    setGameStats((prev) => ({
      totalClicks,
      clicksPerSecond,
      timePlayedSeconds,
      achievementsUnlocked: achievements.filter((a) => a.unlocked).length,
      achievementsActivated: achievements.filter((a) => a.activated).length,
      highestClicksPerSecond: Math.max(
        prev.highestClicksPerSecond,
        clicksPerSecond
      ),
    }))
  }, [totalClicks, achievements])

  async function initializeAchievements(): Promise<Achievement[]> {
    try {
      console.log('Loading achievements from backend...')
      const response = await api.getAchievements()

      if (response.success && response.data) {
        // Convert backend achievements to frontend format
        const backendAchievements = response.data.achievements.map(
          (ach: BackendAchievement) => ({
            ...ach,
            unlocked: false,
            activated: false,
          })
        )

        console.log(
          `Successfully loaded ${backendAchievements.length} achievements from backend`
        )
        return backendAchievements
      } else {
        console.warn('Backend response was not successful:', response.error)
        return getFallbackAchievements()
      }
    } catch (error) {
      console.warn(
        'Error connecting to backend, using fallback achievements:',
        error
      )
      return getFallbackAchievements()
    }
  }

  function getFallbackAchievements(): Achievement[] {
    // Fallback to original predefined achievements if backend fails
    return predefinedAchievements.map((ach) => ({
      ...ach,
      unlocked: false,
      activated: false,
    }))
  }

  function createConfetti(achievement: Achievement) {
    const colors = [
      '#ff6b6b',
      '#4ecdc4',
      '#45b7d1',
      '#96ceb4',
      '#ffeaa7',
      '#dda0dd',
      '#98d8c8',
    ]
    const newConfetti: Confetti[] = []

    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: Math.random(),
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight / 2 - 100,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * -15 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      })
    }

    setConfetti((prev) => [...prev, ...newConfetti])

    // Clear confetti after 5 seconds
    setTimeout(() => {
      setConfetti((prev) =>
        prev.filter((piece) => !newConfetti.includes(piece))
      )
    }, 5000)
  }

  function createFloatingPoint(
    value: number,
    type: FloatingPoint['type'] = 'click'
  ) {
    if (!gameAreaRef.current) return

    const rect = gameAreaRef.current.getBoundingClientRect()
    const newPoint: FloatingPoint = {
      id: Date.now() + Math.random(),
      x: rect.width / 2 + (Math.random() - 0.5) * 200,
      y: rect.height / 2 + (Math.random() - 0.5) * 100,
      value,
      type,
    }

    // FIX: Correctly add the single newPoint object to the array
    setFloatingPoints((prev) => [...prev, newPoint])

    setTimeout(() => {
      setFloatingPoints((prev) => prev.filter((p) => p.id !== newPoint.id))
    }, 2000)
  }

  function handleClick() {
    const currentTime = Date.now()
    const clickValue = Math.floor(clickMultiplier)

    // Play click sound
    playClickSound()

    // Update click streak
    if (currentTime - lastClickTime < 500) {
      setClickStreak((prev) => prev + 1)
    } else {
      setClickStreak(1)
    }
    setLastClickTime(currentTime)

    // Bonus for click streaks
    const bonusMultiplier = Math.min(1 + clickStreak * 0.1, 3)
    const finalValue = Math.floor(clickValue * bonusMultiplier)

    setTotalClicks((prev) => prev + finalValue)
    clickCountRef.current += finalValue

    // Create floating point animation
    createFloatingPoint(finalValue, clickStreak > 5 ? 'bonus' : 'click')
  }

  // Only unlock achievement, don't apply benefits yet
  function unlockAchievement(achievementId: number) {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === achievementId) {
          const updated = { ...ach, unlocked: true }
          setNewAchievement(updated)

          // Create confetti effect
          createConfetti(updated)

          // Hide achievement popup after 4 seconds
          setTimeout(() => setNewAchievement(null), 4000)
          return updated
        }
        return ach
      })
    )
  }

  // New function to activate achievement and apply benefits
  function activateAchievement(achievementId: number) {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === achievementId && ach.unlocked && !ach.activated) {
          const updated = { ...ach, activated: true }

          // Apply click multiplier
          setClickMultiplier(
            (prevMultiplier) => prevMultiplier * ach.clickMultiplier
          )

          // Change theme if achievement has one
          if (updated.theme) {
            setIsThemeChanging(true)
            setTimeout(() => {
              setCurrentTheme({
                primary: updated.theme!.primary,
                secondary: updated.theme!.secondary,
                accent: updated.theme!.accent,
                background: updated.theme!.background,
                bgClass: updated.theme!.bgClass,
              })
              setTimeout(() => setIsThemeChanging(false), 1000)
            }, 200)
          }

          return updated
        }
        return ach
      })
    )
  }

  const handleLogout = useCallback(async () => {
    // Submit current score before logging out
    await submitGameScore()

    try {
      const response = await api.logout()
      if (response.success) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
        localStorage.removeItem('guest_username') // Clear guest username on logout
        setCurrentUser(null)
        setAnonymousUsername(null) // Clear anonymous username state
        // Reset game state to initial anonymous state after logout
        resetProgress(false) // Pass false to prevent another score submission
        router.push('/')
      } else {
        console.error('Logout failed:', response.error)
        // Even if API logout fails, clear local storage for UX
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
        localStorage.removeItem('guest_username') // Clear guest username on logout
        setCurrentUser(null)
        setAnonymousUsername(null) // Clear anonymous username state
        resetProgress(false) // Pass false to prevent another score submission
        router.push('/')
      }
    } catch (error) {
      console.error('Error during logout:', error)
      // Clear local storage on network error too
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      localStorage.removeItem('guest_username') // Clear guest username on logout
      setCurrentUser(null)
      setAnonymousUsername(null) // Clear anonymous username state
      resetProgress(false) // Pass false to prevent another score submission
      router.push('/auth/login')
    }
  }, [router, submitGameScore])

  async function resetProgress(shouldSubmitScore = true) {
    // Clear any active score alerts immediately on reset
    setScoreAlert(null)

    if (shouldSubmitScore && totalClicks > 0) {
      // Only submit current score before resetting if clicks exist
      await submitGameScore()
    }

    setTotalClicks(0)
    setClickMultiplier(1)
    setFloatingPoints([])
    setConfetti([])
    setNewAchievement(null)
    setClickStreak(0)
    setAutoClickerTotal(0)
    setCurrentTheme({
      primary: 'from-blue-400 via-purple-400 to-pink-400',
      secondary: 'purple-500',
      accent: 'purple-400',
      background: 'slate-950',
      bgClass: 'bg-slate-950',
    })
    setGameStats({
      totalClicks: 0,
      clicksPerSecond: 0,
      timePlayedSeconds: 0,
      achievementsUnlocked: 0,
      achievementsActivated: 0,
      highestClicksPerSecond: 0,
    })
    startTimeRef.current = Date.now()
    clickCountRef.current = 0
    localStorage.removeItem('spacebar-clicker-data')
    // Do NOT remove guest_username here, as it should persist across resets for the same guest user

    // Properly reinitialize achievements from backend
    try {
      const freshAchievements = await initializeAchievements()
      setAchievements(freshAchievements)
    } catch (error) {
      console.error('Failed to reinitialize achievements after reset:', error)
      const fallbackAchievements = getFallbackAchievements()
      setAchievements(fallbackAchievements)
    }
  }

  function shareToSocial(platform: string) {
    const text = `I hit the spacebar ${totalClicks.toLocaleString()} times in the Spacebar Clicker Game! 🚀 Can you beat my score?`
    const url = window.location.href

    let shareUrl = ''
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}&quote=${encodeURIComponent(text)}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  // Format number
  function formatNumber(num: number): string {
    if (num == null) {
      return '0' // Or any other default value you prefer
    }
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T'
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
    return num.toLocaleString()
  }

  const currentLevel = achievements.filter((a) => a.activated).length
  const nextAchievement = achievements.find((a) => !a.unlocked)
  const unlockedAchievements = achievements.filter((a) => a.unlocked).reverse()
  const activatedAchievements = achievements
    .filter((a) => a.activated)
    .reverse()
  const unlockedButNotActivated = achievements.filter(
    (a) => a.unlocked && !a.activated
  )
  const upcomingAchievements = achievements
    .filter((a) => !a.unlocked)
    .slice(0, 8)
  const progressPercentage = nextAchievement
    ? Math.min((totalClicks / nextAchievement.unlockAt) * 100, 100)
    : 100

  // Achievement section component - MOVED BELOW MAIN GAME
  const AchievementSection = () => (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {/* Next Achievement Progress */}
      <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
        <CardHeader className='pb-3'>
          <CardTitle className='flex items-center gap-2 text-white'>
            <Target className='h-5 w-5 text-blue-400' />
            Next Achievement
          </CardTitle>
        </CardHeader>
        <CardContent>
          {nextAchievement ? (
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='text-3xl'>{nextAchievement.icon}</div>
                <div className='flex-1'>
                  <div className='font-medium text-white'>
                    {nextAchievement.name}
                  </div>
                  <div className='text-sm text-slate-400'>
                    {nextAchievement.description}
                  </div>
                </div>
              </div>
              <Progress value={progressPercentage} className='h-3' />
              <div className='flex justify-between text-sm text-slate-400'>
                <span>{formatNumber(totalClicks)} clicks</span>
                <span>{formatNumber(nextAchievement.unlockAt)} needed</span>
              </div>
              <div className='text-xs text-slate-500'>
                {nextAchievement.speed > 0 &&
                  `+${nextAchievement.speed}/sec auto-clicker • `}
                +{((nextAchievement.clickMultiplier - 1) * 100).toFixed(0)}%
                multiplier
              </div>
            </div>
          ) : (
            <div className='text-center py-8'>
              <div className='text-4xl mb-2'>🏆</div>
              <div className='text-white font-medium'>
                All achievements unlocked!
              </div>
              <div className='text-slate-400 text-sm'>
                You're a true clicking master!
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Unlocked but Not Activated Achievements */}
      <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
        <CardHeader className='pb-3'>
          <CardTitle className='flex items-center gap-2 text-white'>
            <Play className='h-5 w-5 text-orange-400' />
            Ready to Activate
            <Badge
              variant='secondary'
              className='ml-auto bg-orange-500/20 text-orange-300'
            >
              {unlockedButNotActivated.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className='h-64'>
            <div className='space-y-3'>
              {unlockedButNotActivated.length > 0 ? (
                unlockedButNotActivated.slice(0, 6).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 p-3 bg-gradient-to-r ${
                      rarityColors[achievement.rarity]
                    } bg-opacity-20 border ${
                      rarityBorders[achievement.rarity]
                    } rounded-lg`}
                  >
                    <div className='text-2xl'>{achievement.icon}</div>
                    <div className='flex-1'>
                      <div className='font-medium text-white'>
                        {achievement.name}
                      </div>
                      <div className='text-xs text-slate-300'>
                        {achievement.description}
                      </div>
                      <div className='text-xs text-green-400 mt-1'>
                        {achievement.speed > 0 &&
                          `+${achievement.speed}/sec auto • `}
                        +{((achievement.clickMultiplier - 1) * 100).toFixed(0)}%
                        multiplier
                      </div>
                    </div>
                    <Button
                      size='sm'
                      onClick={() => activateAchievement(achievement.id)}
                      className='bg-green-600 hover:bg-green-700 text-white'
                    >
                      <Play className='h-3 w-3 mr-1' />
                      Activate
                    </Button>
                  </div>
                ))
              ) : (
                <div className='text-center py-8'>
                  <Play className='h-8 w-8 mx-auto mb-2 opacity-50' />
                  <div>No achievements ready</div>
                  <div className='text-sm'>Keep clicking to unlock more!</div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div
      className={`relative min-h-screen w-full transition-all  duration-1000 ${currentTheme.bgClass}`}
    >
      {/* Fixed Dark Grid Background */}
      <div className='fixed inset-0'>
        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      </div>

      {/* Confetti */}
      <div className='fixed inset-0 pointer-events-none z-50'>
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className='absolute opacity-80'
            style={{
              left: piece.x,
              top: piece.y,
              backgroundColor: piece.color,
              transform: `rotate(${piece.rotation}deg)`,
              width: piece.size,
              height: piece.size,
              borderRadius: '2px',
            }}
          />
        ))}
      </div>

      {/* Score Alert */}
      <AnimatePresence>
        {scoreAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 p-3 rounded-lg shadow-lg text-white font-semibold text-center
              ${
                scoreAlert.type === 'success'
                  ? 'bg-green-600'
                  : scoreAlert.type === 'info'
                  ? 'bg-blue-600'
                  : 'bg-red-600'
              }
            `}
          >
            {scoreAlert.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className='relative z-10 min-h-screen'>
        {/* Header */}
        <header className='sticky top-0 z-30 border-b border-slate-800/50 bg-slate-900/20 backdrop-blur-sm'>
          <div className='container mx-auto px-4 py-4'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-3'>
                <motion.div
                  className='text-4xl'
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  ⌨️
                </motion.div>
                <div>
                  <h1
                    className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent transition-all duration-1000`}
                  >
                    Spacebar Clicker
                  </h1>
                  <p className='text-sm text-slate-400'>
                    Level {currentLevel} •{' '}
                    {currentUser?.username || anonymousUsername || 'Anonymous'}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Badge
                  variant='secondary'
                  className='bg-blue-500/20 text-blue-300 border-blue-500/30 hidden sm:inline-flex'
                >
                  {gameStats.clicksPerSecond}/sec
                </Badge>
                <Badge
                  variant='secondary'
                  className='bg-purple-500/20 text-purple-300 border-purple-500/30 hidden sm:inline-flex'
                >
                  {Math.floor(gameStats.timePlayedSeconds / 60)}m
                </Badge>
                <Badge
                  variant='secondary'
                  className='bg-orange-500/20 text-orange-300 border-orange-500/30 hidden sm:inline-flex'
                >
                  {unlockedButNotActivated.length} ready
                </Badge>

                {/* Desktop: Show sound and settings/user buttons */}
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className='border-slate-600 hover:bg-slate-700 bg-slate-800/50 text-slate-300 hover:text-white'
                >
                  {soundEnabled ? (
                    <Volume2 className='h-4 w-4' />
                  ) : (
                    <VolumeX className='h-4 w-4' />
                  )}
                </Button>

                <Dialog open={showSettings} onOpenChange={setShowSettings}>
                  <DialogTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='hidden lg:flex border-slate-600 hover:bg-slate-700 bg-slate-800/50 text-slate-300 hover:text-white'
                    >
                      {currentUser ? (
                        <UserCircle className='h-4 w-4' />
                      ) : (
                        <Settings className='h-4 w-4' />
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='bg-slate-900 border-slate-700'>
                    <DialogHeader>
                      <DialogTitle className='text-white'>
                        Game Settings
                      </DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue='profile' className='w-full'>
                      <TabsList className='grid w-full grid-cols-2 bg-slate-800'>
                        <TabsTrigger value='profile'>Profile</TabsTrigger>
                        <TabsTrigger value='stats'>Statistics</TabsTrigger>
                      </TabsList>
                      <TabsContent value='profile' className='space-y-4'>
                        <div>
                          <label className='text-sm font-medium text-slate-300'>
                            Username
                          </label>
                          <Input
                            value={
                              currentUser?.username ||
                              anonymousUsername ||
                              'Anonymous'
                            }
                            disabled // Username is from backend, not editable here
                            className='bg-slate-800 border-slate-600 text-white'
                          />
                        </div>
                        {currentUser ? (
                          <Button
                            onClick={handleLogout}
                            variant='outline'
                            className='w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 bg-transparent'
                          >
                            <LogOut className='h-4 w-4 mr-2' />
                            Logout
                          </Button>
                        ) : (
                          <Link href='/auth/login' passHref>
                            <Button
                              className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                              onClick={() => setShowSettings(false)}
                            >
                              <LogIn className='h-4 w-4 mr-2' />
                              Login
                            </Button>
                          </Link>
                        )}
                        <Button
                          onClick={() => resetProgress(false)}
                          variant='destructive'
                          className='w-full'
                        >
                          <RotateCcw className='h-4 w-4 mr-2' />
                          Reset All Progress
                        </Button>
                      </TabsContent>
                      <TabsContent value='stats' className='space-y-4'>
                        <div className='grid grid-cols-2 gap-4 text-sm'>
                          <div className='bg-slate-800 p-3 rounded-lg'>
                            <div className='text-slate-400'>Total Clicks</div>
                            <div className='text-xl font-bold text-white'>
                              {formatNumber(totalClicks)}
                            </div>
                          </div>
                          <div className='bg-slate-800 p-3 rounded-lg'>
                            <div className='text-slate-400'>Unlocked</div>
                            <div className='text-xl font-bold text-white'>
                              {gameStats.achievementsUnlocked}
                            </div>
                          </div>
                          <div className='bg-slate-800 p-3 rounded-lg'>
                            <div className='text-slate-400'>Activated</div>
                            <div className='text-xl font-bold text-white'>
                              {gameStats.achievementsActivated}
                            </div>
                          </div>
                          <div className='bg-slate-800 p-3 rounded-lg'>
                            <div className='text-slate-400'>Auto Clicks</div>
                            <div className='text-xl font-bold text-white'>
                              {formatNumber(autoClickerTotal)}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>

                {/* Mobile: Show only menu button (no separate settings) */}
                <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
                  <SheetTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='lg:hidden border-slate-600 hover:bg-slate-700 bg-slate-800/50 text-slate-300 hover:text-white'
                    >
                      <Menu className='h-4 w-4' />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side='right'
                    className='w-80 bg-slate-900 border-slate-700'
                  >
                    <SheetHeader>
                      <SheetTitle className='text-white flex items-center gap-2'>
                        <Menu className='h-5 w-5' />
                        Navigation Menu
                      </SheetTitle>
                    </SheetHeader>

                    <div className='mt-6 space-y-4'>
                      {/* Navigation Links */}
                      <div className='space-y-2'>
                        <Button
                          variant='ghost'
                          className='w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800'
                          onClick={() => setShowMobileMenu(false)}
                        >
                          <Home className='h-4 w-4 mr-3' />
                          Home
                        </Button>

                        <Button
                          variant='ghost'
                          className='w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800'
                          onClick={() => {
                            // Add about page navigation logic here
                            setShowMobileMenu(false)
                          }}
                        >
                          <Info className='h-4 w-4 mr-3' />
                          About
                        </Button>

                        <Button
                          variant='ghost'
                          className='w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800'
                          onClick={() => {
                            // Add contact page navigation logic here
                            setShowMobileMenu(false)
                          }}
                        >
                          <Mail className='h-4 w-4 mr-3' />
                          Contact
                        </Button>

                        <Button
                          variant='ghost'
                          className='w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800'
                          onClick={() => {
                            // Add help page navigation logic here
                            setShowMobileMenu(false)
                          }}
                        >
                          <HelpCircle className='h-4 w-4 mr-3' />
                          Help
                        </Button>
                      </div>

                      <Separator className='bg-slate-700' />

                      {/* User Settings */}
                      <div className='space-y-4'>
                        <div>
                          <label className='text-sm font-medium text-slate-300 block mb-2'>
                            Username
                          </label>
                          <Input
                            value={
                              currentUser?.username ||
                              anonymousUsername ||
                              'Anonymous'
                            }
                            disabled // Username is from backend, not editable here
                            className='bg-slate-800 border-slate-600 text-white'
                          />
                        </div>

                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-slate-300'>
                            Sound Effects
                          </span>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className='border-slate-600 hover:bg-slate-700 bg-slate-800/50 text-slate-300'
                          >
                            {soundEnabled ? (
                              <Volume2 className='h-4 w-4' />
                            ) : (
                              <VolumeX className='h-4 w-4' />
                            )}
                          </Button>
                        </div>

                        {currentUser ? (
                          <Button
                            onClick={() => {
                              handleLogout()
                              setShowMobileMenu(false)
                            }}
                            variant='outline'
                            className='w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300'
                          >
                            <LogOut className='h-4 w-4 mr-2' />
                            Logout
                          </Button>
                        ) : (
                          <Link href='/auth/login' passHref>
                            <Button
                              className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                              onClick={() => setShowMobileMenu(false)}
                            >
                              <LogIn className='h-4 w-4 mr-2' />
                              Login
                            </Button>
                          </Link>
                        )}

                        <Button
                          onClick={() => {
                            resetProgress(false) // Pass false to prevent score submission on manual reset
                            setShowMobileMenu(false)
                          }}
                          variant='destructive'
                          className='w-full'
                        >
                          <RotateCcw className='h-4 w-4 mr-2' />
                          Reset Progress
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>

        {/* Main Game Area */}
        <div className='container mx-auto px-4 py-6'>
          {/* Desktop: 3-Column Layout */}
          <div className='hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:space-y-0 space-y-6'>
            {/* Left Column - Achievements */}
            <div className='lg:col-span-3'>
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm h-fit sticky top-24'>
                <CardHeader className='pb-3'>
                  <CardTitle className='flex items-center gap-2 text-white'>
                    <Trophy className='h-5 w-5 text-yellow-400' />
                    Achievements
                    <Badge
                      variant='secondary'
                      className='ml-auto bg-yellow-500/20 text-yellow-300'
                    >
                      {unlockedAchievements.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className='p-0'>
                  <ScrollArea className='h-[calc(100vh-200px)]'>
                    <div className='p-4 space-y-3'>
                      {/* Next Achievement Progress */}
                      {nextAchievement && (
                        <div className='bg-slate-800/50 p-4 rounded-lg border border-slate-600/30'>
                          <div className='flex items-center gap-3 mb-3'>
                            <div className='text-2xl opacity-60'>
                              {nextAchievement.icon}
                            </div>
                            <div className='flex-1'>
                              <div className='font-medium text-white'>
                                {nextAchievement.name}
                              </div>
                              <div className='text-xs text-slate-400'>
                                {nextAchievement.description}
                              </div>
                            </div>
                          </div>
                          <Progress
                            value={progressPercentage}
                            className='h-2 mb-2'
                          />
                          <div className='text-xs text-slate-400 flex justify-between'>
                            <span>{formatNumber(totalClicks)}</span>
                            <span>
                              {formatNumber(nextAchievement.unlockAt)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Ready to Activate */}
                      {unlockedButNotActivated.length > 0 && (
                        <>
                          <h3 className='text-sm font-semibold text-orange-400 mb-2 flex items-center gap-2'>
                            <Play className='h-4 w-4' />
                            Ready to Activate
                          </h3>
                          {unlockedButNotActivated
                            .slice(0, 3)
                            .map((achievement) => (
                              <div
                                key={achievement.id}
                                className={`flex items-center gap-2 p-3 bg-gradient-to-r ${
                                  rarityColors[achievement.rarity]
                                } bg-opacity-20 border ${
                                  rarityBorders[achievement.rarity]
                                } rounded-lg`}
                              >
                                <div className='text-xl'>
                                  {achievement.icon}
                                </div>
                                <div className='flex-1 min-w-0'>
                                  <div className='font-medium text-white text-sm'>
                                    {achievement.name}
                                  </div>
                                  <div className='text-xs text-slate-300'>
                                    {achievement.description}
                                  </div>
                                  <div className='text-xs text-green-400 mt-1'>
                                    {achievement.speed > 0 &&
                                      `+${achievement.speed}/s • `}
                                    {(
                                      (achievement.clickMultiplier - 1) *
                                      100
                                    ).toFixed(0)}
                                    %
                                  </div>
                                </div>
                                <Button
                                  size='sm'
                                  onClick={() =>
                                    activateAchievement(achievement.id)
                                  }
                                  className='bg-green-600 hover:bg-green-700 text-white px-2 py-1 h-auto text-xs'
                                >
                                  <Play className='h-3 w-3' />
                                </Button>
                              </div>
                            ))}
                          <Separator className='my-4 bg-slate-700' />
                        </>
                      )}

                      {/* Activated Achievements */}
                      {activatedAchievements.length > 0 && (
                        <>
                          <h3 className='text-sm font-semibold text-green-400 mb-2 flex items-center gap-2'>
                            <Check className='h-4 w-4' />
                            Activated
                          </h3>
                          {activatedAchievements
                            .slice(0, 5)
                            .map((achievement) => (
                              <div
                                key={achievement.id}
                                className={`flex items-center gap-3 p-3 bg-gradient-to-r ${
                                  rarityColors[achievement.rarity]
                                } bg-opacity-20 border ${
                                  rarityBorders[achievement.rarity]
                                } rounded-lg`}
                              >
                                <div className='text-2xl'>
                                  {achievement.icon}
                                </div>
                                <div className='flex-1'>
                                  <div className='font-medium text-white'>
                                    {achievement.name}
                                  </div>
                                  <div className='text-xs text-slate-300'>
                                    {achievement.description}
                                  </div>
                                  {achievement.speed > 0 && (
                                    <div className='text-xs text-blue-400 flex items-center gap-1 mt-1'>
                                      <Zap className='h-3 w-3' />
                                      {achievement.speed}/sec auto
                                    </div>
                                  )}
                                </div>
                                <Check className='h-4 w-4 text-green-400' />
                              </div>
                            ))}
                          <Separator className='my-4 bg-slate-700' />
                        </>
                      )}

                      {/* Upcoming Achievements */}
                      <h3 className='text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2'>
                        <Target className='h-4 w-4' />
                        Upcoming
                      </h3>
                      {upcomingAchievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className='flex items-center gap-3 p-3 bg-slate-800/30 border border-slate-600/30 rounded-lg opacity-60 hover:opacity-80 transition-opacity'
                        >
                          <div className='text-2xl grayscale'>
                            {achievement.icon}
                          </div>
                          <div className='flex-1'>
                            <div className='font-medium text-slate-300'>
                              {achievement.name}
                            </div>
                            <div className='text-xs text-slate-400'>
                              {achievement.description}
                            </div>
                            <div className='text-xs text-slate-500 mt-1'>
                              {formatNumber(achievement.unlockAt)} clicks
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Center Column - Main Clicker */}
            <div className='lg:col-span-6'>
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardContent className='p-0'>
                  <div
                    ref={gameAreaRef}
                    className='relative flex flex-col items-center justify-center cursor-pointer select-none group min-h-[500px] sm:min-h-[600px] py-8'
                    onClick={handleClick}
                  >
                    {/* Click Streak Indicator */}
                    {clickStreak > 3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='absolute top-8 left-1/2 transform -translate-x-1/2 z-10'
                      >
                        <Badge className='bg-orange-500/20 text-orange-300 border-orange-500/30'>
                          <Flame className='h-3 w-3 mr-1' />
                          {clickStreak}x Streak!
                        </Badge>
                      </motion.div>
                    )}

                    {/* Main Counter - Fixed Width Container */}
                    <motion.div
                      key={Math.floor(totalClicks / 1000)}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.1 }}
                      className='text-center mb-8'
                    >
                      <div className='relative'>
                        <div className='min-w-[280px] sm:min-w-[400px] lg:min-w-[500px] mx-auto'>
                          <div
                            className={`text-4xl sm:text-6xl lg:text-8xl font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent mb-4 group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-blue-400 transition-all duration-300 font-mono`}
                          >
                            {formatNumber(totalClicks)}
                          </div>
                        </div>
                      </div>
                      <div className='text-lg text-slate-400'>Total Clicks</div>
                    </motion.div>

                    {/* Stats Row */}
                    <div className='flex flex-wrap justify-center gap-4 mb-8'>
                      <div className='text-center bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600/30'>
                        <div className='text-xl sm:text-2xl font-semibold text-yellow-400'>
                          {clickMultiplier.toFixed(1)}x
                        </div>
                        <div className='text-xs sm:text-sm text-slate-400'>
                          Multiplier
                        </div>
                      </div>
                      <div className='text-center bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600/30'>
                        <div className='text-xl sm:text-2xl font-semibold text-green-400'>
                          {gameStats.clicksPerSecond}
                        </div>
                        <div className='text-xs sm:text-sm text-slate-400'>
                          Clicks/sec
                        </div>
                      </div>
                      <div className='text-center bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600/30'>
                        <div className='text-xl sm:text-2xl font-semibold text-blue-400'>
                          {achievements
                            .filter((a) => a.activated && a.speed > 0)
                            .reduce((sum, a) => sum + a.speed, 0)
                            .toFixed(1)}
                        </div>
                        <div className='text-xs sm:text-sm text-slate-400'>
                          Auto/sec
                        </div>
                      </div>
                    </div>

                    {/* Spacebar Instruction */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className='text-center'
                    >
                      <div className='text-lg sm:text-xl font-medium mb-4 text-slate-300'>
                        Press SPACEBAR or Click!
                      </div>
                      <motion.div
                        className='text-4xl sm:text-6xl mb-4'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ⌨️
                      </motion.div>
                      <div className='text-sm text-slate-500'>
                        {clickStreak > 1
                          ? `${clickStreak}x streak bonus active!`
                          : 'Click rapidly for streak bonuses!'}
                      </div>
                    </motion.div>

                    {/* Floating Points */}
                    <AnimatePresence>
                      {floatingPoints.map((point) => (
                        <motion.div
                          key={point.id}
                          initial={{ opacity: 1, y: 0, scale: 1 }}
                          animate={{
                            opacity: 0,
                            y: -150,
                            scale: point.type === 'bonus' ? 1.5 : 1.2,
                            x: point.type === 'auto' ? [0, 20, -20, 0] : 0,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 2 }}
                          className={`absolute pointer-events-none text-xl sm:text-2xl font-bold ${
                            point.type === 'bonus'
                              ? 'text-orange-400'
                              : point.type === 'auto'
                              ? 'text-blue-400'
                              : 'text-green-400'
                          }`}
                          style={{ left: point.x, top: point.y }}
                        >
                          +{formatNumber(point.value)}
                          {point.type === 'bonus' && '🔥'}
                          {point.type === 'auto' && '⚡'}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Leaderboard & Social */}
            <div className='lg:col-span-3 space-y-6'>
              {/* Leaderboard */}
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader className='pb-3'>
                  <CardTitle className='flex items-center gap-2 text-white'>
                    <Users className='h-5 w-5 text-blue-400' />
                    Global Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className='h-64'>
                    <div className='space-y-2'>
                      {leaderboardLoading ? (
                        <div className='text-center py-8'>
                          <div className='w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2'></div>
                          <div className='text-slate-400'>
                            Loading leaderboard...
                          </div>
                        </div>
                      ) : leaderboardData.length > 0 ? (
                        leaderboardData.slice(0, 5).map(
                          (
                            entry,
                            index // Changed to slice(0, 5) for top 5
                          ) => (
                            <motion.div
                              key={entry.id}
                              className='flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-600/20 hover:bg-slate-700/30 transition-colors'
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className='flex items-center gap-2 min-w-0'>
                                {index === 0 && (
                                  <Crown className='h-4 w-4 text-yellow-400 flex-shrink-0' />
                                )}
                                <span className='text-sm font-bold text-slate-300 flex-shrink-0'>
                                  #{entry.rank || index + 1}
                                </span>
                              </div>
                              <div className='flex-1 min-w-0'>
                                <div className='font-medium text-sm text-white truncate flex items-center gap-2'>
                                  {entry.username}
                                  {entry.is_verified && (
                                    <Badge
                                      variant='secondary'
                                      className='bg-green-500/20 text-green-300 border-green-500/30 text-xs px-1 py-0'
                                    >
                                      ✓
                                    </Badge>
                                  )}
                                </div>
                                <div className='text-xs text-slate-400'>
                                  {formatNumber(entry.total_clicks)} •{' '}
                                  {entry.clicks_per_second}/sec
                                </div>
                              </div>
                              <div className='text-lg flex-shrink-0'>
                                {entry.flag_emoji}
                              </div>
                            </motion.div>
                          )
                        )
                      ) : (
                        <div className='text-center py-8'>
                          <Users className='h-12 w-12 mx-auto mb-4 opacity-50' />
                          <p className='text-slate-500'>No players yet!</p>
                          <p className='text-sm text-slate-400'>
                            Be the first to click!
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader className='pb-3'>
                  <CardTitle className='flex items-center gap-2 text-white'>
                    <Crown className='h-5 w-5 text-yellow-400' />
                    Global High Score
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                  {highScoreData ? (
                    <div className='space-y-2'>
                      <div className='text-4xl font-bold text-yellow-300'>
                        {formatNumber(highScoreData.total_clicks)}
                      </div>
                      <div className='text-lg text-slate-300 flex items-center justify-center gap-2'>
                        <span className='font-semibold'>
                          {highScoreData.username || 'Anonymous'}
                        </span>
                        {highScoreData.is_verified && (
                          <Badge
                            variant='secondary'
                            className='bg-green-500/20 text-green-300 border-green-500/30 text-xs px-1 py-0'
                          >
                            ✓
                          </Badge>
                        )}
                        {highScoreData.flag_emoji && (
                          <span className='text-xl'>
                            {highScoreData.flag_emoji}
                          </span>
                        )}
                      </div>
                      <div className='text-sm text-slate-400'>
                        Current record holder
                      </div>
                    </div>
                  ) : (
                    <div className='text-slate-400 py-4'>
                      <div className='w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-2'></div>
                      Loading high score...
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Social Sharing */}
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader className='pb-3'>
                  <CardTitle className='flex items-center gap-2 text-white'>
                    <Share2 className='h-5 w-5 text-green-400' />
                    Share Your Score
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => shareToSocial('twitter')}
                      className='w-full bg-blue-500 hover:bg-blue-600 text-white'
                    >
                      Share on Twitter
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => shareToSocial('facebook')}
                      className='w-full bg-blue-600 hover:bg-blue-700 text-white'
                    >
                      Share on Facebook
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => shareToSocial('whatsapp')}
                      className='w-full bg-green-600 hover:bg-green-700 text-white'
                    >
                      Share on WhatsApp
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mobile: Single Column Layout */}
          <div className='lg:hidden space-y-6'>
            {/* Main Clicker */}
            <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
              <CardContent className='p-0'>
                <div
                  ref={gameAreaRef}
                  className='relative flex flex-col items-center justify-center cursor-pointer select-none group min-h-[500px] sm:min-h-[600px] py-8'
                  onClick={handleClick}
                >
                  {/* Click Streak Indicator */}
                  {clickStreak > 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className='absolute top-8 left-1/2 transform -translate-x-1/2 z-10'
                    >
                      <Badge className='bg-orange-500/20 text-orange-300 border-orange-500/30'>
                        <Flame className='h-3 w-3 mr-1' />
                        {clickStreak}x Streak!
                      </Badge>
                    </motion.div>
                  )}

                  {/* Main Counter - Fixed Width Container */}
                  <motion.div
                    key={Math.floor(totalClicks / 1000)}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.1 }}
                    className='text-center mb-8'
                  >
                    <div className='relative'>
                      <div className='min-w-[280px] sm:min-w-[400px] lg:min-w-[500px] mx-auto'>
                        <div
                          className={`text-4xl sm:text-6xl lg:text-8xl font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent mb-4 group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-blue-400 transition-all duration-300 font-mono`}
                        >
                          {formatNumber(totalClicks)}
                        </div>
                      </div>
                    </div>
                    <div className='text-lg text-slate-400'>Total Clicks</div>
                  </motion.div>

                  {/* Stats Row */}
                  <div className='flex flex-wrap justify-center gap-4 mb-8'>
                    <div className='text-center bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600/30'>
                      <div className='text-xl sm:text-2xl font-semibold text-yellow-400'>
                        {clickMultiplier.toFixed(1)}x
                      </div>
                      <div className='text-xs sm:text-sm text-slate-400'>
                        Multiplier
                      </div>
                    </div>
                    <div className='text-center bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600/30'>
                      <div className='text-xl sm:text-2xl font-semibold text-green-400'>
                        {gameStats.clicksPerSecond}
                      </div>
                      <div className='text-xs sm:text-sm text-slate-400'>
                        Clicks/sec
                      </div>
                    </div>
                    <div className='text-center bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600/30'>
                      <div className='text-xl sm:text-2xl font-semibold text-blue-400'>
                        {achievements
                          .filter((a) => a.activated && a.speed > 0)
                          .reduce((sum, a) => sum + a.speed, 0)
                          .toFixed(1)}
                      </div>
                      <div className='text-xs sm:text-sm text-slate-400'>
                        Auto/sec
                      </div>
                    </div>
                  </div>

                  {/* Spacebar Instruction */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className='text-center'
                  >
                    <div className='text-lg sm:text-xl font-medium mb-4 text-slate-300'>
                      Press SPACEBAR or Click!
                    </div>
                    <motion.div
                      className='text-4xl sm:text-6xl mb-4'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ⌨️
                    </motion.div>
                    <div className='text-sm text-slate-500'>
                      {clickStreak > 1
                        ? `${clickStreak}x streak bonus active!`
                        : 'Click rapidly for streak bonuses!'}
                    </div>
                  </motion.div>

                  {/* Floating Points */}
                  <AnimatePresence>
                    {floatingPoints.map((point) => (
                      <motion.div
                        key={point.id}
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={{
                          opacity: 0,
                          y: -150,
                          scale: point.type === 'bonus' ? 1.5 : 1.2,
                          x: point.type === 'auto' ? [0, 20, -20, 0] : 0,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        className={`absolute pointer-events-none text-xl sm:text-2xl font-bold ${
                          point.type === 'bonus'
                            ? 'text-orange-400'
                            : point.type === 'auto'
                            ? 'text-blue-400'
                            : 'text-green-400'
                        }`}
                        style={{ left: point.x, top: point.y }}
                      >
                        +{formatNumber(point.value)}
                        {point.type === 'bonus' && '🔥'}
                        {point.type === 'auto' && '⚡'}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Section - MOVED BELOW MAIN GAME */}
            {<AchievementSection />}

            {/* Leaderboard & Social Section */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Leaderboard */}
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader className='pb-3'>
                  <CardTitle className='flex items-center gap-2 text-white'>
                    <Users className='h-5 w-5 text-blue-400' />
                    Global Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className='h-64'>
                    <div className='space-y-2'>
                      {leaderboardLoading ? (
                        <div className='text-center py-8'>
                          <div className='w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2'></div>
                          <div className='text-slate-400'>
                            Loading leaderboard...
                          </div>
                        </div>
                      ) : leaderboardData.length > 0 ? (
                        leaderboardData.slice(0, 5).map(
                          (
                            entry,
                            index // Changed to slice(0, 5) for top 5
                          ) => (
                            <motion.div
                              key={entry.id}
                              className='flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-600/20 hover:bg-slate-700/30 transition-colors'
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className='flex items-center gap-2 min-w-0'>
                                {index === 0 && (
                                  <Crown className='h-4 w-4 text-yellow-400 flex-shrink-0' />
                                )}
                                <span className='text-sm font-bold text-slate-300 flex-shrink-0'>
                                  #{entry.rank || index + 1}
                                </span>
                              </div>
                              <div className='flex-1 min-w-0'>
                                <div className='font-medium text-sm text-white truncate flex items-center gap-2'>
                                  {entry.username}
                                  {entry.is_verified && (
                                    <Badge
                                      variant='secondary'
                                      className='bg-green-500/20 text-green-300 border-green-500/30 text-xs px-1 py-0'
                                    >
                                      ✓
                                    </Badge>
                                  )}
                                </div>
                                <div className='text-xs text-slate-400'>
                                  {formatNumber(entry.total_clicks)} •{' '}
                                  {entry.clicks_per_second}/sec
                                </div>
                              </div>
                              <div className='text-lg flex-shrink-0'>
                                {entry.flag_emoji}
                              </div>
                            </motion.div>
                          )
                        )
                      ) : (
                        <div className='text-center py-8'>
                          <Users className='h-12 w-12 mx-auto mb-4 opacity-50' />
                          <p className='text-slate-500'>No players yet!</p>
                          <p className='text-sm text-slate-400'>
                            Be the first to click!
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Social Sharing */}
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm'>
                <CardHeader className='pb-3'>
                  <CardTitle className='flex items-center gap-2 text-white'>
                    <Share2 className='h-5 w-5 text-green-400' />
                    Share Your Score
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => shareToSocial('twitter')}
                      className='w-full bg-blue-500 hover:bg-blue-600 text-white'
                    >
                      Share on Twitter
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => shareToSocial('facebook')}
                      className='w-full bg-blue-600 hover:bg-blue-700 text-white'
                    >
                      Share on Facebook
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => shareToSocial('whatsapp')}
                      className='w-full bg-green-600 hover:bg-green-700 text-white'
                    >
                      Share on WhatsApp
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Homepage Content Section */}
        <section className='mt-16 space-y-16 container mx-auto px-4 pb-4'>
          {/* Hero Content */}
          <div className='text-center space-y-6'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
            >
              Master the Art of Clicking
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='text-xl text-slate-300 max-w-3xl mx-auto'
            >
              Challenge yourself in the ultimate test of speed and endurance.
              Unlock powerful achievements, compete globally, and become the
              clicking champion you were meant to be.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className='bg-slate-900/40 border-slate-700/50 backdrop-blur-sm h-full'>
                <CardContent className='p-6 text-center'>
                  <Trophy className='h-12 w-12 text-yellow-400 mx-auto mb-4' />
                  <h3 className='text-xl font-semibold text-white mb-2'>
                    20+ Achievements
                  </h3>
                  <p className='text-slate-400'>
                    Unlock powerful achievements with unique multipliers and
                    auto-clickers
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
                <CardContent className='p-6 text-center'>
                  <Users className='h-12 w-12 text-blue-400 mx-auto mb-4' />
                  <h3 className='text-xl font-semibold text-white mb-2'>
                    Global Competition
                  </h3>
                  <p className='text-slate-400'>
                    Compete with players worldwide on our real-time leaderboard
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
                <CardContent className='p-6 text-center'>
                  <Zap className='h-12 w-12 text-green-400 mx-auto mb-4' />
                  <h3 className='text-xl font-semibold text-white mb-2'>
                    Endless Fun
                  </h3>
                  <p className='text-slate-400'>
                    Enjoy hours of addictive gameplay with satisfying click
                    mechanics
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* How It Works Section */}
          <HowItWorksSection />
        </section>
      </div>

      {/* Footer */}
      <Footer />

      {/* New Achievement Toast */}
      <AnimatePresence>
        {newAchievement && (
          <motion.div
            key={newAchievement.id}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className='fixed bottom-4 left-4 z-50 bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm rounded-lg shadow-lg p-4 flex items-center gap-3'
          >
            <div className='text-3xl'>{newAchievement.icon}</div>
            <div>
              <div className='font-medium text-white'>
                Achievement Unlocked!
              </div>
              <div className='text-sm text-slate-400'>
                {newAchievement.name} - {newAchievement.description}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
