const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

class API {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private getAuthHeaders(): HeadersInit {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: this.getAuthHeaders(),
        ...options,
      })

      let data: any = null
      const contentType = response.headers.get('content-type')

      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json()
        } catch (jsonError) {
          console.error('Failed to parse JSON response:', jsonError)
          return {
            success: false,
            error: 'Invalid JSON response from server',
          }
        }
      } else {
        // If not JSON, read as text to get potential error message
        const text = await response.text()
        console.warn(`Non-JSON response for ${endpoint}:`, text)
        return {
          success: false,
          error: `Server responded with non-JSON content (status: ${
            response.status
          }): ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`,
        }
      }

      if (!response.ok) {
        return {
          success: false,
          error:
            data?.message ||
            data?.detail ||
            `HTTP error! status: ${response.status}`,
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error('API request failed:', error)
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  public async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  public async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export default API
