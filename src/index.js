import './css/base.scss';
import fetchData from '../src/fetchRequest';
import domUpdates from './domUpdates';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from "./Destination";

let currentTraveler, currentTravelerTrips, currentTravelerDestinations,
  allTravelerData, allTravelerData, allDestinationsData, allTripsData;


const loginButton = document.getElementById('login-submit');
const logOutButton = document.getElementById('log-out-button');
const loginView = document.querySelector('.login-view');
const userView = document.querySelector('.traveler-view');

loginButton.addEventListener('click', validateLoginForm, console.log(currentTraveler));
// logOutButton.addEventListener('click', logOut);

function generateSingleTravelerAPI(id) {
  fetchData.generateSingleTraveler(id)
    .then(data => {
      console.log(data)
      if (data.id === undefined) {
        domUpdates.displayFormError(data.message)
      } else {
        currentTraveler = new Traveler(data);
        console.log(currentTraveler)
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
      filterAllTripsForTraveler(allTripsData)
      filterAllTravelDestinations()
      console.log(allTripsData)
      updateTravelerDash(currentTraveler)
      console.log(currentTraveler)
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
  } else {
    domUpdates.displayFormError('success');
  }
  document.querySelector('.login-form').reset();
}

function updateTravelerDash (traveler) {
  console.log(traveler)
  domUpdates.greetTraveler(traveler);
  console.log(traveler)
  // domUpdates.toggleView(loginView, userView)
  // domUpdates.generateCurrentDate();
  let tripFor2020 = traveler.generateTripsByYear(2020, currentTravelerTrips);
  console.log(currentTravelerTrips)
  let tripCosts = traveler.generateTripCost(tripFor2020, currentTravelerDestinations);
  console.log(tripCosts)
  let agentFees = traveler.generateAgentFees(tripCosts);
  let totalSpent = tripCosts + agentFees;
  console.log(totalSpent);
  domUpdates.displayTravelersTotalSpent(totalSpent.toFixed(2))
}

function filterAllTripsForTraveler(allTripsData) {
  console.log(allTripsData)
  let findTrips = allTripsData.trips.filter(trip => {
    return trip.userID === currentTraveler.id;
  })
  currentTravelerTrips = findTrips.map(trip => {
    return new Trip(trip)
  })
}

function filterAllTravelDestinations() {
  console.log(allDestinationsData)
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

// function logOut() {
//   domUpdates.toggleView(loginView, userView);
//   domUpdates.displayFormError('reset')
// }