const Product = require('../models/Product');
const shortid = require('shortid');
const slugify = require('slugify');

exports.createProduct = (req, res) => {
  const {
    name,
    price,
    description,
    category,
    createdBy,
    quantity,
  } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map(file => ({ img: file.filename }));
  }

  const product = new Product({
    name,
    slug: slugify(name),
    price,
    description,
    productPictures,
    category,
    quantity,
    createdBy: req.user._id
  });

  product
    .save((err, product) => {
      if (err) {
        return res.status(500).json({
          message: 'Server Error'
        });
      }

      if (product) {
        res.status(201).json({
          product
        });
      }
    })
};