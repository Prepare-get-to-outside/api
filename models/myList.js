'use strict';
const {
  Model
} = require('sequelize');
// const Sequelize = require('sequelize'); // 

module.exports = (sequelize, DataTypes) => {
  class MyList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        // as: "user_cd",
        foreignKey: "user_cd",
        onDelete: "cascade",
      });
      
      this.belongsTo(models.Restaurant, {
        foreignKey: "rest_cd",
        onDelete: "cascade",
      });
    }
  }
  MyList.init({
    // Model attributes are defined here
  }, {
    // Other model options go here
    charset: "utf8", // 한국어 설정
    tableName: "mylist_info_mst", // 테이블 이름 정의 (my_list_info)
    timestamps: false,
    sequelize,
    modelName: 'MyList',
    indexes: [  //unique composite fk
      {
        unique: true,
        fields: ['user_cd', 'rest_cd']
      }
    ]
  });

  MyList.removeAttribute('id')
  return MyList;
};