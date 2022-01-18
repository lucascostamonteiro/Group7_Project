'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Lists', [
      { user_id: 1, name: 'workstuff', completed: false, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, name: 'weekend', completed: false, createdAt: new Date(), updatedAt: new Date() },
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Lists', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
