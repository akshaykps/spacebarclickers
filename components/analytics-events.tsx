'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: object) => void
  }
}

export function trackEvent(eventName: string, parameters?: object) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'Game',
      event_label: 'Spacebar Clicker',
      ...parameters,
    })
  }
}

export function trackGameStart() {
  trackEvent('game_start', {
    event_category: 'Game',
    event_label: 'Game Started',
  })
}

export function trackAchievementUnlock(achievementName: string) {
  trackEvent('achievement_unlock', {
    event_category: 'Achievement',
    event_label: achievementName,
    achievement_name: achievementName,
  })
}

export function trackScoreSubmit(score: number) {
  trackEvent('score_submit', {
    event_category: 'Score',
    event_label: 'Score Submitted',
    value: score,
  })
}

export function trackLeaderboardView() {
  trackEvent('leaderboard_view', {
    event_category: 'Navigation',
    event_label: 'Leaderboard Viewed',
  })
}

export function trackSocialShare(platform: string) {
  trackEvent('social_share', {
    event_category: 'Social',
    event_label: platform,
    platform: platform,
  })
}

// Auto-track page views
export function usePageTracking() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [])
}
