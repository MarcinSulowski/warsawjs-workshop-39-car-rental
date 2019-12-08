'use strict';
// singleton, es6 ma singletona w pakiecie
const db = require('../db');

module.exports = function(app) {
  app.get('/cars', async function(request, reply) {
    const cars = await db('cars_with_status').select();
    reply.view('cars', { cars });
  });
};
