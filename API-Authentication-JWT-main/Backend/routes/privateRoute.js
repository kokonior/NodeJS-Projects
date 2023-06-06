const router = require("express").Router();
const controller = require("../Controllers/UserController");


router.get('/private', verify, controller.Private);

module.exports = router;
 