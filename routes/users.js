const express = require('express');
const session = require('express-session');
const router = express.Router();
const db = require('../db/models');
const { asyncHandler } = require('../routes/utils');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });

/* GET users listing. */
router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
  const userid = await req.session.user.userId;
  const listsObj = await db.List.findAll({
    where: {
      user_id: userid
    }
  });
  // console.log('DEBUG:' , req.session.list)
  const tasksObj = await db.Task.findAll({
    where: {
      user_id: userid
    }
  });
  res.render('user-main', { tasksObj, listsObj, csrfToken: req.csrfToken() });
}));








module.exports = router;
