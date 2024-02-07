const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { createProduct, getAllProduct, getProductDetails } = require('../controllers/productController');
const router = express.Router();




router.route("/products").get(getAllProduct)
router.route("/product/:id").get(getProductDetails);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)



module.exports = router