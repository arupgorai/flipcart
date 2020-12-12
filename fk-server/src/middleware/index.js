const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  // console.log("token =>", token);
  // check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded =>", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid'
    })
  }
}

exports.userAuth = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(400).json({message: 'User Access Denied'});
  };
  next();
};

exports.adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(400).json({message: 'Admin Access Denied'});
  };
  next();
};