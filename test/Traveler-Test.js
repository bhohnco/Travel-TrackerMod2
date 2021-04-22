import chai from 'chai';
const expect = chai.expect;
import Traveler from '/src/Traveler'
import sampleTestingData from '../test/sampleTestingData.js';
const userTestingData = sampleTestingData.travelerTestingData

describe('Traveler', function () {
  let traveler1;
  let traveler2;
  let traveler3;

  beforeEach(() => {
    traveler1 = new Traveler(travelerTestingData[0]);
    traveler2 = new Traveler(travelerTestingData[1]);
    traveler3 = new Traveler(travelerTestingData[1]);
  });
