const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
  check('firstName').not().isEmpty().withMessage('First name is required'),
  check('lastName').not().isEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters')
];

exports.validateSigninRequest = [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters')
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()[0].msg})
  }
  next();
}