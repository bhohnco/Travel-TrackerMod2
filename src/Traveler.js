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

  calculateTravelerTripData() {


  }


}

export default Traveler;