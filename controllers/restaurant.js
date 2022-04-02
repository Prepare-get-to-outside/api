const e = require("express");
const db = require("../models")
const RestInfoMst = db.RestInfoMst;
const sequelize = db.sequelize

//
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
    const result = await RestInfoMst.create(params, { transaction })

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
      const rest_info = await RestInfoMst.findOne(
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
      const rest_info = await RestInfoMst.findOne(
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