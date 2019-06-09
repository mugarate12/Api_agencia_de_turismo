// imports
const Sequelize = require('sequelize');
const {
  hashSync,
  compareSync,
  genSaltSync
} = require('bcryptjs');
// meus imports

module.exports = (sequelize, DataTypes) => {
  
  // crio a classe que representa o model
  class Employee extends Sequelize.Model{};

  Employee.init({
    // definição dos campos
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true }},
    phoneNumber: { type: DataTypes.TEXT, allowNull: false, validate: { isNumeric: true } },
    CPF: { type: DataTypes.TEXT, allowNull: false, validate: { isNumeric: true } },
    password: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    agency: { type: DataTypes.STRING, allowNull: false }

  }, {
    sequelize,
    modelName: 'employee',
    hooks: {

      beforeCreate: (employeeInstance, options) => {

        const salt = genSaltSync();
        employeeInstance.password = hashSync(employeeInstance.password, salt);
        
      },
      beforeUpdate: (employeeInstance, options) => {

        if (employeeInstance.changed('password')){

          const salt = genSaltSync();
          employeeInstance.password = hashSync(employeeInstance.password, salt);

        }

      }

    }
  });

  Employee.prototype.isPassword = (actualPassword, encodedPassword) => {

    return compareSync(actualPassword, encodedPassword);

  };

  // Employee.associate = (models) => {
    
  //   Employee.belongsTo(models.admin, {

  //     foreignKey: {

  //       allowNull: false,
  //       field: 'agency',
  //       name: 'agency'

  //     }

  //   });

  // }
  

  return Employee;

}
