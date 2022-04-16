"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.User, {
        foreignKey: "user_cd",
      });
      //   this.hasMany(models.groupMst);
    }
  }
  UserGroup.init(
    {
      // Model attributes are defined here
      user_cd: {
        type: DataTypes.STRING(20),
        allowNull: false,
        // primaryKey: true,
      },
      grp_cd: {
        type: DataTypes.STRING(20),
        allowNull: false,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "user_group", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "UserGroup",
    }
  );
  return UserGroup;
};
