'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {
      this.hasMany(models.MyList, {
        foreignKey: "rest_cd",
        sourceKey: 'rest_cd',
        onDelete: "cascade",
      });
      this.hasMany(models.FavorList, {
        foreignKey: "rest_cd",
        sourceKey: 'rest_cd',
        onDelete: "cascade",
      });
      this.hasMany(models.TagList, {
        foreignKey: "rest_cd",
        sourceKey: 'rest_cd',
        onDelete: "cascade",
      });
    }
  }
  Restaurant.init({
    // Model attributes are defined here
    rest_cd: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    rest_nm: {
      type: DataTypes.STRING(30),
      allowNull : false
    },
    rest_lat: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    rest_lon: {
      type: DataTypes.STRING(30),
      allowNull : false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    memo: {
      type: DataTypes.STRING(100),
    },
  }, {
    // Other model options go here
    charset: "utf8", // 한국어 설정
    tableName: "rest_info_mst", // 테이블 이름 정의
    timestamps: false,
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};