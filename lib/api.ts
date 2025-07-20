const API_BASE_URL_DEFAULT =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'https://freeinvoice.pro/api'

export interface BackendAchievement {
  id: number
  name: string
  description: string
  unlockAt: number
  speed: number
  clickMultiplier: number
  unlocked: boolean
  activated: boolean
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

export interface User {
  id: number
  username: string
  email: string
  country: string
  country_code: string
  flag_emoji: string
  is_verified: boolean
  created_at: string
}

export interface LeaderboardEntry {
  id: number
  username: string
  total_clicks: number
  clicks_per_second: number
  achievements_unlocked: number
  achievements_activated: number
  time_played_seconds: number
  country: string
  country_code: string
  flag_emoji: string
  is_verified: boolean
  rank: number
  created_at: string
  updated_at: string
  achievements_unlocked_ids?: number[]
  achievements_activated_ids?: number[]
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export async function getUserCountry(): Promise<{
  country: string
  country_code: string
  flag_emoji: string
}> {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()

    const flagEmoji = getFlagEmoji(data.country_code)

    return {
      country: data.country_name || 'Unknown',
      country_code: data.country_code || 'XX',
      flag_emoji: flagEmoji,
    }
  } catch (error) {
    console.error('Failed to get user country:', error)
    return {
      country: 'Unknown',
      country_code: 'XX',
      flag_emoji: '🌍',
    }
  }
}

function getFlagEmoji(countryCode: string): string {
  const flagMap: { [key: string]: string } = {
    US: '🇺🇸',
    GB: '🇬🇧',
    CA: '🇨🇦',
    AU: '🇦🇺',
    DE: '🇩🇪',
    FR: '🇫🇷',
    JP: '🇯🇵',
    KR: '🇰🇷',
    CN: '🇨🇳',
    IN: '🇮🇳',
    BR: '🇧🇷',
    MX: '🇲🇽',
    ES: '🇪🇸',
    IT: '🇮🇹',
    RU: '🇷🇺',
    NL: '🇳🇱',
    SE: '🇸🇪',
    NO: '🇳🇴',
    DK: '🇩🇰',
    FI: '🇫🇮',
    PL: '🇵🇱',
    TR: '🇹🇷',
    SA: '🇸🇦',
    AE: '🇦🇪',
    SG: '🇸🇬',
    TH: '🇹🇭',
    VN: '🇻🇳',
    PH: '🇵🇭',
    ID: '🇮🇩',
    MY: '🇲🇾',
    ZA: '🇿🇦',
    EG: '🇪🇬',
    NG: '🇳🇬',
    KE: '🇰🇪',
    AR: '🇦🇷',
    CL: '🇨🇱',
    CO: '🇨🇴',
    PE: '🇵🇪',
    VE: '🇻🇪',
    UY: '🇺🇾',
  }
  return flagMap[countryCode] || '🌍'
}

class API {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token')
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Token ${token}` }),
    }
  }

  private getCleanBaseUrl(): string {
    let baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || API_BASE_URL_DEFAULT
    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1)
    }
    return baseUrl
  }

  private getCleanEndpoint(endpoint: string): string {
    if (!endpoint.startsWith('/')) {
      endpoint = `/${endpoint}`
    }
    return endpoint
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const fullUrl = `${this.getCleanBaseUrl()}${this.getCleanEndpoint(
      endpoint
    )}`

    // Enhanced logging for localhost development
    if (process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true') {
      console.log(`🔗 API Request: ${options.method || 'GET'} ${fullUrl}`)
    }

    try {
      const response = await fetch(fullUrl, {
        headers: this.getAuthHeaders(),
        mode: 'cors', // Enable CORS for localhost
        credentials: 'include', // Include cookies for localhost
        ...options,
      })

      let data: any = null
      const contentType = response.headers.get('content-type')

      if (
        response.ok &&
        contentType &&
        contentType.includes('application/json')
      ) {
        try {
          data = await response.json()
        } catch (jsonError) {
          console.error(
            'Failed to parse JSON response (even though content-type was json):',
            jsonError
          )
          return {
            success: false,
            error:
              'Invalid JSON response from server. Check server logs for details.',
          }
        }
      } else if (!response.ok) {
        let errorText = `HTTP error! status: ${response.status}`
        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json()
            errorText = errorData.message || errorData.detail || errorText
          } catch (jsonError) {
            const text = await response.text()
            errorText = `Server error (status: ${
              response.status
            }). Response was not parsable JSON: ${text.substring(0, 100)}${
              text.length > 100 ? '...' : ''
            }`
          }
        } else {
          const text = await response.text()
          errorText = `Server error (status: ${
            response.status
          }). Response was not JSON: ${text.substring(0, 100)}${
            text.length > 100 ? '...' : ''
          }`
        }
        console.warn(`❌ API request failed for ${endpoint}:`, errorText)
        return {
          success: false,
          error: errorText,
        }
      } else {
        const text = await response.text()
        console.warn(
          `⚠️ Unexpected non-JSON success response for ${endpoint}:`,
          text
        )
        return {
          success: true,
          data: text as T,
          message: `Successful non-JSON response.`,
        }
      }

      if (process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true') {
        console.log(`✅ API Response: ${endpoint}`, data)
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error('💥 API request failed:', error)

      // Enhanced error handling for localhost development
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          success: false,
          error: `Cannot connect to backend at ${this.getCleanBaseUrl()}. Make sure your backend server is running on the correct port.`,
        }
      }

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Unknown network error occurred',
      }
    }
  }

  async getAchievements(): Promise<
    ApiResponse<{ achievements: BackendAchievement[]; count: number }>
  > {
    return this.request<{ achievements: BackendAchievement[]; count: number }>(
      '/achievements/'
    )
  }

  async register(userData: {
    username: string
    email: string
    password: string
    password_confirm: string
    country: string
    country_code: string
    flag_emoji: string
  }): Promise<ApiResponse<{ token: string; user: User }>> {
    return this.request<{ token: string; user: User }>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async login(credentials: {
    email: string
    password: string
  }): Promise<ApiResponse<{ token: string; user: User }>> {
    return this.request<{ token: string; user: User }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async logout(): Promise<ApiResponse<void>> {
    const result = await this.request<void>('/auth/logout/', {
      method: 'POST',
    })
    if (result.success) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
    return result
  }

  async getProfile(): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/auth/profile/')
  }

  async checkUsername(
    username: string
  ): Promise<ApiResponse<{ available: boolean }>> {
    return this.request<{ available: boolean }>('/auth/check-username/', {
      method: 'POST',
      body: JSON.stringify({ username }),
    })
  }

  async checkEmail(
    email: string
  ): Promise<ApiResponse<{ available: boolean }>> {
    return this.request<{ available: boolean }>('/auth/check-email/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async getLeaderboard(): Promise<
    ApiResponse<{ leaderboard: LeaderboardEntry[]; count: number }>
  > {
    return this.request<{ leaderboard: LeaderboardEntry[]; count: number }>(
      '/leaderboard/',
      {
        cache: 'no-store',
      }
    )
  }

  async submitScore(scoreData: {
    username: string
    total_clicks: number
    clicks_per_second: number
    achievements_unlocked: number
    achievements_activated: number
    time_played_seconds: number
    country?: string
    country_code?: string
    flag_emoji?: string
    achievements_unlocked_ids?: number[]
    achievements_activated_ids?: number[]
  }): Promise<
    ApiResponse<{
      entry: LeaderboardEntry
      is_new_record: boolean
      score_improved: boolean
      rank: number
      created: boolean
    }>
  > {
    return this.request<{
      entry: LeaderboardEntry
      is_new_record: boolean
      score_improved: boolean
      rank: number
      created: boolean
    }>('/leaderboard/submit/', {
      method: 'POST',
      body: JSON.stringify(scoreData),
    })
  }

  async getHighScore(): Promise<
    ApiResponse<{
      high_score: number
      holder: string | null
      country: string
      flag_emoji: string
      is_verified: boolean
    }>
  > {
    return this.request<{
      high_score: number
      holder: string | null
      country: string
      flag_emoji: string
      is_verified: boolean
    }>('/leaderboard/high-score/')
  }

  async getMyScore(): Promise<ApiResponse<{ entry: LeaderboardEntry }>> {
    return this.request<{ entry: LeaderboardEntry }>('/leaderboard/my-score/')
  }
}

export const api = new API()

export const achievementAPI = {
  getAchievements: () => api.getAchievements(),
}
