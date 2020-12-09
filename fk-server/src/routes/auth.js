const express = require('express');
const router = express.Router();
const { signup, signin, auth } = require('../controller/auth');


// signin
router.post('/signin', signin);


// signup
router.post('/signup', signup);

// profile
router.get('/profile', auth, (req, res) => {
  console.log("decoded user =>", req.user);
  res.json({msg: 'proile api'});
});

module.exports = router;