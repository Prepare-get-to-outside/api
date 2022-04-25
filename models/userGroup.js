'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    static associate(models) {

      this.belongsTo(models.UserMst, {
        foreignKey: "user_cd",
        onDelete: "cascade",
      });
      
      this.belongsTo(models.GroupMst, {
        foreignKey: "grp_cd",
        onDelete: "cascade",
      });

    }
  }
  UserGroup.init({
    insert_dt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW 
    }
  }, {
    charset: "utf8", // 한국어 설정
    tableName: "user_group",
    timestamps: false,
    sequelize,
    modelName: 'UserGroup',
    indexes: [
      {
        unique: true,
        fields: ['user_cd','grp_cd']
      }
    ]
  });

  UserGroup.removeAttribute('id')
    
  return UserGroup;
};