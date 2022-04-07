'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('technicians', [{
      first_name: "John",
      last_name: "Doe",
      email: "John@email.com",
      phone_number: "123-123-1234",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: "James",
      last_name: "Wilson",
      email: "James@email.com",
      phone_number: "321-321-3210",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: "Tom",
      last_name: "Green",
      email: "Tom@email.com",
      phone_number: "345-345-3456",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: "Billy",
      last_name: "Bob",
      email: "Billy@email.com",
      phone_number: "543-543-5432",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('technicians', null, {});
  }
};
