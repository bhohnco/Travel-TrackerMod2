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

  displayAPIError(message) {
    let apiErrorMsg = document.getElementById('API-error-msg')
    if (message === 'success') {
      apiErrorMsg.innerText = 'Sorry, were having an issue collecting the data, please try again later.';
    } else {
      apiErrorMsg.innerText = '';
    }
  },


  getTodaysDate() {
    let todaysDate = document.querySelector(".todays-date");
    let date = new Date().toLocaleDateString("en-US").split("/");
    todaysDate.innerText = `Today's Date: ${date[0]}/${date[1]}/${date[2]}`;
  },

  greetTraveler(traveler) {
    let travelerDisplayName = document.getElementById('traveler-name');
    travelerDisplayName.innerText = `Welcome back ${traveler.generateFirstName()}!`
  },

  displayTravelersTotalSpent(total) {
    let totalSpent = document.getElementById("total-spent-traveler");
    totalSpent.innerText = `You have spent $${total} in 2021`;
  },

  generateDestinationPicker(destinations) {
    let destinationsInput = document.querySelector(".possible-destination");
    destinations.destinations.forEach(dest => {
      let destinationOption = `
      <option value="${dest.id}">
        ${dest.destination}
      </option>
      `
      destinationsInput.insertAdjacentHTML("beforeend", destinationOption);
    })
  },

  displayNewTripCost(cost, inputs) {
    let newTripCost = document.querySelector(".new-trip-cost");
    newTripCost.classList.remove("hidden")
    if (inputs[0].value !== "" && inputs[3].value !== "0") {
      newTripCost.innerHTML = `<p> This trip will cost $${cost} (including the agent fee) <p>`;
      document.querySelector(".submit-request").disabled = false;
    } else if (inputs[0].value === "") {
      newTripCost.innerHTML = `<p>Please select a date!</p>`;
    } else if (inputs[3].value === "0") {
      newTripCost.innerHTML = `<p>Please select a destination!</p>`;
    }
  },

  displayPastTrips(traveler, destinations) {
    let past = document.querySelector(".past-trips-container");
    past.innerHTML = "";
    if (traveler.pastTrips[0] === undefined) {
      past.innerHTML = `<p>You don't have any past trips, start planning your next trip now!</p>`
    } else {
      traveler.pastTrips.forEach(trip => {
        let foundDest = destinations.find(destination => destination.id === trip.destinationID);
        let splitDestName = foundDest.destination.split(", ");
        let dateSplit = trip.date.split("/");
        past.innerHTML += `<section class="grid-container">
     <article class="grid">
     <p id="API-error-msg" class="error"></p>
      <section class="card-container"
      <section class="card top-row">
        <img src="${foundDest.image}" alt="${foundDest.alt}">
      </section>
      <section class="lower-card">
      </section>
        <div class="card-text">
          <p class="trip-destination">${splitDestName[0]},<br> ${splitDestName[1]}</p>
          <p class="date">Trip date: ${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}</p>
        <p class="Duration">Duration of of trip: ${trip.duration}</p>
        <p class="Number"> Number of travelers: ${trip.travelers}</p>
        </div>
      </section>
    </article>`
      })
    }
  },

  displayUpcomingTrips(traveler, destinations) {
    let upcoming = document.querySelector(".upcoming-trips-container");
    upcoming.innerHTML = "";
    if (traveler.upcomingTrips[0] === undefined) {
      upcoming.innerHTML = `<p>You don't have any upcoming trips, start planning your next trip now!</p>`
    } else {
      traveler.upcomingTrips.forEach(trip => {
        let foundDest = destinations.find(destination => destination.id === trip.destinationID);
        let splitDestName = foundDest.destination.split(", ");
        let dateSplit = trip.date.split("/");
        upcoming.innerHTML += `<section class="grid-container">
     <article class="grid">
     <p id="API-error-msg" class="error"></p>
      <section class="card-container"
      <section class="card top-row">
        <img src="${foundDest.image}" alt="${foundDest.alt}">
      </section>
      <section class="lower-card">
      </section>
        <div class="card-text">
          <p class="trip-destination">${splitDestName[0]},<br> ${splitDestName[1]}</p>
          <p class="date">Trip start date: ${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}</p>
        </div>
        <p class="Duration">Duration of of trip: ${trip.duration}</p>
        <p class="Number"> Number of travelers: ${trip.travelers}</p>
      </section>
    </article>`
      })
    }
  },

  displayPendingTrips(traveler, destinations) {
    let pending = document.querySelector(".pending-trips-container");
    pending.innerHTML = "";
    if (traveler.pendingTrips[0] === undefined) {
      pending.innerHTML = `<p>You don't have any pending trips, start planning your next trip now!</p>`
    } else {
      traveler.pendingTrips.forEach(trip => {
        let foundDest = destinations.find(destination => destination.id === trip.destinationID);
        let splitDestName = foundDest.destination.split(", ");
        let dateSplit = trip.date.split("/");
        pending.innerHTML += `<section class="grid-container">
   <article class="grid">
   <p id="API-error-msg" class="error"></p>
    <section class="card-container"
      <section class="card top-row">
        <img src="${foundDest.image}" alt="${foundDest.alt}">
      </section>
      <section class="lower-card">
      </section>
      <div class="card-text">
        <p class="trip-destination">${splitDestName[0]},<br> ${splitDestName[1]}</p>
        <p class="date">Trip start date: ${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}</p>
      </div>
      <p class="Duration">Duration of of trip: ${trip.duration}</p>
      <p class="Number"> Number of travelers: ${trip.travelers}</p>
    </section>
  </article>`
      })
    }
  },

  displayCurrentTrips(traveler, destinations) {
    let current = document.querySelector(".current-trips-container");
    current.innerHTML = "";
    if (traveler.currentTrips[0] === undefined) {
      current.innerHTML = `<p>You don't have any current trips, start planning your next trip now!</p>`
    } else {
      traveler.currentTrips.forEach(trip => {
        let foundDest = destinations.find(destination => destination.id === trip.destinationID);
        let splitDestName = foundDest.destination.split(", ");
        let dateSplit = trip.date.split("/");
        current.innerHTML += `<section class="grid-container">
     <article class="grid">
     <p id="API-error-msg" class="error"></p>
     <section class="card-container"
      <section class="card top-row">
        <img src="${foundDest.image}" alt="${foundDest.alt}">
      </section>
      <section class="lower-card">
      </section>
        <div class="card-text">
          <p class="trip-destination">${splitDestName[0]},<br> ${splitDestName[1]}</p>
          <p class="date">Trip start date: ${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}</p>
        </div>
        <p class="Duration">Duration of of trip: ${trip.duration}</p>
        <p class="Number"> Number of travelers: ${trip.travelers}</p>
      </section>
    </article>`
      })
    }
  },

  clearTripCostAfterRequest() {
    document.querySelector(".new-trip-cost").classList.add("hidden");
    document.querySelector(".select-date").value = "";
    document.querySelector(".enter-duration").value = "";
    document.querySelector(".number-travelers").value = "";
    document.querySelector(".possible-destination").value = "0";
    document.querySelector(".submit-request").disabled = true;
    document.querySelector(".calc-cost").disabled = true;
  }
}

export default domUpdates;