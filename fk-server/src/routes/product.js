const express = require('express');
const { auth, adminAuth } = require('../middleware');
const { createProduct } = require('../controller/product');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, shortid.generate() + '-' + file.originalname)
  }
});

const upload = multer({ storage });


router.post('/product/create', auth, adminAuth, upload.array('productPicture'), createProduct);

// router.get('/category/getCategory', getCategories);

module.exports = router;