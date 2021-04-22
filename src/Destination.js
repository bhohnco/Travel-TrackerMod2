class Destination {
  constructor(destination) {
    this.id = destination.id || null;
    this.destination = destination.destination || null;
    this.estimatedLodgingCostPerDay = destination.estimatedLodgingCostPerDay || null;
    this.estimatedFlightCostPerPerson = destination.estimatedFlightCostPerPerson || null;
    this.image = destination.image || null;
    this.alt = destination.alt || null;
  }
}

export default Destination