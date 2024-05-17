'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'CategoryId' });
      Product.belongsToMany(models.Order, { through: models.OrderDetail });
      
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name cannot be empty"
        },
        notEmpty: {
          msg: "Name cannot be empty"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description cannot be empty"
        },
        notEmpty: {
          msg: "Description cannot be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price cannot be empty"
        },
        notEmpty: {
          msg: "Price cannot be empty"
        }
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Weight cannot be empty"
        },
        notEmpty: {
          msg: "Weight cannot be empty"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Weight cannot be empty"
        },
        notEmpty: {
          msg: "Weight cannot be empty"
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Weight cannot be empty"
        },
        notEmpty: {
          msg: "Weight cannot be empty"
        }
      }
    },
    sizes:  {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ["S", "M", "L"]
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};