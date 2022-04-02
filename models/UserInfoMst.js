'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfoMst extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.MylistInfoMst, {
        foreignKey: "user_cd",
        sourceKey: 'user_cd',
      })
    }
  }
  UserInfoMst.init({
    // Model attributes are defined here
    user_cd: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(30),
      allowNull : false
      // allowNull defaults to true
    },
    user_nm: {
      type: DataTypes.STRING(30),
      // allowNull : false
      // allowNull defaults to true
    },
    insert_dt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
      // allowNull defaults to true
    },
    update_dt: {
      type: DataTypes.DATE
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
    charset: "utf8", // 한국어 설정
    tableName: "user_info_mst", // 테이블 이름 정의
    timestamps: false,
    sequelize,
    modelName: 'UserInfoMst',
  });
  return UserInfoMst;
};