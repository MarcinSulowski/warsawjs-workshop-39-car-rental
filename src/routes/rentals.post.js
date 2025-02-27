'use strict';

// const db = require('../db');
// const listPrice = require('../strategies/listPrice');
// const Money = require('../types/Money');
const DateRange = require('../types/DateRange');
const Cars = require('../modules/Cars');
const CarMapper = require('../mappers/CarMapper');
module.exports = function(app, { db }) {
  app.post(
    '/rentals',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            car_id: { type: 'number' },
            date_start: { type: 'string', format: 'date-time' },
            date_end: { type: 'string', format: 'date-time' },
            customer_name: { type: 'string' },
            customer_age: { type: 'number' },
            customer_email: { type: 'string', pattern: '.+@.+' }
          },
          required: [
            'car_id',
            'date_start',
            'date_end',
            'customer_name',
            'customer_age',
            'customer_email'
          ]
        }
      }
    },
    async function(request, reply) {
      // Get all necessary data:
      const car_id = request.body.car_id;
      // For sake of exercise's simplicity, we start the rental at this moment.
      // Otherwise, we'd have to deal with a separate pick-up operation.
      const start = new Date(request.body.date_start);
      const end = new Date(request.body.date_end);

      const { car, price, days } = await db.transaction(async function(
        transaction
      ) {
        const mapper = new CarMapper({ db: transaction });
        const cars = new Cars({ mapper });

        const { price, days, car } = await cars.getOffer(
          car_id,
          new DateRange({ start, end })
        );

        if (!car) {
          throw new Error('No entry found for car: ' + car_id);
        }
        if (car.rented) {
          throw new Error('This car is already rented');
        }

        // Actually save the rental contract and mark the car as taken:
        const [rental_id] = await transaction('rentals').insert(
          {
            car_id: car_id,
            start: start,
            end: end,
            active: true,
            price_amount: price.amount,
            price_currency: price.currency
          },
          ['rental_id']
        );
        await transaction('cars')
          .update({ rented: true, rental_id: rental_id })
          .where({ car_id: car_id });
        return { car, price, days };
      });
      reply.view('rental-started', {
        car,
        price,
        rental: { start, end, days },
        timestamp: new Date()
      });
    }
  );
};
