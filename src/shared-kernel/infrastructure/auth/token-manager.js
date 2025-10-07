/**
 * TokenManager - Technical authentication token management
 * This is infrastructure/technical code, not business logic
 * Handles localStorage operations for tokens and user data
 */
export class TokenManager {
  static TOKEN_KEY = 'accessToken'
  static USER_KEY = 'user'

  /**
   * Store authentication token
   * @param {string} token - JWT or access token
   */
  static setToken(token) {
    if (!token) {
      console.warn('TokenManager: Attempted to set null/undefined token')
      return
    }
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  /**
   * Retrieve authentication token
   * @returns {string|null} - Token or null if not found
   */
  static getToken() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  /**
   * Store user data
   * @param {Object} user - User object to store
   */
  static setUser(user) {
    if (!user) {
      console.warn('TokenManager: Attempted to set null/undefined user')
      return
    }
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  /**
   * Retrieve user data
   * @returns {Object|null} - User object or null if not found
   */
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

  /**
   * Remove all authentication data
   */
  static clearAuth() {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if token exists
   */
  static isAuthenticated() {
    const token = this.getToken()
    const user = this.getUser()
    return !!(token && user?.id)
  }

  /**
   * Get user role
   * @returns {string|null} - User role or null
   */
  static getUserRole() {
    const user = this.getUser()
    return user?.role || null
  }

  /**
   * Check if token is expired (basic check)
   * Note: This is a simple implementation. For production,
   * you should decode JWT and check exp claim
   * @returns {boolean} - True if token appears expired
   */
  static isTokenExpired() {
    const token = this.getToken()
    if (!token) return true

    // TODO: Implement JWT decoding and expiration check
    // For now, just check if token exists
    return false
  }
}
