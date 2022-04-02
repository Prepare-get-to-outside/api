'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MylistInfoMst extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MylistInfoMst.init({
    // Model attributes are defined here
    user_cd: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    rest_cd: {
      type: DataTypes.STRING(100),
      allowNull : false,
      primaryKey: true
    },
    rest_tp: {
      type: DataTypes.STRING(3),
      allowNull : false
    },
    rest_mn: {
      type: DataTypes.DECIMAL
    },
    visit_yn: {
      type: DataTypes.CHAR(1),
      allowNull : false,
      defaultValue : 'N'
    },
    rmk_dc: {
      type: DataTypes.STRING(200),
    },
    share_list_cd: {
      type: DataTypes.STRING(20),
    },
    insert_id: {
      type: DataTypes.STRING(30),
      allowNull : false
    },
    insert_dt: {
      type: DataTypes.DATE,
      allowNull : false,
      defaultValue: DataTypes.NOW
    },
    update_id: {
      type: DataTypes.STRING(30),
    },
    update_dt: {
      type: DataTypes.DATE
    }
  }, {
    // Other model options go here
    charset: "utf8", // 한국어 설정
    tableName: "mylist_info_mst", // 테이블 이름 정의
    timestamps: false,
    sequelize,
    modelName: 'MylistInfoMst',
  });
  return MylistInfoMst;
};