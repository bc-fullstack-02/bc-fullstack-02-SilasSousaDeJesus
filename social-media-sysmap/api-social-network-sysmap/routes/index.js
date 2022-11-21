const { Router } = require('express');
const userRoute = require('./user.route');
const postRoute = require('./post.route');
const commentRoute = require('./comment.route');

const router = Router();

router.use(userRoute);
router.use(postRoute);
router.use(commentRoute);



module.exports = router;