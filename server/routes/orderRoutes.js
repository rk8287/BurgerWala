const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/auth');
const { myOrder, newOrder, getOrderDetails } = require('../controllers/orderController');
const router = express.Router();


router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrder);

router.get("/order/:id", isAuthenticatedUser, getOrderDetails);

module.exports = router;