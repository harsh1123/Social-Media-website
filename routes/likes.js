const express = require('express');

const router = express.Router();

const LikeController = require('../controller/like_controller');


router.get('/toggle',LikeController.toggleLike);


module.exports = router;