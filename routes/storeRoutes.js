const express=require('express');
const storeController = require('../controllers/storeController')

const router=express.Router();

router.route('/').get(storeController.getAllProducts)
router.route('/static').get(storeController.getAllProductsStatic)

module.exports=router;
