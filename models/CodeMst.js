"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CodeMst extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.RestMst, {
        foreignKey: "adress_code",
        sourceKey: "code",
      });
    }
  }
  CodeMst.init(
    {
      // Model attributes are defined here
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      code_nm: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      code_group: {
        type: DataTypes.STRING(5),
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "code_mst", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "CodeMst",
    }
  );
  return CodeMst;
};
