import { Appointment } from './appointment.entity.js'

export class AppointmentAssembler {
  static toEntitiesFromResponse(response) {
    if (response.status !== 200) {
      console.error(`${response.status}, ${response.code}, ${response.message}`)
      return []
    }
    const appointmentsResponse = response.data
    return appointmentsResponse.map((appointment) => this.toEntityFromResource(appointment))
  }

  static toEntityFromResource(resource) {
    return new Appointment({
      id: resource.id,
      userId: resource.userId,
      workshopId: resource.workshopId,
      vehicleId: resource.vehicleId,
      service: resource.service,
      date: resource.date,
      time: resource.time,
      status: resource.status,
      estimatedDuration: resource.estimatedDuration,
      estimatedCost: resource.estimatedCost,
      notes: resource.notes,
    })
  }
}
