const { v1: uuidv1 } = require("uuid");
const db = require("../models");
const RestaurantInfo = db.restInfo;
const GroupListInfo = db.groupListInfo;
const Code = db.Code;
const { sequelize } = require("../models");

exports.create = async (req, res) => {
  const group = {
    rest_cd: req.body.rest_cd,
    grp_cd: req.body.grp_cd,
  };

  try {
    await sequelize.transaction(async (t) => {
      const response = await GroupListInfo.create(group);

      if (response) {
        res.send({
          status: 200,
          data: response.dataValues,
        });
      }
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.findAll = (req, res) => {
  GroupListInfo.findAll({
    include: [
      {
        model: RestaurantInfo,
        include: [
          {
            model: Code,
          },
        ],
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
