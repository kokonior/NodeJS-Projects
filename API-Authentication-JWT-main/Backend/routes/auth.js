const router = require("express").Router();
const controller = require("../Controllers/UserController");


// *************************** Register **************************************
router.post("/register", controller.Register);

// *************************** Login **************************************

router.post("/login", controller.Login);

module.exports = router;
