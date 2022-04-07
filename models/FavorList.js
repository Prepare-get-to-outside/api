'use strict';
const {
  Model
} = require('sequelize');
// const Sequelize = require('sequelize'); // 

module.exports = (sequelize, DataTypes) => {
  class FavorList extends Model {
    static associate(models) {
      this.belongsTo(models.Group, {
        foreignKey: "grp_cd",
        onDelete: "cascade",
      });
        
      this.belongsTo(models.Restaurant, {
        foreignKey: "rest_cd",
        onDelete: "cascade",
      });
    }
  }
  FavorList.init({
    insert_dt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW 
    }
  }, {
    charset: "utf8", // 한국어 설정
    tableName: "favor_list_info",
    timestamps: false,
    sequelize,
    modelName: 'FavorList',
    indexes: [
      {
        unique: true,
        fields: ['grp_cd', 'rest_cd']
      }
    ]
  });

  FavorList.removeAttribute('id')
    
  return FavorList;
};