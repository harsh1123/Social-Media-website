const express = require('express');

const router = express.Router();


const homeController = require('../controller/home_controller');

router.get('/',homeController.home);

router.use('/user',require('./user'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));


module.exports =router;