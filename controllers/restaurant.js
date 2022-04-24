const e = require("express");
const db = require("../models")
const User = db.UserMst;
const RestMst = db.RestMst;
const RestGroup = db.RestGroup;
const GroupMst = db.GroupMst;
const sequelize = db.sequelize

//* 맛집 */
exports.create = async (req, res) => {
  /* 
    음식점 추가
  */
  const params = req.body

  // Validate 체크 프로세스 확인
  // managed transaction으로 트랜잭션 처리
  const transaction = await sequelize.transaction()
  try {
    // 마이리스트 등록
    const result = await RestMst.create(params, { transaction })

    res.send(result)

    await transaction.commit()
  }
  catch (error) {
    await transaction.rollback()
    res.status(500).send({
      message: "Some error occurred while creating the RestInfoMst." + error.message
    });
  }
};

exports.findOne = async (req, res) => {
  /* 
    음식점 리스트 조회(카카오 음식점 데이터 조회)
    req : 1.음식점명, 2.위치(위도,경도)
    res : 음식점 정보 리스트
  */
  const transaction = await sequelize.transaction()
  
  try {
    if (req.query.rest_lon && req.query.rest_lat) {
      // throw '에러 테스트!!!' 
      const rest_info = await RestMst.findOne(
        { 
          // attributes 리턴 데이터 파라미터 정의 
          //attributes : ['rest_cd', 'rest_nm'], 
        // where 조회조건  
        where: { 
            rest_lon: req.query.rest_lon, 
            rest_lat: req.query.rest_lat 
          }
        },
        // 트랜잭션 처리
        {transaction}
        )
      res.send(rest_info)
    }
    else if (req.query.rest_nm) {
      const rest_info = await RestMst.findOne(
        { 
          where: { 
            rest_nm: req.query.rest_nm 
          } 
        },
        // 트랜잭션 처리
        {transaction}
        )
      res.send(rest_info)
    }
    else {
      res.status(400).send({
        message: "parameter is validation error! params :" + JSON.stringify(req.query)
      });
      return;
    }
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    res.status(500).send({
      message: error
    });
  }
};

//* 맛집 그룹 */

// Create and Save a new user
exports.createGroup = async (req, res, next) => {
  // Validate request
  if (!req.body.rest_cd || !req.body.user_cd) {
    res.status(400).send({
      message: "parameter is validation error!"
    });
    return;
  }
  try {
    await sequelize.transaction(async (transaction) => {
      // 1.사용자 확인 
      const res_user = await User.findByPk(req.body.user_cd)

      if (!res_user) {
        res.status(401).send({
          message: "User is not exists"
        });
        return;
      }

      // 2.맛집 조회
      const res_rest = await RestMst.findByPk(req.body.rest_cd)

      if (!res_rest) {
        res.status(401).send({
          message: "Restaurant is not exists"
        });
        return;
      }

      // 3.그룹코드 조회(마이리스트)
      const res_group = await GroupMst.findOne({
        where : {user_cd : req.body.user_cd, is_mylist : 'T'}
      })

      if (!res_group) {
        res.status(401).send({
          message: "Group is not exists"
        });
        return;
      }

      // 4.맛집 그룹 등록(여러 그룹에 등록 처리)_반복문으로 처리?
      var group_list = req.body.group_list.split(',')
      group_list.push(res_group.grp_cd)
      var data = req.body
      var res_rest_group = {}

      for (var group in group_list){
        data.grp_cd = group
        res_rest_group = await RestGroup.create(data, { transaction })

        if (!res_rest_group) {
          throw 'RestGroup creating Error'
        }
      }

      // 5.태그 테이블 등록?
      // 6.맛집 그룹 태그 테이블 등록?

      res.send(res_user);
    })
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the User."
    });
  }
};
// Retrieve all user from the database.
exports.findAll = async (req, res) => {
  try {
    // Save Tutorial in the database
    const result = await User.findAll()
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving tutorials."
    });
  }
};
// // Find a single user with an id
// exports.findOne = async (req, res) => {
//   const user_cd = req.params.user_cd;
//   try {
//     const result = await User.findByPk(user_cd)

//     if (!result) {
//       res.status(404).send({
//         message: `Cannot find User with user_cd=${user_cd}.`
//       });
//       return;
//     }
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({
//       message:
//         error.message || `Cannot find User with user_cd=${user_cd}.`
//     });
//   }
// };
// Update a user by the id in the request
exports.update = async (req, res) => {
  const user_cd = req.params.user_cd;
  try {
    const result = await User.update(req.body, {
      where: { user_cd: user_cd }
    })

    if (result == 1) {
      res.send({
        message: "User was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update User with user_cd=${user_cd}. Maybe User was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating User with user_cd=" + user_cd
    });
  };
};
// Delete a user with the specified id in the request
exports.delete = async (req, res) => {
  const user_cd = req.params.user_cd;
  try {
    const result = await User.destroy({
      where: { user_cd: user_cd }
    })

    if (result == 1) {
      res.send({
        message: "User was deleted successfully."
      });
    } else {
      res.send({
        message: `Cannot delete User with user_cd=${user_cd}. Maybe User was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Could not delete User with user_cd=" + user_cd
    });
  };
};