const { Router } = require("express");
const PostController = require("../controllers/post.controller");
const authMiddleware = require('../middlewares/authentication.middlewares');

const router = Router();

router.use(authMiddleware)
router.get("/", PostController.showAllPost);
router.post("/:profileId", PostController.createPost);
router.get("/timeLine/:userId", PostController.timelime);
router.get("/feed/:profileId", PostController.feedProfile);
router.post("/like/:currentProfileId/:postTargetId", PostController.like);
router.post("/deslike/:currentProfileId/:postTargetId", PostController.deslike);
router.get("/onepost/:postId", PostController.showOnePost);
router.put("/update/:profileId/:postId", PostController.updatePost);
router.delete("/delete/:profileId/:postId", PostController.deletePost);


module.exports = router;
