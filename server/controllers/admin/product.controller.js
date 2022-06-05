const express = require("express");
const Category = require("../../models/categorySchema");
const Product = require("../../models/productSchema");

exports.saveProduct = async (req, res) => {
  const product = req.body;
  const productData = await Product.findOne({ slug: product?.slug });
  if (productData) {
    productData.title = product.title;
    productData.slug = product.title.replace(/\s+/g, "-").toLowerCase();
    productData.desc = product.desc;
    productData.category = product.category;
    productData.price = product.price;
    productData.order = product.order;
    try {
      await productData.save();
      return res.status(200).json({
        success: true,
        message: "Product Updated.",
      });
    } catch (e) {
      return res.status(200).json({
        success: false,
        message: "Product Not Updated.",
        error: e,
      });
    }
  } else {
    let slug = product.title.replace(/\s+/g, "-").toLowerCase();
    const newProduct = await new Product({
      title: product.title,
      slug: slug,
      desc: product.desc,
      category: product.category,
      price: product.price,
    });
    try {
      await newProduct.save();
      return res.status(200).json({
        success: true,
        message: "Product Created.",
      });
    } catch (e) {
      return res.status(200).json({
        success: false,
        message: "Product Not Created.",
        error: e,
      });
    }
  }
};

exports.deleteProdById = async (req, res) => {
  const deletedProduct = await Product.findById(req.query.id);
  try {
    deletedProduct.delete();
    return res.status(200).json({
      success: true,
      message: "Product Deleted.",
    });
  } catch (e) {
    return res.status(200).json({
      success: false,
      message: "Product not Deleted.",
      error: e,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  const prods = products.map((doc) => {
    const prod = doc.toObject();
    prod._id = prod._id.toString();
    prod.image = "/images/product_images/" + prod._id + "/" + prod.image;
    return prod;
  });
  return res.status(200).json({
    success: true,
    message: "Products Fetched.",
    products: prods,
  });
};
