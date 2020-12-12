const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controller/auth');
const {auth} = require('../middleware');
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated
} = require('../validators/auth');


// signin
router.post('/signin', validateSigninRequest, isRequestValidated, signin);


// signup
router.post('/signup', validateSignupRequest, isRequestValidated, signup);

// profile
router.get('/profile', auth, (req, res) => {
  console.log("decoded user =>", req.user);
  res.json({msg: 'proile api'});
});

module.exports = router;