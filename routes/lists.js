const express = require('express');
const session = require('express-session');
const db = require('../db/models');
const { asyncHandler } = require('../routes/utils');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });
const { Op } = require("sequelize");

const router = express.Router();

// Actually a 'get' request v v v
router.post('/allLists', asyncHandler(async (req, res, next) => {
  const userId = await req.session.user.userId;
  const listName = req.body.listName;

  let listId = await db.List.findOne({
    where: {
      name: {
        [Op.eq]: listName
      }
    }
  })

  let listTasks;
  if (listId) {
    listTasks = await db.Task.findAll({
      where: {
        user_id: {
          [Op.eq]: userId
        },
        list_id: {
          [Op.eq]: listId.id
        }
      }
    })
  } else {
    listTasks = await db.Task.findAll({
      where: {
        user_id: {
          [Op.eq]: userId
        }
      }
    })
  }

  let allTasks = []
  listTasks.forEach(ele => {
    allTasks.push(ele.task);
  })

  res.json({ tasks: allTasks })
}))

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
