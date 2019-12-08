// 'use strict';

// const Car = require('../entities/Car');

// class RentalMapper {
//   constructor({ db }) {
//     this._db = db;
//   }

//   fromRow(row) {
//     return new Car({
//       carID: row.car_id,
//       start,
//       end,
//       price_amount: price.amount,
//       price_currency: price.currency
//     });
//   }

//   toRow(car) {
//     return {
//       car_id: car.getID(),
//       make: car.getMake(),
//       model: car.getModel(),
//       plate: car.getPlate(),
//       list_price_amount: car.getListPrice().amount,
//       list_price_currency: car.getListPrice().currency,
//       rented: car.isRented(),
//       rental_id: car.getRentalID(),
//       policy: car.getPolicy()
//     };
//   }

//   async find({ ID }) {
//     const db = this._db;
//     const row = await db('cars')
//       .first()
//       .where({ car_id: ID });
//     if (!row) {
//       return Promise.reject(new Error('No entry found for car: ' + ID));
//     }
//     return this.fromRow(row);
//   }

//   async update(car) {
//     if (!car.getID()) throw new Error('Cars without ID cannot be saved');

//     const row = this.toRow(car);
//     return await this._db('cars')
//       .update(row)
//       .where({ car_id: car.getID() });
//   }
// }

// module.exports = CarMapper;
