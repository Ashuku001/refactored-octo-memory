

const graphQLClient = require("../../utils/graphqlClient/graphqlClient.js")
const { gql } = require("graphql-request");

const GET_SETTINGS = gql`
  query setting($username: String!){
    setting(username: $username){
        APP_ID
        APP_SECRET
        PHONE_NUMBER_ID
        BUSINESS_ACCOUNT_ID
        ACCESS_TOKEN
        API_VERSION
        WEBHOOK_VERIFICATION_TOKEN
        RECIPIENT_PHONE_NUMBER
    }
  }
`

async function getSettings(username) {
  if (username) {
    try {
      const variables = {username}
      const {setting} = await graphQLClient.request(GET_SETTINGS, variables)

      const appSettings = setting
      console.log(`SETTINGS FOR ${username}`, appSettings);
    

      return appSettings;
    } catch (error) {
      console.log("Failed to retrieve user settings>>>>>>>>>>");
      console.log(error);
    }
  } else {
    throw new Error("Failed to suppply the username");
  }
}

async function getVerificationToken(req) {
  const username = req.query["username"];

  if (username) {
    try {
      const settings = await getSettings(username).then((value) => {
        return value;
      });

      console.log(
        "WEBHOOK VERIFICATION>>>>>".bgGreen,
        settings.WEBHOOK_VERIFICATION_TOKEN
      );
      const verificationToken = settings.WEBHOOK_VERIFICATION_TOKEN;
      
      if (verificationToken) {
        return verificationToken;
      }
    } catch (error) {
      console.log("Error getting the verification token", error);
    }
  } else {
    console.log("Could not find a username in the callback url");
    throw new Error();
  }
}

async function getAppSecret(req) {
  const username = req.query["username"];
  if (username) {
    try {
      const settings = await getSettings(username).then((value) => {
        return value;
      });

      console.log("THE SETTINGS", settings);
      const appSecret = settings.APP_SECRET;
      console.log("app secret>>>>>", appSecret);
      if (appSecret) {
        return appSecret;
      }
    } catch (error) {
      console.log("Error getting the app secret");
      throw new Error(error);
    }
  } else {
    console.log("Could not find a username in the callback url");
    throw new Error();
  }
}

if (exports) {
  exports.getSettings = getSettings
  exports.getVerificationToken = getVerificationToken;
  exports.getAppSecret = getAppSecret;
}
