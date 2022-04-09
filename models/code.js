"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Code extends Model {
    static associate(models) {}
  }
  Code.init(
    {
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "common_code_mst", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "Code",
    }
  );

  return Code;
};
