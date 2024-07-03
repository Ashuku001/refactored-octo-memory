// incoming webhooks from whatsapp this is when a message has been send by user to your business account
// handlw incoming webhooks
const express = require("express");
const router = express.Router();
const {messageStatuses} = require("../utils/messageStatuses.js"); // check read received etc
const XHubSignature = require("x-hub-signature");
const processMessage = require("../utils/processMessage.js");
const {
  sendWhatsAppMessage,
} = require("../utils/messageHelper.js");
const {
  getVerificationToken,
  getSettings,
} = require("./helper/helpers.js");
const {getPayload} = require('../utils/destructureWebhook.js')

router.post("/", async function (req, res, next) {
  const username = req.query["username"]

  const appSettings = await getSettings(username).then((value) => {
                      return value;
                    });

  const appSecret = appSettings.APP_SECRET;

  const xhub = new XHubSignature("SHA256", appSecret);
  
  // Calculate x-hub signature value to check with value in request header
  const calcXHubSignature = xhub.sign(req.rawBody).toLowerCase();
  console.log("AOO SECRE>>>>>", appSecret, xhub, calcXHubSignature, req.headers["x-hub-signature-256"])

  //verify the signatures agains the app secret confirm the request is coming from whatsapp
  if (req.headers["x-hub-signature-256"] != calcXHubSignature) {
    console.log(
      "Warning - request header X-Hub-Signature not present or invalid"
    );
    res.sendStatus(401);
    return;
  }

  // the signature has passed validation
  console.log("request header X-Hub-Signature validated");

  // get the object which has contact value and the messages
  const body = req.body.entry[0].changes[0];
  getPayload(req)

  // Verify this is from the messages webhook, not other updates(the webhook that we choose when adding our callback url)
  if (body.field !== "messages") {
    // not from the messages webhook so dont process
    return res.sendStatus(400);
  }

  // in the list of changes[0] we have a key messages
  if (body.value.hasOwnProperty("messages")) {
    // Mark an incoming message as read
    // try {
    //   // let sendDeliveredStatus = messageStatuses.delivered; //for the message statuses we have a read status
      
    //   // sendDeliveredStatus.message_id = body.value.messages[0].id; // add id of the message received to the read status
    //   // await sendWhatsAppMessage(sendDeliveredStatus, appSettings); // inform the user that the message has been read through the API
    // } catch (error) {
    //   console.log("####################Error sending read status###################");
    //   console.log(error);
    // }

    // call the processMessage utility function to determine the response for the message we have received
    body.value.messages.forEach((message) =>  processMessage(message, appSettings));
  }

  res.sendStatus(200);
});

// a get request from whatsapp to verify our verification token
router.get("/", async (req, res, next) => {
  const verificationToken = await getVerificationToken(req).then((value) => {
    return value;
  });

  console.log("VERIFICATION TOKEN", verificationToken);
  console.log("queries in Get", req.query);

  if (
    req.query["hub.mode"] == "subscribe" &&
    req.query["hub.verify_token"] == verificationToken
  ) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
