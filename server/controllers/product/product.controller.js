const express = require("express");
const Category = require("../../models/categorySchema");
const Product = require("../../models/productSchema");

exports.getProdByCat = async (req, res) => {
  const cate = req.query.cat.toString();
  const result = await Product.find({ category: cate });
  const prods = result.map((doc) => {
    const prod = doc.toObject();
    prod._id = prod._id.toString();
    prod.image = "/images/product_images/" + prod._id + "/" + prod.image;
    return prod;
  });
  res.status(202).json(prods);
};

exports.productSearch = async (req, res) => {
  const serchVal = await req.query.search.toString();
  const result = await Product.find({
    slug: { $regex: serchVal, $options: "i" },
  });
  const prods = result.map((doc) => {
    const prod = doc.toObject();
    prod._id = prod._id.toString();
    prod.image = "/images/product_images/" + prod._id + "/" + prod.image;
    return prod;
  });
  res.status(202).json(prods);
};

exports.getCategories = async (req, res) => {
  const result = await Category.find();
  const cats = result.map((doc) => {
    const cat = doc.toObject();
    cat._id = cat._id.toString();
    return cat;
  });
  res.status(202).json(cats);
};
