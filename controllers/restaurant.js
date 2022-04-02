const e = require("express");
const db = require("../models")
const RestInfoMst = db.RestInfoMst;
const Op = db.Sequelize.Op;

// 
exports.findOne = (req, res) => {
  /* 
    음식점 리스트 조회(카카오 음식점 데이터 조회)
    req : 1.음식점명, 2.위치(위도,경도)
    res : 음식점 정보 리스트
  */
  if (req.query.rest_lon && req.query.rest_lat) {
    RestInfoMst.findOne(
      { where: { rest_lon: req.query.rest_lon, rest_lat: req.query.rest_lat } }
    ).then(data => {
      res.send(data);
    })
      .catch(err => {
        res.status(500).send({
          message: "Error restaurant search! params :" + JSON.stringify(req.query)
        });
      });
  }
  else if (req.query.rest_nm) {
    RestInfoMst.findOne(
      { where: { rest_nm: req.query.rest_nm } }
    ).then(data => {
      res.send(data);
    })
      .catch(err => {
        res.status(500).send({
          message: "Error restaurant search! params :" + JSON.stringify(req.query)
        });
      });
  }
  else{
    res.status(400).send({
      message: "parameter is validation error! params :" + JSON.stringify(req.query)
    });
  }
};