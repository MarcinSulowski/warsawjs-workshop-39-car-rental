'use strict';
const Money = require('../types/Money');
const DateRange = require('../types/DateRange');

class Rental {
  constructor({
    rentalID = null,
    carID = null,
    duration = null,
    active = true,
    price = null
  }) {
    this._rentalID = rentalID;
    this._carID = carID;
    this._duration = duration ? new DateRange(duration) : null;
    this._active = Boolean(active);
    this._price = price ? new Money(price) : null;
  }

  getID() {
    return this._rentalID;
  }

  getCarID() {
    return this._carID;
  }

  getDuration() {
    return this._duration;
  }

  isActive() {
    return this._active;
  }

  getPrice() {
    return this._price;
  }

  start(carID, duration, price) {
    if (this.isActive()) throw new Error('Rental has already started');

    this._active = true;
    this._carID = carID;
    this._duration = new DateRange(duration);
    this._price = new Money(price);
  }

  end() {
    if (!this.isActive()) throw new Error("Rental hasn't started");
    this._active = false;
  }
}

module.exports = Rental;
