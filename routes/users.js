const express = require('express')
const router = express.Router();
const db = require('../db/models');
const { asyncHandler } = require('../routes/utils');

/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const listsObj = await db.List.findAll();
  const tasksObj = await db.Task.findAll();
  res.render('user-main', { tasksObj ,listsObj });
}));








module.exports = router;
