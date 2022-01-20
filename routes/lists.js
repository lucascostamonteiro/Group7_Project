const express = require('express');
const session = require('express-session');
const db = require('../db/models');
const { asyncHandler } = require('../routes/utils');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });




const router = express.Router();

router.post('/', asyncHandler(async (req, res, next) => {
    const userId = await req.session.user.userId;
    const name = req.body;

    console.log(userId, req.body.input);

    const listCreate = await db.List.create({
      user_Id: userId,
      name: req.body.input,
      completed: false
    });

    res.json({ message: 'Success' })
}))










module.exports = router;
