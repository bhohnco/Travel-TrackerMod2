import chai from 'chai';
const expect = chai.expect;
import Traveler from '/src/Traveler'
import Trip from "../src/Trip";
import Destination from "../src/Destination";
import sampleTestingData from '../test/sampleTestingData.js';
const travelerTestingData = sampleTestingData.travelerTestingData;
const tripTestingData = sampleTestingData.tripTestingData;
const destinationTestingData = sampleTestingData.destinationTestingData;

describe('Traveler', function () {
  let traveler1, traveler2, traveler3, trip1, trip2, trip3, trip4,
    destination1, destination2, tripsTestGroup, destinationsTestGroup;

  beforeEach(() => {
    traveler1 = new Traveler(travelerTestingData[0]);
    traveler2 = new Traveler(travelerTestingData[1]);
    traveler3 = new Traveler(travelerTestingData[2]);
    trip1 = new Trip(tripTestingData[0]);
    trip2 = new Trip(tripTestingData[1]);
    trip3 = new Trip(tripTestingData[2]);
    trip4 = new Trip(tripTestingData[3]);
    destination1 = new Destination(destinationTestingData[0]);
    destination2 = new Destination(destinationTestingData[1]);
    tripsTestGroup = [trip1, trip2, trip3];
    destinationsTestGroup = [destination1, destination2];
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler1).to.be.an.instanceOf(Traveler);
  });

  it('should have an id', () => {
    expect(traveler1.id).to.equal(1);
  });

  it('should have an name', () => {
    expect(traveler2.name).to.equal("Rachael Vaughten");
  });

  it('if Traveler id property does not exist, it should set the default to null', () => {
    const traveler4 = new Traveler({
      name: "Jimmy Conway", travelerType: "relaxer",
      currentTrips: [], upcomingTrips: [], pendingTrips: [], pastTrips: []
    });
    expect(traveler4).to.deep.equal({
      id: null, name: "Jimmy Conway", travelerType: "relaxer",
      currentTrips: [], upcomingTrips: [], pendingTrips: [], pastTrips: []
    });
  });

  it('if user name property does not exist, it should set the default to null', () => {
    const traveler5 = new Traveler({
      id: 7, travelerType: "relaxer",
      currentTrips: [], upcomingTrips: [], pendingTrips: [], pastTrips: []
    });
    expect(traveler5).to.deep.equal({
      id: 7, name: null, travelerType: "relaxer",
      currentTrips: [], upcomingTrips: [], pendingTrips: [], pastTrips: []
    });
  });

  it('should start with no current trips', () => {
    expect(traveler3.currentTrips).to.deep.equal([]);
  });

  it('should start with no upcoming trips', () => {
    expect(traveler3.upcomingTrips).to.deep.equal([]);
  });

  it('should start with no pending trips', () => {
    expect(traveler2.pendingTrips).to.deep.equal([]);
  });

  it('should start with no past trips', () => {
    expect(traveler2.pastTrips).to.deep.equal([]);
  });


  describe("Traveler methods", () => {

    it ('should have a method that returns just the first name', () => {
      expect(traveler1.generateFirstName()).to.equal("Ham");
      expect(traveler2.generateFirstName()).to.equal("Rachael");
    })

    it('should be able to generate total trips for a user', () => {

    })
  });

});