const express = require("express");
const router = express.Router();
const { sendEmail, sendBackEmail } = require("../controller/send-email-controler");

router.post('/', sendEmail)
router.post('/back', sendBackEmail)

module.exports = router;