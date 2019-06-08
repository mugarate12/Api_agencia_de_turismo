// imports
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Bus extends Sequelize.Model { };

  Bus.init({

    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    origin: { type: DataTypes.TEXT, allowNull: false },
    destination: { type: DataTypes.TEXT, allowNull: false },
    ticketValue: { type: DataTypes.TEXT, allowNull: false },
    numberOfArchairs: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false }

  },{
    sequelize,
    modelName: 'bus'
  });

  return Bus;

}