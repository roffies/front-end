export class AuthAssembler {
  static toUserFromResponse(response) {
    if (response.status !== 200 && response.status !== 201) {
      console.error(`Auth error: ${response.status}`)
      return null
    }
    
    const userData = response.data
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      avatar: userData.avatar,
      rating: userData.rating,
      memberSince: userData.memberSince,
    }
  }

  static toLoginResponse(response) {
    if (response.status !== 200 && response.status !== 201) {
      return {
        success: false,
        message: 'Invalid credentials',
      }
    }
    
    const { accessToken, user } = response.data
    
    return {
      success: true,
      user: user,
      accessToken: accessToken,
      message: 'Login successful',
    }
  }

  static toRegisterResponse(response) {
    if (response.status !== 200 && response.status !== 201) {
      return {
        success: false,
        message: 'Registration failed',
      }
    }
    
    const { accessToken, user } = response.data
    
    return {
      success: true,
      user: user,
      accessToken: accessToken,
      message: 'Registration successful',
    }
  }
}
