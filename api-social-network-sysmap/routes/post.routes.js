const { Router } = require("express");
const PostController = require("../controllers/post.controller");

const router = Router();

router.post("/:userId", PostController.createPost);
router.post("/:currentProfileId/:postTargetId", PostController.like);
router.post("/:currentProfileId/:postTargetId", PostController.deslike);
router.get("/", PostController.showAllPost);
router.get("/timeLine/:userId", PostController.timelime);
router.get("/allposts/:userId", PostController.showAllUserPosts);
router.get("/onepost/:userId/:postId", PostController.showOneUserPost);
router.put("/update/:userId/:postId", PostController.updatePost);
router.delete("/delete/:userId/:postId", PostController.deletePost);

module.exports = router;
