class Trip {
  constructor(trip) {
    this.id = trip.id || null;
    this.userID = trip.userID || null;
    this.destinationID = trip.destinationID || null;
    this.travelers = trip.travelers || null;
    this.date = trip.date || '0000/00/00';
    this.duration = trip.duration || null;
    this.status = trip.status || null;
    this.suggestedActivities = trip.suggestedActivities || [];
    this.cost = 0;
  }

  generateCostOfTravelersTrips(destination) {
    let totalCost = 0;
    const totalLodgingCost = this.duration * destination.estimatedLodgingCostPerDay;
    const totalFlightCost = this.travelers * destination.estimatedFlightCostPerPerson;
    totalCost += totalLodgingCost;
    totalCost += totalFlightCost;
    this.cost = totalCost;
  }
}

export default Trip;