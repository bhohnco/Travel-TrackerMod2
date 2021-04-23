import './css/base.scss';
import fetchData from '../src/fetchRequest';
import domUpdates from './domUpdates';
import Traveler from './Traveler';
import Destination from "./Destination";
import Trip from './Trip';

let currentTraveler;
let currentTravelerTrips;
let currentTravelerDestinations
let allDestinationsData;
let allTripsData;

window.onload = generateAPIData()

const loginButton = document.getElementById('login-submit');
const logOutButton = document.getElementById('log-out-button');
const loginView = document.querySelector('.login-view');
const userView = document.querySelector('.traveler-view');

loginButton.addEventListener('click', validateLoginForm);
logOutButton.addEventListener('click', logOut);

function generateSingleTravelerAPI(id) {
  fetchData.generateSingleTraveler(id)
    .then(data => {
      if (data.id === undefined) {
        domUpdates.displayFormError(data.message)
      } else {
        domUpdates.toggleView(loginView, userView);
        currentTraveler = new Traveler(data);
        generateAPIData()
      }
    })
}

function generateAPIData() {
  const fetches = [fetchData.generateDestinationData(), fetchData.generateTripData()];
  Promise.all(fetches)
    .then(data => {
      console.log(data)
      allDestinationsData = data[0];
      allTripsData = data[1];
      updateTravelerDash(currentTraveler)
    })
}

function validateLoginForm(event) {
  event.preventDefault();
  const userNameValue = document.getElementById('username').value;
  const passwordValue = document.getElementById('password').value;
  const regex = /^traveler([1-9]|[1-4]\d|50)$/;
  if (passwordValue === 'travel2020' && regex.test(userNameValue)) {
    generateSingleTravelerAPI(userNameValue);
  } else {
    domUpdates.displayFormError('success');
  }
  document.querySelector('.login-form').reset();
}

function updateTravelerDash (traveler) {
  domUpdates.greetTraveler(traveler);
  domUpdates.generateCurrentDate();
  let tripFor2020 = traveler.generateTripsByYear(2020, currentTravelerTrips);
  let tripCosts = traveler.generateTripCost(tripFor2020, currentTravelerDestinations);
  let agentFees = traveler.generateAgentFees(tripCosts);
  let totalSpent = tripCosts + agentFees;
  domUpdates.displayTravelersTotalSpent(totalSpent.toFixed(2))
}

function logOut() {
  domUpdates.toggleView(loginView, userView);
  domUpdates.displayFormError('reset')
}