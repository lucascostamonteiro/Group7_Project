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
  const myList = req.body.currentList;

  if (myList === 'allTasks') {
    listId = 0;
  } else {
    listId = await db.List.findOne({
      where: {
        name: {
          [Op.eq]: myList
        }
      }
    })
  }

  await db.Task.create({
    task,
    user_id: userId,
    list_id: listId.id,
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

router.put('/', asyncHandler(async (req, res, next) => {
  const userId = await req.session.user.userId;
  const task = req.body.input;
  const target = req.body.listInnerText;
  const myList = req.body.currentList;

  let listId;

  if (myList === 'allTasks') {
    listId = 0;
  } else {
    listId = await db.List.findOne({
      where: {
        name: {
          [Op.eq]: myList
        }
      }
    })
  }

  await db.Task.destroy({
    where: {
      task: {
        [Op.eq]: target
      }
    }
  });

  await db.Task.create({
    task,
    user_id: userId,
    list_id: listId.id,
    completed: false,
    expected_completion: new Date(),
    actual_completion: new Date()
  });

  res.json({ message: 'Success' })
}))


module.exports = router;
