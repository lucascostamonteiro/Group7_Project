'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {firstName: 'Alec', lastName: 'bread', email: 'alec@alec.alec', password: 'hunter12', createdAt: new Date(), updatedAt: new Date()},
      {firstName: 'evil', lastName: 'jeff', email: 'evil@jeff.alec', password: 'lemons', createdAt: new Date(), updatedAt: new Date()},
      ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
