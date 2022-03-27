'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.MyList, {
        foreignKey: "rest_cd",
        sourceKey: 'rest_cd',
        // onUpdate: defaults to CASCADE
        onDelete: "cascade",
      });
    }
  }
  Restaurant.init({
    // Model attributes are defined here
    rest_cd: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    rest_nm: {
      type: DataTypes.STRING(30),
      allowNull : false
    },
    rest_lat: {
      type: DataTypes.STRING(30),
      allowNull: false
      //type: DataTypes.DATE,
      // defaultValue: DataTypes.NOW
    },
    rest_lon: {
      type: DataTypes.STRING(30),
      allowNull : false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    memo: {
      type: DataTypes.STRING(100),
    },
  }, {
    // Other model options go here
    charset: "utf8", // 한국어 설정
    tableName: "rest_info_mst", // 테이블 이름 정의
    timestamps: false,
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};