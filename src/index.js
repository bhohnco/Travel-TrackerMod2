import './css/base.scss';
import fetchData from '../src/fetchRequest';
import domUpdates from './domUpdates';
import Traveler from './Traveler';
import Destination from "./Destination";
import Trip from './Trip';

let traveler = new Traveler();
let trip = new Trip()
let destination = new Destination()
let allDestinationsData = [];
let allTripsData = [];

window.onload = generateAPIData()

// function generateSingleTravelerAPI(id) {
//   fetchData
// }

function generateAPIData() {
  Promise.all([fetchData.generateDestinationData(),
    fetchData.generateTripData(), fetchData.generateAllTravelerData()
  ])
    .then(data => {
      console.log(data)
      allDestinationsData = data[0];
      allTripsData = data[1];

    })
}