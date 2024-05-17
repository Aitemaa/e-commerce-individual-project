'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User)
      Order.belongsToMany(models.Product, { through: models.OrderDetail });
      Order.hasMany(models.OrderDetail, { foreignKey: 'OrderId' });
    }
  }
  Order.init({
    status: DataTypes.STRING,
    totalPaid: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};