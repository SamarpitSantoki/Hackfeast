const express = require('express')
const Category = require('../../models/categorySchema')
const Product = require('../../models/productSchema')

exports.saveProduct = async(req, res) => {
  const product = req.body;

  const { title, desc, category, price, image } = product;
  const productData = await Product.findOne({ slug: title });
  let active_ids = (await Product.countDocuments({})) + 1;
  if (productData) {
    return res.status(401).json({
      message: "Product already exists",
    });
  } else {
    const newProduct = await new Product({
      id: active_ids++,
      title: title,
      desc: desc,
      category: category,
      price: price,
      image: image,
    });
    await newProduct.save();
    const resProductData = {
      title: newProduct.title,
      desc: newProduct.desc,
      category: newProduct.category,
      price: newProduct.price,
      image: newProduct.image,
    };
    return res.status(200).json({
      message: "Product created successfully",
      product: resProductData,
      success: true,
    });
  }
  return res.status(400).json({
    message: "Product not created",
    success: false,
  });
}

exports.deleteProdById = async(req, res) => {
    const id = req.query.id;

    const product = await Product.findOne({ slug: id });
    res.json([product]);
}

exports.getProdByCat = async(req, res) => {
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

exports.productSearch = async(req, res) => {
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

