"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {}
  }
  Tag.init(
    {
      tag_cd: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "tag_mst", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "Tag",
    }
  );

  return Tag;
};
