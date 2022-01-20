const express = require('express')
const router = express.Router();
const db = require('../db/models');


/* GET users listing. */
router.get('/', async (req, res, next) => {
  const tasks = await db.User.findAll();
  res.render('user-main', {});
});












module.exports = router;
