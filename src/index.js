import './css/base.scss';
import fetchData from '../src/fetchRequest';
import domUpdates from './domUpdates';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from "./Destination";

let currentTraveler, currentTravelerTrips, currentTravelerDestinations,
  allDestinationsData, allTripsData, tripObject, newTravelerTrip, plannedTrip;

const allInputs = document.querySelectorAll('.input');
const loginButton = document.getElementById('login-submit');
const logOutButton = document.getElementById('log-out-button');
const loginView = document.querySelector('.login-view');
const userView = document.querySelector('.traveler-view');
const calcNewTripCost = document.querySelector(".calc-cost");
const submitTripRequest = document.querySelector(".submit-request");

calcNewTripCost.addEventListener("click", retrieveNewTripCost);
loginButton.addEventListener('click', validateLoginForm);
logOutButton.addEventListener('click', logOut);
submitTripRequest.addEventListener("click", submitRequest);
allInputs.forEach(input => {
  input.addEventListener("keyup", checkIfFormFilledOut);
  input.addEventListener("click", checkIfFormFilledOut);
})


function generateSingleTravelerAPI(id) {
  fetchData.generateSingleTraveler(id)
    .then(data => {
      if (data.id === undefined) {
        domUpdates.displayFormError(data.message)
      } else {
        currentTraveler = new Traveler(data);
        generateAPIData()
      }
    })
}

function generateAPIData() {
  const fetches = [fetchData.generateDestinationData(), fetchData.generateTripData()];
  Promise.all(fetches)
    .then(data => {
      allDestinationsData = data[0];
      allTripsData = data[1];
      domUpdates.generateDestinationPicker(allDestinationsData)
      filterAllTripsForTraveler(allTripsData);
      filterAllTravelDestinations();
      generateTravelerPendingTrips();
      filterTravelerTripsByType();
      updateTravelerDash(currentTraveler);
      displayTravelerTrips();
    })
}

function validateLoginForm(event) {
  event.preventDefault();
  const userNameValue = document.getElementById('username').value;
  const passwordValue = document.getElementById('password').value;
  const regex = /^traveler([1-9]|[1-4]\d|50)$/;
  if (passwordValue === 'travel2020' && regex.test(userNameValue)) {
    let splitID = parseInt(userNameValue.slice(8));
    generateSingleTravelerAPI(splitID);
    domUpdates.toggleView(userView, loginView)
  } else {
    domUpdates.displayFormError('success');
  }
  document.querySelector('.login-form').reset();
}

function updateTravelerDash (traveler) {
  domUpdates.greetTraveler(traveler);
  domUpdates.getTodaysDate();
  let tripFor2021 = traveler.generateTripsByYear(2021, currentTravelerTrips);
  let tripCosts = traveler.generateTripCost(tripFor2021, currentTravelerDestinations);
  let agentFees = traveler.generateAgentFees(tripCosts);
  let totalSpent = tripCosts + agentFees;
  domUpdates.displayTravelersTotalSpent(totalSpent.toFixed(2))
}

function filterAllTripsForTraveler(allTripsData) {
  let findTrips = allTripsData.trips.filter(trip => {
    return trip.userID === currentTraveler.id;
  })
  currentTravelerTrips = findTrips.map(trip => {
    return new Trip(trip)
  })
}

function filterAllTravelDestinations() {
  let locatedDestinations = []
  currentTravelerTrips.forEach(trip => {
    allDestinationsData.destinations.forEach(destination => {
      if (destination.id === trip.destinationID) {
        locatedDestinations.push(destination);
        trip.generateCostOfTravelersTrips(destination)
      }
    })
  })
  currentTravelerDestinations = locatedDestinations.map(destination => {
    return new Destination(destination)
  })
}

function generateTravelerPendingTrips() {
  currentTraveler.pendingTrips = [];
  currentTravelerTrips.forEach(trip => {
    if (trip.status === "pending") {
      currentTraveler.addTravelerTrip('pendingTrips', trip);
    }
  })
}

function filterTravelerTripsByType() {
  currentTraveler.pastTrips = [];
  currentTraveler.upcomingTrips = [];
  currentTraveler.currentTrips = [];
  currentTravelerTrips.forEach(trip => {
    let dateSplit = trip.date.split("/");
    let startDate = new Date(dateSplit[0], (dateSplit[1] - 1), dateSplit[2]);
    let tripEnd = startDate.setDate(startDate.getDate() + trip.duration);
    let startInMil = new Date(dateSplit[0], (dateSplit[1] - 1), dateSplit[2]).getTime();
    let today = new Date().getTime();
    if (startInMil < today && today < tripEnd) {
      currentTraveler.addTravelerTrip('currentTrips', trip);
    } else if (startInMil > today) {
      currentTraveler.addTravelerTrip('upcomingTrips', trip);
    } else {
      currentTraveler.addTravelerTrip('pastTrips', trip);
    }
  })
}

function displayTravelerTrips() {
  domUpdates.displayPastTrips(currentTraveler, currentTravelerDestinations);
  domUpdates.displayUpcomingTrips(currentTraveler, currentTravelerDestinations);
  domUpdates.displayPendingTrips(currentTraveler, currentTravelerDestinations);
  domUpdates.displayCurrentTrips(currentTraveler, currentTravelerDestinations);
}

function retrieveNewTripCost() {
  newTravelerTrip = allTripsData.trips.length + 1;
  plannedTrip = instantiateNewTrip();
  allDestinationsData.destinations.forEach(dest => {
    if (dest.id === plannedTrip.destinationID) {
      plannedTrip.generateCostOfTravelersTrips(dest);
    }
  });
  let tripWithAgentFee = plannedTrip.cost + currentTraveler.generateAgentFees(plannedTrip.cost);
  let totalForTrip = tripWithAgentFee.toFixed(2);
  domUpdates.displayNewTripCost(totalForTrip, allInputs);
}

function instantiateNewTrip() {
  let date = document.querySelector(".select-date").value.split("-");
  let dateCorrect = `${date[0]}/${date[1]}/${date[2]}`
  let duration = parseInt(document.querySelector(".enter-duration").value);
  let travelers = parseInt(document.querySelector(".number-travelers").value);
  let destination = parseInt(document.querySelector(".possible-destination").value);
  tripObject = {};
  tripObject = {
    id: newTravelerTrip,
    userID: currentTraveler.id,
    destinationID: destination,
    travelers,
    date: dateCorrect,
    duration,
    status: "pending",
    suggestedActivities: []
  }
  return new Trip(tripObject);
}

function checkIfFormFilledOut() {
  if (allInputs[1].value !== "" && allInputs[2].value !== "") {
    calcNewTripCost.disabled = false;
  }
}

function submitRequest() {
  fetchData.generateNewTripForTraveler(tripObject)
    .then(generateAPIData());
  domUpdates.clearTripCostAfterRequest();
}

function logOut() {
  domUpdates.toggleView(loginView, userView);
  domUpdates.displayFormError('reset')
}