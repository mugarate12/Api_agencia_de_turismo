// imports
const Sequelize = require('sequelize');
const {
  hashSync,
  compareSync,
  genSaltSync
} = require('bcryptjs');
// meus imports

module.exports = (sequelize, DataTypes) => {

  class Admin extends Sequelize.Model { };

  Admin.init({

    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    phoneNumber: { type: Sequelize.DataTypes.TEXT, allowNull: false, validate: { isNumeric: true } },
    CPF: { type: DataTypes.TEXT, allowNull: false, validate: { isNumeric: true } },
    password: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } }

  }, {

      sequelize,
      modelName: 'admin',
      hooks: {

        beforeCreate: (adminInstance, options) => {

          const salt = genSaltSync();
          adminInstance.password = hashSync(adminInstance.password, salt);

        },
        beforeUpdate: (adminInstance, options) => {
          
          if(adminInstance.changed('password')){

            const salt = genSaltSync();
            adminInstance.password = hashSync(adminInstance.password, salt);

          }

        }
        

      }

    });

    Admin.prototype.isPassword = (actualPassword, encodedPassword) => {
      
      return compareSync(actualPassword, encodedPassword);

    }
    

  return Admin;

}