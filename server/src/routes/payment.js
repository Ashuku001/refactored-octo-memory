const express = require("express");
const router = express.Router();
const {messageStatuses} = require("../utils/messageStatuses.js"); // check read received etc
const XHubSignature = require("x-hub-signature");
const { generate_access_token, generate_password } = require("./payment-routes/mpesa/access_token.js");

router.post("/", async function (req, res, next) {
    console.log("A POST REQUEST FROM MPESA".green, req.get("host"))
});

// a get request from whatsapp to verify our verification token
router.get("/", async (req, res, next) => {
    console.log("A GET REQUEST FROM MPESA".green, req.get("host"))
});

module.exports = router;
