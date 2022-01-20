const express = require('express');
const session = require('express-session');
const router = express.Router();
const db = require('../db/models');
const { asyncHandler } = require('../routes/utils');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });




const router = express.Router();

router.post('/lists', csrfProtection, asyncHandler(async (req, res) => {
    const user = await req.session.user;
    const {
        name,
        user
    } = req.body;




    console.log('HELLLOOOOOO', user)
    res.send('hellooooo')
}))
