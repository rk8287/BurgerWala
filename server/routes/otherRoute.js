const { contact } = require ('../controllers/otherController')
const express = require('express');
const router = express.Router();


router.route('/contact').post(contact)




module.exports = router;