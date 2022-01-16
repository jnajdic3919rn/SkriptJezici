'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paintings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
     static associate({ Categories }) {
        // define association here
        this.belongsTo(Categories, {foreignKey: 'categoryId', as: 'category'});
      }
      static associate({ Users }) {
        // define association here
        this.belongsTo(Users, {foreignKey: 'userId', as: 'user'});
      }
  };
  Paintings.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Paintings',
  });
  return Paintings;
};