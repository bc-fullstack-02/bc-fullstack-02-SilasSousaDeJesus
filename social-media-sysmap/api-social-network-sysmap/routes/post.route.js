const { Router } = require("express");
const PostController = require("../controllers/post.controller");
// const upload = require('../Middlewares/imageUploader');

const router = Router();
// const multipleUpload = upload.fields([{ name: 'coverpicture' }, { name: 'profilepicture'}]);

router.post("/:userId", PostController.createPost);
router.get("/", PostController.showAllPost);
router.get("/allposts/:userId", PostController.showAllUserPosts);
router.get("/onepost/:userId/:postId", PostController.showOneUserPost);
router.put("/update/:userId/:postId", PostController.updatePost);
router.delete("/delete/:userId/:postId", PostController.deletePost);

module.exports = router;
