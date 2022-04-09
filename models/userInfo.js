"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    static associate(models) {}
  }
  UserInfo.init(
    {
      user_cd: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "user_info_mst", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "UserInfo",
    }
  );

  return UserInfo;
};
