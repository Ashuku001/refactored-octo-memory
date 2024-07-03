const axios = require("axios");
const { logger } = require("../../../helpers/logger");
const moment = require("moment");
// Node.js doesn't have `window.btoa`, so use `btoa` from the package

const generate_access_token = async ({
  consumer_key = null,
  consumer_secret = null,
}) => {
  if (!consumer_key && !consumer_secret) {
    logger.log({
      level: "error",
      message: "Consumer key and consumer key not passed",
    });
    return;
  }

  const authHeader = "Basic " + btoa(`${consumer_key}:${consumer_secret}`);
  try {
    const access_token = await axios
      .get(process.env.mpesa_cridential, {
        headers: {
          Authorization: authHeader,
        },
      })
      .then((response) => {
        console.log("Data:", response.data);
        return response.data.access_token;
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });

    return access_token;
  } catch (error) {
    console.log("[ERROR GETTING AUTHENTICATION TOKEN]", error.message);
    logger.log({
      level: "error",
      message: error.message,
    });
  }
};

const generate_password = ({ business_shortcode = null, pass_key = null }) => {
  const date = new Date();
  const timestamp = moment().format("YYYYMMDDHHmmss");
  const encode = business_shortcode.toString() + pass_key + timestamp;

  const encoded_string = new Buffer.from(encode, "utf-8").toString("base64");

  return { password: encoded_string, timestamp: timestamp };
};

const keys = {
  business_shortcode: process.env.business_shortcode,
  pass_key: process.env.pass_key,
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
};

const initiate_payment = async ({
  recipient = null,
  initiator = {
    account_reference: "",
    transaction_desc: "",
  },
}) => {
  const access_token = await generate_access_token({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
  });

  const { password, timestamp } = generate_password({
    business_shortcode: keys.business_shortcode,
    pass_key: keys.pass_key,
  });

  const body = {
    BusinessShortCode: Number(keys.business_shortcode),
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: 1,
    PartyA: Number(recipient),
    PartyB: Number(keys.business_shortcode),
    PhoneNumber: Number(recipient),
    CallBackURL: process.env.mpesa_callbackURL,
    AccountReference: initiator.account_reference,
    TransactionDesc: initiator.transaction_desc,
  };


  console.log(access_token);
  console.log(body);

  try {
    const response = await axios.post(
      process.env.mpesa_stk_push,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
        body: JSON.stringify(body)
      }
    );
    return response;
  } catch (error) {
    console.log("[MPESA PAYMENT INITIATION ERROR]", {
      code: error.message,
      message: error.response.data.message,
    });
    logger.log({
      level: "error",
      message: `[MPESA PAYMENT INITIATION ERROR], {message: ${error.message}, data: ${error.response?.data}}`,
    });
  }
};

// initiate_payment({
//   recipient: process.env.recipient_phone_number,
//   initiator: {
//     account_reference: "Ashuku & Co",
//     transaction_desc: "Make payment for order number 0000434",
//   },
// }); 

if (exports) {
  exports.generate_access_token = generate_access_token;
  exports.generate_password = generate_password;
}
