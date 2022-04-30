"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserMst extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.UserGroup, {
        foreignKey: "user_cd",
        sourceKey: "user_cd",
      });

      this.hasMany(models.GroupMst, {
        foreignKey: "user_cd",
        sourceKey: "user_cd",
      });
    }
  }
  UserMst.init(
    {
      // Model attributes are defined here
      user_cd: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      user_nm: {
        type: DataTypes.STRING(30),
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "user_mst", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "UserMst",
    }
  );
  return UserMst;
};
