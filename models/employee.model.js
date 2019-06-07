// meus imports
const Sequelize = require('sequelize');
const {
  hashSync,
  compareSync,
  genSaltSync
} = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  
  // crio a classe que representa o model
  class Employee extends Sequelize.Model{};

  Employee.init({
    // definição dos campos
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true }},
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },

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

  return Employee;

}
