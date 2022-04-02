"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {}
  }
  Restaurant.init(
    {
      rest_cd: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      rest_nm: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      rest_lat: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      rest_lon: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      rest_mn: {
        type: DataTypes.NUMBER(10),
        allowNull: true,
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "rest_info_mst", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "Restaurant",
    }
  );

  return Restaurant;
};
