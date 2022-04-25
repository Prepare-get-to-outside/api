'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {

      this.hasMany(models.UserGroup, {
        foreignKey: "grp_cd",
        sourceKey: 'grp_cd',
        onDelete: "cascade",
      });

      this.hasMany(models.RestMst, {
        foreignKey: "grp_cd",
        sourceKey: 'grp_cd',
        onDelete: "cascade",
      });
      
      this.hasMany(models.RestGroupTag, {
        foreignKey: "grp_cd",
        sourceKey: 'grp_cd',
        onDelete: "cascade",
      });
    }
  }
  Group.init({
    grp_cd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    grp_nm: {
      type: DataTypes.STRING(30),
    },
    is_mylist: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    insert_dt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW 
    }
  }, {
    charset: "utf8", // 한국어 설정
    tableName: "group_mst",
    timestamps: false,
    sequelize,
    modelName: 'GroupMst',
  });
  return Group;
};