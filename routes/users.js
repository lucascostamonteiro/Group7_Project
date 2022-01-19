const express = require('express')
const router = express.Router();
const db = require('../db/models');


/* GET users listing. */
// router.get('/', async (req, res, next) => {
//   console.log(req.params.userId)
//   const user = await db.User.findByPk(req.params.userId)
//   res.send(`Welcome ${user.firstName}!`);
// });












module.exports = router;
