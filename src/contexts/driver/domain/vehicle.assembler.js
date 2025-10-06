import { Vehicle } from './vehicle.entity.js'

export class VehicleAssembler {
  static toEntitiesFromResponse(response) {
    if (response.status !== 200) {
      console.error(`${response.status}, ${response.code}, ${response.message}`)
      return []
    }
    const vehiclesResponse = response.data
    return vehiclesResponse.map((vehicle) => this.toEntityFromResource(vehicle))
  }

  static toEntityFromResource(resource) {
    return new Vehicle({
      id: resource.id,
      userId: resource.userId,
      brand: resource.brand,
      model: resource.model,
      year: resource.year,
      licensePlate: resource.licensePlate,
      mileage: resource.mileage,
      lastMaintenance: resource.lastMaintenance,
      nextMaintenance: resource.nextMaintenance,
      status: resource.status,
    })
  }
}
