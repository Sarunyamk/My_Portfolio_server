const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controller/send-email-controler");

router.post('/', sendEmail)

module.exports = router;