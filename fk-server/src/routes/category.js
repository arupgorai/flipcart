const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../controller/category');
const { auth, adminAuth } = require('../middleware');

router.post('/category/create', auth, adminAuth, addCategory);
router.get('/category/getCategory', getCategories);

module.exports = router;