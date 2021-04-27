import chai from 'chai';
const expect = chai.expect;

import Destination from "../src/Destination";
import sampleTestingData from '../test/sampleTestingData.js';
const destinationTestingData = sampleTestingData.destinationTestingData;

describe('Destination', () => {
  let destination1, destination2;

  beforeEach( () => {
    destination1 = new Destination(destinationTestingData[0]);
    destination2 = new Destination(destinationTestingData[1]);
  });

  it('should be a function', () => {
    expect(Destination).to.be.a('function');
  });

  it('should be an instance of Destination', () => {
    expect(destination1).to.be.an.instanceOf(Destination);
  });

  it('should have an id', () => {
    expect(destination2.id).to.equal(2);
  });

  it('should have a destination name', () => {
    expect(destination2.destination).to.equal("Stockholm, Sweden");
  });

  it('should have an estimated lodging cost per day ', () => {
    expect(destination1.estimatedLodgingCostPerDay).to.equal(70);
  });

  it('should have an estimated flight cost per person', () => {
    expect(destination2.estimatedFlightCostPerPerson).to.equal(780);
  });

  it('should have a destination image', () => {
    expect(destination1.image).to.equal("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
  });

  it('should have an alt description to the image', () => {
    expect(destination1.alt).to.equal("overview of city buildings with a clear sky");
  });

})