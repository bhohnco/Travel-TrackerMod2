const domUpdates = {

  toggleView(viewToDisplay, viewToHide) {
    viewToDisplay.classList.remove('hidden');
    viewToHide.classList.add('hidden');
  },

  displayFormError(message) {
    let errorMsg = document.getElementById('error-msg')
    if (message === 'success') {
      errorMsg.innerText = 'Username or password invalid. Please try again.';
    } else {
      errorMsg.innerText = '';
    }
  },

  getTodaysDate() {
    let todaysDate = document.querySelector(".todays-date");
    let date = new Date().toLocaleDateString("en-US").split("/");
    todaysDate.innerText = `Today's Date: ${date[0]}/${date[1]}/${date[2]}`;
  },

  setDateDefaults() {
    const searchBar = document.getElementById('traveler-date-search');
    searchBar.value = this.today.replace(/\//g, "-");
  },

  greetTraveler(traveler) {
    let travelerDisplayName = document.getElementById('traveler-name');
    travelerDisplayName.innerText = `Welcome back ${traveler.generateFirstName()}!`
  },

  displayTravelersTotalSpent(total) {
    let totalSpent = document.getElementById("total-spent-traveler");
    totalSpent.innerText = `You have spent $${total} in 2020`;
  },

  displayPastTrips(traveler, destinations) {
    let past = document.querySelector(".past-trips-container");
    past.innerHTML = "";
    if (traveler.pastTrips[0] === undefined) {
      past.innerHTML = `<p>You don't have any past trips, fill out the form above to plan your next trip!!</p>`
    } else {
      traveler.pastTrips.forEach(trip => {
        let foundDest = findDestinationBasedOnTrip(trip, destinations);
        let splitDestName = foundDest.destination.split(", ");
        let dateSplit = trip.date.split("/");
        past.innerHTML += `<section class="grid-container">
     <article class="grid">
      <section class="card top-row">
        <img src="${foundDest.image}" alt="${foundDest.alt}">
      </section>
      <section class="lower-card">
        <div class="card-text">
          <h4 class="trip-destination">${splitDestName[0]},<br> ${splitDestName[1]}</h4>
          <p class="date">Trip start date: ${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}</p>
        </div>
        <p class="Duration">Duration of of trip: ${trip.duration}</p>
        <p class="Number"> Number of travelers: ${trip.travelers}</p>
      </section>
    </article>`
      })
    }
  }
}

function findDestinationBasedOnTrip(trip, destinations) {
  return destinations.find(destination => destination.id === trip.destinationID);
}
  

export default domUpdates;