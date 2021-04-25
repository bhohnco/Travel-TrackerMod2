import './css/base.scss';
import fetchData from '../src/fetchRequest';
import domUpdates from './domUpdates';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from "./Destination";

let currentTraveler, currentTravelerTrips, currentTravelerDestinations,
  allTravelerData, allDestinationsData, allTripsData;


const loginButton = document.getElementById('login-submit');
const logOutButton = document.getElementById('log-out-button');
const loginView = document.querySelector('.login-view');
const userView = document.querySelector('.traveler-view');
const destinationPicker = document.querySelector(".destination-picker");

loginButton.addEventListener('click', validateLoginForm);
logOutButton.addEventListener('click', logOut);

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
  const fetches = [fetchData.generateAllTravelerData(), fetchData.generateDestinationData(), fetchData.generateTripData()];
  Promise.all(fetches)
    .then(data => {
      allTravelerData = data[0]
      allDestinationsData = data[1];
      allTripsData = data[2];
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
  let tripFor2020 = traveler.generateTripsByYear(2020, currentTravelerTrips);
  let tripCosts = traveler.generateTripCost(tripFor2020, currentTravelerDestinations);
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
  // domUpdates.displayUpcomingTrips(currentTraveler, currentTravelerDestinations);
  // domUpdates.displayPendingTrips(currentTraveler, currentTravelerDestinations);
  // domUpdates.displayCurrentTrips(currentTraveler, currentTravelerDestinations);
}

function logOut() {
  domUpdates.toggleView(loginView, userView);
  domUpdates.displayFormError('reset')
}