export class Vehicle {
  constructor({
    id = '',
    userId = '',
    brand = '',
    model = '',
    year = '',
    licensePlate = '',
    mileage = 0,
    lastMaintenance = '',
    nextMaintenance = '',
    status = '',
  }) {
    this.id = id
    this.userId = userId
    this.brand = brand
    this.model = model
    this.year = year
    this.licensePlate = licensePlate
    this.mileage = mileage
    this.lastMaintenance = lastMaintenance
    this.nextMaintenance = nextMaintenance
    this.status = status
  }
}
