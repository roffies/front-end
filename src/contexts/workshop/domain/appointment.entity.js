export class Appointment {
  constructor({
    id = '',
    userId = '',
    workshopId = '',
    vehicleId = '',
    service = '',
    date = '',
    time = '',
    status = '',
    estimatedDuration = 0,
    estimatedCost = 0,
    notes = '',
  }) {
    this.id = id
    this.userId = userId
    this.workshopId = workshopId
    this.vehicleId = vehicleId
    this.service = service
    this.date = date
    this.time = time
    this.status = status
    this.estimatedDuration = estimatedDuration
    this.estimatedCost = estimatedCost
    this.notes = notes
  }
}
