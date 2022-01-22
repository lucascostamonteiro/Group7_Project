const express = require('express');
const session = require('express-session');
const db = require('../db/models');
const { asyncHandler } = require('../routes/utils');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });
const { Op } = require("sequelize");



const router = express.Router();

router.post('/', asyncHandler(async (req, res, next) => {
    const userId = await req.session.user.userId;
    const name = req.body.input;

    await db.List.create({
      name,
      user_id: userId,
      completed: false
    });

    res.json({ message: 'Success' })
}))

router.put('/', asyncHandler(async (req, res, next) => {
  const userId = await req.session.user.userId;
  const name = req.body.input;
  const target = req.body.listInnerText;

  await db.List.destroy({
    where: {
      name: {
        [Op.eq]: target
      }
    }
  });

  await db.List.create({
    name,
    user_id: userId,
    completed: false
  });

  res.json({ message: 'Success' })
}))

router.delete('/', asyncHandler(async (req, res, next) => {
  const target = req.body.listInnerText;

  await db.List.destroy({
    where: {
      name: {
        [Op.eq]: target
      }
    }
  });

  res.json({ message: 'Success' })
}))






module.exports = router;
