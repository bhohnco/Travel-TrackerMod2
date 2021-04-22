import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/Trip';
import sampleTestingData from '../test/sampleTestingData.js';
import Destination from "../src/Destination";
const tripTestingData = sampleTestingData.tripTestingData;
const destinationTestingData = sampleTestingData.destinationTestingData;

describe('Trip', () => {
  let trip1, trip2, destination1, destination2;

  beforeEach( () => {
    trip1 = new Trip(tripTestingData[0]);
    trip2 = new Trip(tripTestingData[1]);
    destination1 = new Destination(destinationTestingData[0]);
    destination2 = new Destination(destinationTestingData[1]);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.an.instanceOf(Trip);
  });

  it('should have an id', () => {
    expect(trip2.id).to.equal(2);
  });

  it('should have a destination ID', () => {
    expect(trip2.destinationID).to.equal(25);
  });

  it('should hold a number of travelers', () => {
    expect(trip2.travelers).to.equal(5);
  });

  it('should have a trip date', () => {
    expect(trip1.date).to.equal("2019/09/16");
  });

  it('should have trip duration', () => {
    expect(trip2.duration).to.equal(18);
  });

  it('should have status for the trip', () => {
    expect(trip1.status).to.equal("approved");
    expect(trip2.status).to.equal("pending");
  });

  it('should hold an empty array of suggested activities', () => {
    expect(trip1.suggestedActivities).to.deep.equal([])
  });

  it ('should have a method that determines the cost of a trip by travelers and duration, based off the destination', () => {
    trip1.generateCostOfTravelersTrips(destination1);
    trip2.generateCostOfTravelersTrips(destination2);
    expect(trip1.cost).to.equal(960);
    expect(trip2.cost).to.equal(5700);
  })

});