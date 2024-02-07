const express = require('express');
const { registerUser, loginUser, logoutUser, getUserDetails, updatePassword, updateProfile } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();


router.route('/register',).post(registerUser);

router.route('/login',).post(loginUser);

router.route('/logout',).get(logoutUser);

router.route('/me',).get(isAuthenticatedUser,getUserDetails);

router.route('/password/update',).put(isAuthenticatedUser,updatePassword);

router.route('/profile/update',).put(isAuthenticatedUser,updateProfile);






module.exports = router