const express = require("express");
const router = express.Router();
const { sendEmail, sendBackEmail } = require("../controller/send-email-controler");

router.post('/', sendEmail)
router.post('/', sendBackEmail)

module.exports = router;