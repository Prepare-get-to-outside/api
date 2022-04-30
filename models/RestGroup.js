"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RestGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.RestMst, {
        foreignKey: "rest_cd",
        targetKey: "rest_cd",
      });
      this.belongsTo(models.GroupMst, {
        foreignKey: "grp_cd",
        targetKey: "grp_cd",
      });

      this.belongsToMany(models.TagMst, {
        through: models.RestGroupTag,
        // as: "rgt.rest_grp_cd",
        // foreignKey: "rest_grp_cd",
      });
      this.hasMany(models.RestGroupTag, {
        // foreignKey: "rest_grp_cd",
        // sourceKey: "rest_grp_cd",
      });
    }
  }
  RestGroup.init(
    {
      // Model attributes are defined here
      // rest_grp_cd: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      //   allowNull: false,
      // },
      temp_cd: {
        type: DataTypes.STRING(100),
      },
    },
    {
      // Other model options go here
      charset: "utf8", // 한국어 설정
      tableName: "rest_group", // 테이블 이름 정의
      timestamps: true,
      sequelize,
      modelName: "RestGroup",
    }
  );
  return RestGroup;
};
