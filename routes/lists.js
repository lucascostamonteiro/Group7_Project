const express = require('express');
const session = require('express-session');
const db = require('../db/models');
const { asyncHandler } = require('../routes/utils');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });




const router = express.Router();

router.post('/', asyncHandler(async (req, res, next) => {
    const user = await req.session.user;
    const { name, input } = req.body;
    const list =
    console.log('HELLLOOOOOO', user, req.body)
    res.json({ message: 'Success' })
    // res.redirect(`/${user.userId}`, { user })
}))










module.exports = router;
