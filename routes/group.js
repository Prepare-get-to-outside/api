const express = require('express');
const router = express.Router();
const group_controller = require("../controllers/group.js");

/* GET users listing. */
// get, post, put, delete 개발
router.post('/', group_controller.create);

router.get('/', group_controller.findAll);

router.get('/:grp_cd', group_controller.findOne);

router.put('/:grp_cd', group_controller.update);

router.delete('/:grp_cd', group_controller.delete);

module.exports = router;
