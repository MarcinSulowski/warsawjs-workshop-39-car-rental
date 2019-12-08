'use strict';
const Money = require('./../types/Money');
const DateRange = require('./../types/DateRange');
const listPrice = require('../strategies/listPrice');

class Cars {
  /**
   * Get an offer for a car for a given number of days
   * @param {string} carID
   * @param {DateRange} dateRange
   */
  constructor({ mapper, db }) {
    this._mapper = mapper;
  }

  async getOffer(carID, dateRange) {
    //   table module
    const mapper = this._mapper;
    const car = await mapper.find({ ID: carID });

    const { price, days } = listPrice(car.getListPrice(), dateRange);
    return { price, days, car };
  }
}

module.exports = Cars;
