const { v1: uuidv1 } = require("uuid");
const db = require("../models");
const UserGroup = db.UserGroup;
const { sequelize } = require("../models");

exports.create = async (req, res) => {
  const group = {
    grp_cd: req.body.grp_cd,
    user_cd: req.body.user_cd,
  };

  try {
    await sequelize.transaction(async (t) => {
      const response = await UserGroup.create(group);

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
  UserGroup.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
