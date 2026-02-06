import Product from "../models/productModel.js";
import HandleError from "../helper/handleError.js";
import APIHelper from "../helper/APIHelper.js";

//Create and export controller functions
export const addProducts = async (req, res) => {
  req.body.user = req.user.id;
  //console.log(req.body);
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

//Get all products from DB
//http://localhost:8000/api/v1/products?Keyword=Samsung
export const getAllProducts = async (req, res, next) => {
  try {
    const resultPerPage = 4;

    const apiHelper = new APIHelper(Product.find(), req.query)
      .search()
      .filter();

    const totalProducts = await Product.countDocuments();

    apiHelper.paginate(resultPerPage);
    const products = await apiHelper.query;

    res.status(200).json({
      success: true,
      products,
      productsCount: totalProducts,
      resultPerPage,
    });
  } catch (error) {
    console.error("getAllProducts error:", error);
    next(error);
  }
};

// update product details
export const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!product) {
    //return res.status(500).json({success: false,message: "product not found"
    return next(new HandleError("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
};

//delete product
export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new HandleError("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product Delect Sucess",
  });
};

//get single product details
export const getSingleProduct = async (req, res, next) => {
  //console.log(req.params.id);
  const id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }
  return res.status(200).json({ success: true, product });
};

//Create Product Review
export const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }
  const isReviewed = product.reviews.find(
    (review) => review.user.toString() == req.user._id.toString(),
  );
  if (isReviewed) {
    //update review
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
        isReviewed.comment = comment;
      }
    });
  } else {
    //create review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  //Upadate review counting
  product.numOfReviews = product.reviews.length;
  let sum = 0;
  product.reviews.forEach((review) => {
    sum += review.rating;
  });

  product.ratings =
    product.reviews.length > 0 ? sum / product.reviews.length : 0;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    product,
  });
};

//view Product Reviews
export const viewProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

// Admin  View All Products
export const getAllProductsByAdmin = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

// Delete Review By Admin
export const deleteProductReview = async (req, res, next) => {
  console.log(req.query);
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString(),
  );
  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  const ratings = reviews.length > 0 ? sum / reviews.length : 0;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    },
  );
  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
};
