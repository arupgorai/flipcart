const slugify = require('slugify');
const Category = require('../models/Category');

// create recursive category
const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;

  if (parentId === null) {
    category = categories.filter(cat => cat.parentId == undefined);
  } else {
    category = categories.filter(cat => cat.parentId == parentId);
  }

  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: createCategories(categories, cat._id)
    });
  }

  return categoryList;
}

exports.addCategory = (req, res) => {
  const {name, parentId} = req.body;

  const catObj = {
    name,
    slug: slugify(name),
  }

  if (parentId) {
    catObj.parentId = parentId
  };

  const cat = new Category(catObj);

  cat.save((err, category) => {
    if (err) {
      return res.status(500).json({
        message: 'Server Error'
      });
    }

    if (category) {
      return res.status(201).json({
        category
      });
    }
  });
}

exports.getCategories = (req, res) => {
  Category
    .find({})
    .exec((err, categories) => {
      if (err) {
        return res.status(500).json({
          message: 'Server Error'
        });
      }

      if (categories) {
        const categoryList = createCategories(categories);
        res.status(200).json({ categoryList });
      }
    })
}