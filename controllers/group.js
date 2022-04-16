const { v1: uuidv1 } = require("uuid");
const db = require("../models");
const User = db.User;
const UserGroup = db.UserGroup;
const GroupMst = db.groupMst;
const Code = db.Code;
const { sequelize } = require("../models");

exports.create = async (req, res) => {
  const group = {
    grp_cd: req.body.grp_cd,
    grp_nm: req.body.grp_nm,
    user_cd: req.body.user_cd,
    is_mylist: req.body.is_mylist,
  };

  try {
    await sequelize.transaction(async (t) => {
      const response = await GroupMst.create(group);

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
  GroupMst.findAll({
    include: [
      {
        model: UserGroup,
        include: [
          {
            model: User,
          },
        ],
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
