

const graphQLClient = require("../../utils/graphqlClient/graphqlClient.js")
const { gql } = require("graphql-request");

const GET_SETTINGS = gql`
  query setting($username: String!){
    setting(username: $username){
        app_id
        app_secret
        phone_number_id
        business_account_id
        access_token
        api_version
        webhook_verification_token
        phone_number
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
        settings.webhook_verification_token
      );
      const verificationToken = settings.webhook_verification_token;
      
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
      const appSecret = settings.app_secret;
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
