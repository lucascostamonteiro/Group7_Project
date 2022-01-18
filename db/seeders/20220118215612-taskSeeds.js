'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {user_id: 1, list_id: 1, task: 'laundry', completed: false, expected_completion: new Date(), actual_completion: null, createdAt: new Date(), updatedAt: new Date()},
      {user_id: 2, list_id: 1, task: 'groceries', completed: false, expected_completion: new Date(), actual_completion: null, createdAt: new Date(), updatedAt: new Date()},
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
