const { Router } = require("express");
const CommentController = require("../controllers/comment.controller");
const authMiddleware = require('../middlewares/authentication.middlewares');

const router = Router();
router.use(authMiddleware)
router.post("/:profileId/:postId", CommentController.createComment);
router.get("/", CommentController.showAllComment);
router.get("/:postId", CommentController.allCommentPost);
router.delete("/delete/:profileId/:postId/:commetId", CommentController.deleteComment);
router.put("/:profileId/:postId/:commetId", CommentController.updateComment);

module.exports = router;
