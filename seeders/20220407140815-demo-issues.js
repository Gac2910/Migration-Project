'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('issues', [{
      description: "Broken screen",
      status: "Opened",
      severity: "High",
      assigned_to: "Tom Green",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: "Sequelize is tricky",
      status: "Opened",
      severity: "Medium",
      assigned_to: "James Wilson",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: "Broken speakers",
      status: "Opened",
      severity: "Medium",
      assigned_to: "Tom Green",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: "No internet",
      status: "Opened",
      severity: "High",
      assigned_to: "James Wilson",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('issues', null, {});
  }
};
