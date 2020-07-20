const express = require('express');

const router =express.Router();


const userController = require('../controller/user_controller');


router.get('/profile',userController.profile);

router.get('/signup',userController.create);
router.get('/signin',userController.createSession);




module.exports = router;