const express = require('express');

const router =express.Router();


const userController = require('../controller/user_controller');


router.get('/profile',userController.profile);




module.exports = router;