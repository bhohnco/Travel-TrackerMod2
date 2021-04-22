class Trip {
  constructor(trip) {
    if (trip) {
      this.id = trip.id || null;
      this.userID = trip.userID || null;
      this.destinationID = trip.destinationID || null;
      this.travelers = trip.travelers || null;
      this.date = trip.date || '0000/00/00';
    }
  }
}

export default Trip;