'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetail.belongsTo(models.Order, { foreignKey: 'OrderId' });
      OrderDetail.belongsTo(models.Product, { foreignKey: 'ProductId' } );
    }
  }
  OrderDetail.init({
    OrderId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};