export class User {
  constructor({
    id = '',
    name = '',
    email = '',
    phone = '',
    role = '',
    avatar = '',
    rating = 0,
    memberSince = '',
    createdAt = '',
  }) {
    this.id = id
    this.name = name
    this.email = email
    this.phone = phone
    this.role = role
    this.avatar = avatar
    this.rating = rating
    this.memberSince = memberSince
    this.createdAt = createdAt
  }
}
