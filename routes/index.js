const express = require('express');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const csrfProtection = csurf({ cookie: true });

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Welcome to Remember the Bread' });
});

router.get('/log-in', csrfProtection, (req, res) => {
  res.render('log-in', { title: 'Log In!', csrfToken: req.csrfToken() });
})

router.get('/sign-up', csrfProtection, (req, res) => {
  res.render('sign-up', { title: 'Sign Up!'})
})

router.post('/log-in', csrfProtection, asyncHandler(async (req, res) => {

}))





module.exports = router;
