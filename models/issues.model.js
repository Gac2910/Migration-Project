'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class issues extends Model {
    static associate(models) {
      
    }
  }
  issues.init({
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    severity: DataTypes.STRING,
    assigned_to: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'issues',
  });
  return issues;
};