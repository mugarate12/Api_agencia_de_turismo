// imports
const Sequelize = require('sequelize');

module.exports =  (sequelize, DataTypes) => {
  
  class Armchairs extends Sequelize.Model { };

  Armchairs.init({

    id: { type: Sequelize.DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    number: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
    available: { type: Sequelize.DataTypes.STRING, allowNull: false, defaultValue: 'disponivel' }

  }, {
    sequelize,
    modelName: 'armchairs'
  });

  Armchairs.associate = (models) => {
    
    Armchairs.belongsTo(models.bus, {

      foreignKey: {

        allowNull: false,
        field: 'idBus',
        name: 'idBus'

      }

    });

    Armchairs.belongsTo(models.employee, {

      foreignKey: {

        allowNull: false,
        field: 'nameOfPurchaser',
        name: 'nameOfPurchaser'

      }

    });
    
  }
  

  return Armchairs;

}
