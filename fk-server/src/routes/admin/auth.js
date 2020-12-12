const express = require('express');
const router = express.Router();
const { signup, signin } = require('../../controller/admin/auth');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth');


// signin
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);


// signup
router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);

// profile
// router.get('/profile', auth, (req, res) => {
//   console.log("decoded user =>", req.user);
//   res.json({msg: 'proile api'});
// });

module.exports = router;