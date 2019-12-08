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
  constructor({ db }) {
    this._db = db;
  }

  async getOffer(carID, dateRange) {
    const db = this._db;
    const car = await db('cars')
      .first()
      .where({ car_id: carID });
    if (!car) {
      return Promise.reject(new Error('No entry found for car: ' + carID));
    }
    const { price, days } = listPrice(
      new Money({
        amount: car.list_price_amount,
        currency: car.list_price_currency
      }),
      dateRange
    );
    return { price, days, car };
  }
}

module.exports = Cars;
