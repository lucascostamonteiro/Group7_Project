const express = require('express')
const router = express.Router();
const db = require('../db/models');


/* GET users listing. */
router.get('/', async (req, res, next) => {
  console.log(req.params);
  console.log(req.url);
  const user = await db.User.findByPk(1);
  res.render('user-main', {});
});












module.exports = router;
