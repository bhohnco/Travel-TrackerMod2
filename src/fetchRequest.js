let fetchData = {
  generateSingleTraveler(travelerId) {
    return fetch(`http://localhost:3001/api/v1/travelers/${travelerId}`)
      .then(response => response.json())
      .catch(err => {
        console.log("Data error for single traveler fetch")
      })
  },

  generateDestinationData() {
    return fetch('http://localhost:3001/api/v1/destinations')
      .then(response => response.json())
      .catch(err => {
        console.log("Data error for destination fetch")
      })
  },

  generateTripData() {
    return fetch('http://localhost:3001/api/v1/trips')
      .then(response => response.json())
      .catch(err => {
        console.log("Data error for trip fetch")
      })
  },
      
  generateAllTravelerData() {
    return fetch('http://localhost:3001/api/v1/travelers')
      .then(response => response.json())
      .catch(err => {
        console.log("Data error for all traveler fetch")
      })
  },
      
}





export default fetchRequest;