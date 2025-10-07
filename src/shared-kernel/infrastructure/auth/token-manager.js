export class TokenManager {
  static TOKEN_KEY = 'accessToken'
  static USER_KEY = 'user'

  static setToken(token) {
    if (!token) {
      console.warn('TokenManager: Attempted to set null/undefined token')
      return
    }
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  static getToken() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static setUser(user) {
    if (!user) {
      console.warn('TokenManager: Attempted to set null/undefined user')
      return
    }
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  static getUser() {
    const userData = localStorage.getItem(this.USER_KEY)
    if (!userData) return null

    try {
      return JSON.parse(userData)
    } catch (error) {
      console.error('TokenManager: Error parsing user data', error)
      return null
    }
  }

  static clearAuth() {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  static isAuthenticated() {
    const token = this.getToken()
    const user = this.getUser()
    return !!(token && user?.id)
  }

  static getUserRole() {
    const user = this.getUser()
    return user?.role || null
  }

  static isTokenExpired() {
    const token = this.getToken()
    if (!token) return true

    // TODO: Implement JWT decoding and expiration check
    return false
  }
}
