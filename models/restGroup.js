'use strict';
const {
  Model
} = require('sequelize');
// const Sequelize = require('sequelize'); // 

module.exports = (sequelize, DataTypes) => {
  class RestGroup extends Model {
    static associate(models) {
      
      this.belongsTo(models.GroupMst, {
        foreignKey: "grp_cd",
        onDelete: "cascade",
      });
        
      this.belongsTo(models.RestMst, {
        foreignKey: "rest_cd",
        onDelete: "cascade",
      });
    }
  }
  RestGroup.init({
    insert_dt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW 
    }
  }, {
    charset: "utf8", // 한국어 설정
    tableName: "rest_group",
    timestamps: false,
    sequelize,
    modelName: 'RestGroup',
    indexes: [
      {
        unique: true,
        fields: ['grp_cd', 'rest_cd']
      }
    ]
  });

  RestGroup.removeAttribute('id')
    
  return RestGroup;
};