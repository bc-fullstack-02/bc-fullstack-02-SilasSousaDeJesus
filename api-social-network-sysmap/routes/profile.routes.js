const { Router } = require("express");
const ProfileController = require("../controllers/profile.controller");

const router = Router();

router.post("/:userId", ProfileController.createProfile);
router.get("/showAllProfile", ProfileController.showAllProfile);
router.get("/:idProfile", ProfileController.showProfile);
router.put("/:userId/:idProfile", ProfileController.updateProfile);
router.delete("/:userId/:idProfile", ProfileController.deleteProfile);

router.post("/follow/:profileCurrentId/:profileTargetId", ProfileController.follow);
router.post("/unfollow/:profileCurrentId/:profileTargetId", ProfileController.unfollow);


module.exports = router;
