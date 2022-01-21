const express = require('express');
const session = require('express-session');
const router = express.Router();
const db = require('../db/models');
const { asyncHandler } = require('../routes/utils');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });

/* GET users listing. */
router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
  const listsObj = await db.List.findAll({
    includes: db.User.id
  });
  const tasksObj = await db.Task.findAll({
    includes: db.User.id
    //listId
  });
  res.render('user-main', { tasksObj ,listsObj, csrfToken: req.csrfToken() });
}));








module.exports = router;
