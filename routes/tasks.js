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
    const task = req.body.taskInput;
    console.log('DEBUGGGG')
    const taskCreate = await db.Task.create({
        task,
        user_id: userId,
        list_id: '1',
        completed: false,
        expected_completion: new Date(),
        actual_completion: new Date()
    });

    res.json({ message: 'Success' })
}))

router.delete('/', asyncHandler(async (req, res, next) => {
  const target = req.body.listInnerText;

  await db.Task.destroy({
    where: {
      task: {
        [Op.eq]: target
      }
    }
  });

  res.json({ message: 'Success' })
}))

















module.exports = router;
