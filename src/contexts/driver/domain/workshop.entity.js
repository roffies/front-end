export class Workshop {
  constructor({
                id,
                name,
                address,
                phone,
                email,
                rating,
                services,
                hours,
                latitude,
                longitude,
                status,
              }) {
    this.id = id
    this.name = name
    this.address = address
    this.phone = phone
    this.email = email
    this.rating = rating
    this.services = services
    this.hours = hours
    this.latitude = latitude
    this.longitude = longitude
    this.status = status
  }
}
