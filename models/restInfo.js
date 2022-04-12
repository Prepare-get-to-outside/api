"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RestInfo extends Model {
    static associate(models) {
      this.hasOne(models.Code, {
        sourceKey: "code",
        foreignKey: "code",
      });
    }
  }
  RestInfo.init(
    {
      rest_cd: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
      },
      rest_nm: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "restaurant_info_mst", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "RestInfo",
    }
  );

  return RestInfo;
};
