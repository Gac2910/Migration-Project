'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class technicians extends Model {
    static associate(models) {

    }
  }
  technicians.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'technicians',
  });
  return technicians;
};