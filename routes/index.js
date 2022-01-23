const express = require('express');
const csurf = require('csurf');
const db = require('../db/models');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { asyncHandler, demoLogin } = require('../routes/utils');
const csrfProtection = csurf({ cookie: true });

const router = express.Router();


const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an email address')
    .isEmail()
    .withMessage('Email Address is not a valid email'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password')
];

const userValidators = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name')
    .isLength({ max: 50 })
    .withMessage('First Name must not be more than 50 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Last Name')
    .isLength({ max: 50 })
    .withMessage('Last Name must not be more than 50 characters long'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 255 })
    .withMessage('Email address must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email address is not a valid email')
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email address is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character ("!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
];

router.get('/log-out', (req, res) => {
  delete req.session.user;
  req.session.save(() => {
    res.redirect('/')
  })
})

router.use((req, res, next) => {
  if (req.session.user) {
    res.redirect(`/${req.session.user.userId}`)
  } else {
    next()
  }
})

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/log-in', csrfProtection, (req, res) => {
  res.render('log-in', { title: 'Log In!', errors: [], csrfToken: req.csrfToken() });
});

router.get('/sign-up', csrfProtection, (req, res) => {
  res.render('sign-up', { title: 'Sign Up!', errors: [], csrfToken: req.csrfToken() });
});

router.post('/sign-up', csrfProtection, userValidators, asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = db.User.build({
    firstName,
    lastName,
    email
  })
  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    req.session.user = { userId: user.id }
    res.redirect(`/${user.id}`);
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    if (errors.length > 0) {
      res.render('sign-up', {
        title: 'Sign-Up',
        body: req.body,
        errors,
        firstName,
        lastName,
        email,
        csrfToken: req.csrfToken()
      });
      return
    }
  }
}));


router.post('/log-in', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await db.User.findOne({ where: { email } });

    if (user !== null) {

      const passwordMatch = await bcrypt.compare(password, user.password.toString());
      if (passwordMatch) {

        req.session.user = { userId: user.id, email: user.email }

        return res.redirect(`/${user.id}`);
      }
    }
    errors.push('Login failed');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }
  if (errors.length > 0) {
    res.render('log-in', {
      title: 'Login',
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

router.post('/demo', asyncHandler(async (req, res) => {
  req.session.user = { userId: 1, email: "alec@alec.alec" }
  // req.session.save(() => res.redirect(req.session.user.userId));
  req.session.save(() => res.json({ message: "Success" }));
}));


module.exports = router;
