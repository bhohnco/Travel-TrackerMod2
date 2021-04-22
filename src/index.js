import './css/base.scss';
import fetchData from '../src/fetchRequest';
import domUpdates from './domUpdates';
import Traveler from './Traveler';
import Destination from "./Destination";
import Trip from './Trip';

let currentTraveler;
let currentTravelerTrips;
let trip = new Trip()
let destination = new Destination()

window.onload = generateAPIData()

const loginView = document.querySelector('.login-view');
const userView = document.querySelector('.traveler-view');

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
  const fetches = [fetchData.generateDestinationData(), fetchData.generateTripData(), fetchData.generateAllTravelerData()];
  Promise.all(fetches)
    .then(data => {
      let allDestinationsData = data[0];
      let allTripsData = data[1];
      let allUsersData = data[2];
    })
}

function generateCurrentDate() {
  const rawDate = new Date();
  let day = rawDate.getDate();
  if (day < 10) {
    day = `0${day.toString()}`
  }
  let month = rawDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month.toString()}`
  }
  const year = rawDate.getFullYear();
  return `${year}/${month}/${day}`
}