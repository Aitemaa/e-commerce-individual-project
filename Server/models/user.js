'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order)
      User.belongsTo(models.City, {
        foreignKey: 'CityId'
      });
    }
  }
  User.init({
    email: { 
      type:DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email already exists"
      },
      validate: {
        notNull:{
          msg: "Email cannot be empty"
        },
        notEmpty: {
          msg: "Email cannot be empty"
        },
        isEmail:{
          args: true,
          msg: "Email format is incorrect"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 6,
          msg: "Minimum Password length is 6"
        },
        notNull:{
          msg: "Password cannot be empty"
        },
        notEmpty: {
          msg: "Password cannot be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'User'
    },
    fullName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    postalCode: DataTypes.INTEGER,
    CityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      },
    }
  });
  return User;
};