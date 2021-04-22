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
    destination1, destination2, destination3, tripsTestGroup, destinationsTestGroup;

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
    destination3 = new Destination(destinationTestingData[2]);
    tripsTestGroup = [trip1, trip3, trip4];
    destinationsTestGroup = [destination1, destination2, destination3];
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

  it('should have an traveler type', () => {
    expect(traveler3.travelerType).to.equal("shopper");
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
    });

    it('should be able to generate array of trips given the array property name', () => {
      traveler1.findTripInfo('currentTrips', trip1);
      expect(traveler1.currentTrips).to.deep.equal([trip1]);

      traveler3.findTripInfo('upcomingTrips', trip3);
      expect(traveler3.upcomingTrips).to.deep.equal([trip3])

      traveler2.findTripInfo('pendingTrips', trip2);
      expect(traveler2.pendingTrips).to.deep.equal([trip2])

      traveler2.findTripInfo('pastTrips', trip3);
      expect(traveler2.pastTrips).to.deep.equal([trip3])
    });

    it ('should filter a travelers trips by year', () => {
      expect(traveler2.generateTripsByYear(2020, tripsTestGroup)).to.deep.equal([ trip3, trip4]);
      expect(traveler1.generateTripsByYear(2019, tripsTestGroup)).to.deep.equal([trip1]);
    });

    it ('should generate total trip cost per year for travelers and the duration of the trip', () => {
      const tripGroup = traveler1.generateTripsByYear(2020, tripsTestGroup);
      trip1.generateCostOfTravelersTrips(destination1);
      trip3.generateCostOfTravelersTrips(destination3);
      expect(traveler1.generateTripCost(tripGroup, tripsTestGroup)).to.equal(6010);
    });

    it ('should generate the 10% agent fee for a trip', () => {
      expect(traveler1.generateAgentFees(6010)).to.equal(601)
    });

  });

});