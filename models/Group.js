'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      this.hasMany(models.FavorList, {
        foreignKey: "grp_cd",
        sourceKey: 'grp_cd',
        onDelete: "cascade",
      });
      this.hasMany(models.TagList, {
        foreignKey: "grp_cd",
        sourceKey: 'grp_cd',
        onDelete: "cascade",
      });
    }
  }
  Group.init({
    grp_cd: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    grp_nm: {
      type: DataTypes.STRING(30),
    },
    insert_dt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW 
    }
  }, {
    charset: "utf8", // 한국어 설정
    tableName: "group_list",
    timestamps: false,
    sequelize,
    modelName: 'Group',
  });
  return Group;
};