const { v1: uuidv1 } = require("uuid");
const db = require("../models");
const Restaurant = db.restaurant;
const MyListInfo = db.myListInfo;
const { sequelize } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.rest_nm) {
    res.status(400).send({
      message: "parameter validation error",
    });
    return;
  }

  const rest_cd = uuidv1();

  const rest = {
    rest_cd: rest_cd,
    rest_nm: req.body.rest_nm,
    rest_lat: req.body?.rest_lat,
    rest_lon: req.body?.rest_lon,
  };

  const myListInfo = {
    rest_cd,
    rest_mn: req.body?.rest_mn,
    visit_yn: req.body?.visit_yn,
    rmk_dc: req.body?.rmk_dc,
    tag_cd: req.body?.tag_cd,
    share_list_cd: req.body?.share_list_cd,
  };

  try {
    await sequelize.transaction(async (t) => {
      Restaurant.create(rest)
        .then((data) => {
          res.send({
            status: 200,
            data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating Restaurant.",
          });
        });

      MyListInfo.create(myListInfo);
    });
  } catch (error) {
    return res.status(500).send({
      message: "error: " + error,
    });
  }
};

exports.findAll = (req, res) => {
  Restaurant.findAll({
    include: [
      {
        as: "myListInfo",
        model: MyListInfo,
        attributes: ["visit_yn", "rmk_dc", "tag_cd", "share_list_cd"],
      },
    ],
    raw: true,
  })
    .then((data) => {
      res.send({
        status: 200,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: err.message || "에러 났다네",
      });
    });
};

