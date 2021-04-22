class Traveler {
  constructor(traveler) {
    if (traveler) {
      this.id = traveler.id || null;
      this.name = traveler.name || null;
      this.travelerType = traveler.travelerType || null;
      this.currentTrips = [];
      this.upcomingTrips = [];
      this.pendingTrips = [];
      this.pastTrips = [];
    } else {
      this.id = null;
      this.name = "Guest"
    }
  }

  generateFirstName() {
    let splitName = this.name.split(' ', 2);
    return splitName[0];
  }

  findTripInfo(tripType, tripObj) {
    this[tripType].push(tripObj)
  }

  generateTripsByYear(year, trips) {
    return trips.filter(trip => trip.date.includes(year));
  }

  generateTripCost(trips) {
    return trips.reduce((tripTotal, trip) => {
      tripTotal += trip.cost;
      return tripTotal
    }, 0)
  }

  generateAgentFees(cost) {
    return cost * 0.1;
  }

}

export default Traveler;