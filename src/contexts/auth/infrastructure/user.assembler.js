import { User } from '../domain/user.entity.js'

export class UserAssembler {
  static toEntitiesFromResponse(response) {
    if (response.status !== 200) {
      console.error(`User API error: ${response.status}`)
      return []
    }
    const usersResponse = response.data
    return usersResponse.map((user) => this.toEntityFromResource(user))
  }

  static toEntityFromResource(resource) {
    return new User({
      id: resource.id,
      name: resource.name,
      email: resource.email,
      phone: resource.phone,
      role: resource.role,
      avatar: resource.avatar,
      rating: resource.rating,
      memberSince: resource.memberSince,
      createdAt: resource.createdAt,
    })
  }
}
