const express = require('express');

const router =express.Router();

const passport = require('passport');


const userController = require('../controller/user_controller');


router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);


router.get('/signup',userController.signUp);
router.get('/signin',userController.signIn);
router.post('/create',userController.create);

router.post('/create-session',passport.authenticate(
  'local',
  {failureRedirect:'/users/signin'}

    
),userController.createSession);


router.get('/signout',userController.destroySession);


module.exports = router;