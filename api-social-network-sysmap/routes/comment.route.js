const { Router } = require("express");
const CommentController = require("../controllers/comment.controller");

const router = Router();

router.get("/", CommentController.showAllComment);
router.get("/:userId", CommentController.showAllUserComment);
router.get("/:userId/:postId/:commetId", CommentController.allCommentUserPost);
router.post("/:userId/:postId", CommentController.createComment);
router.put("/:userId/:postId/:commetId", CommentController.updateComment);
router.delete("/delete/:userId/:postId/:commetId", CommentController.deleteComment);

module.exports = router;
