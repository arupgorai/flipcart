const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.signup = (req, res) => {
  User
    .findOne({ email: req.body.email })
    .exec((error, user) => {
      if (error) {
        return res.status(500).json({
          message: 'Server Error'
        });
      }

      if (user) {
        return res.status(400).json({ message: 'Admin already registered'});
      }

      const {
        firstName,
        lastName,
        email,
        password
      } = req.body;

      const _user = new User({
        firstName,
        lastName,
        email,
        password,
        username: Math.random().toString(),
        role: 'admin'
      });

      _user.save((err, data) => {
        if (err) {
          return res.status(500).json({
            message: 'Server Error'
          });
        }

        if (data) {
          return res.status(201).json({
            message: 'Admin Registered Successfully'
          });
        }
      })
    });
}

exports.signin = (req, res) => {
  const {email, password} = req.body;

  User
    .findOne({ email })
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({
          message: 'Server Error'
        });
      }

      if (!user) {
        return res.status(404).json({
          message: 'Admin not found'
        });
      }

      if (user.authenticate(password) && user.role === 'admin') {
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
        const {_id, firstName, lastName, email, role, fullName} = user;

        res.status(200).json({
          token,
          user: {_id, firstName, lastName, email, role, fullName}
        });
      } else {
        return res.status(400).json({
          message: 'Invalid Credentials'
        });
      }
    });
}

exports.auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  // check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid'
    })
  }
}