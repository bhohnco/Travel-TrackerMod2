import chai from 'chai';
const expect = chai.expect;
import User from '/src/User'
import sampleTestingData from '../test/sampleTestingData.js';
const userTestingData = sampleTestingData.userTestingData

describe('User', function () {
  let user1;
  let user2;
  let user3;

  beforeEach(() => {
    user1 = new User(userTestingData[0]);
    user2 = new User(userTestingData[1]);
    user3 = new User(userTestingData[1]);
  });
