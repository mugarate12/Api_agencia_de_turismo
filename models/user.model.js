// meus imports
const Sequelize = require('sequelize');
const {
  hashSync,
  compareSync,
  genSaltSync
} = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  
  // crio a classe que representa o model
  class User extends Sequelize.Model{};

  User.init({
    // definição dos campos
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    password: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true }},
    username: { type: DataTypes.STRING, allowNull: false }

  }, {
    sequelize,
    modelName: 'user',
    hooks: {

      beforeCreate: (userInstance, options) => {

        const salt = genSaltSync();
        userInstance.password = hashSync(userInstance.password, salt);
        
      },
      beforeUpdate: (userInstance, options) => {

        if (userInstance.changed('password')){

          const salt = genSaltSync();
          userInstance.password = hashSync(userInstance.password, salt);

        }

      }

    }
  });

  User.prototype.isPassoword = (newPassword, encodedPassword) => {

    return compareSync(newPassword, encodedPassword);

  };

  return User;

}
