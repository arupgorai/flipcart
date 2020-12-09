const express = require('express');
const router = express.Router();
const { signup, signin, auth } = require('../../controller/admin/auth');


// signin
router.post('/admin/signin', signin);


// signup
router.post('/admin/signup', signup);

// profile
// router.get('/profile', auth, (req, res) => {
//   console.log("decoded user =>", req.user);
//   res.json({msg: 'proile api'});
// });

module.exports = router;