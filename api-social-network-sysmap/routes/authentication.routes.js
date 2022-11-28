const { Router } = require("express");
const AuthenticationController = require("../controllers/authentication.controller");

const router = Router();

router.post("/", AuthenticationController.login);


module.exports = router;