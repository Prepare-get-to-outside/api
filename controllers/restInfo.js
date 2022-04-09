const { v1: uuidv1 } = require("uuid");
const db = require("../models");
const RestaurantInfo = db.restInfo;
const Code = db.code;
const { sequelize } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.rest_nm) {
    res.status(400).send({
      message: "parameter validation error",
    });
    return;
  }

  //   const rest_cd = uuidv1();

  const rest = {
    rest_cd: req.body.rest_cd,
    rest_nm: req.body.rest_nm,
    code: req.body?.code,
  };

  //   const code = {
  //     code: req.body?.code,
  //     name: req.body?.code_name,
  //   };
  try {
    await sequelize.transaction(async (t) => {
      const response = await RestaurantInfo.create(rest);

      //   Code.create(code);

      if (response) {
        res.send({
          status: 200,
          data: response.dataValues,
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      message: "error: " + error,
    });
  }
};

exports.findAll = (req, res) => {
  RestaurantInfo.findAll({
    include: [
      {
        model: Code,
        attributes: ["code", "name"],
      },
    ],
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
