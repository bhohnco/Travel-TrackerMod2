let fetchData = {

  generateSingleTraveler(travelerId) {
    return fetch(`http://localhost:3001/api/v1/travelers/${travelerId}`)
      .then(response => response.json())
      .catch(err => {
        console.log(err, "Data error for single traveler fetch")
      })
  },

  generateDestinationData() {
    return fetch('http://localhost:3001/api/v1/destinations')
      .then(response => response.json())
      .catch(err => {
        console.log(err, "Data error for destination fetch")
      })
  },

  generateTripData() {
    return fetch('http://localhost:3001/api/v1/trips')
      .then(response => response.json())
      .catch(err => {
        console.log(err, "Data error for trip fetch")
      })
  },
      
  generateAllTravelerData() {
    return fetch('http://localhost:3001/api/v1/travelers')
      .then(response => response.json())
      .catch(err => {
        console.log(err, "Data error for all traveler fetch")
      })
  },

  generateNewTripForTraveler(trip) {
    return fetch("http://localhost:3001/api/v1/trips", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: trip.id,
        userID: trip.userID,
        destinationID: trip.destinationID,
        travelers: trip.travelers,
        date: trip.date,
        duration: trip.duration,
        status: trip.status,
        suggestedActivities: trip.suggestedActivities
      })
    })
      .then(response => response.json())
      .catch(err => {
        console.log(err, "Sorry! We are having trouble getting the data, try again later!")
      })
  }
}


export default fetchData;