const { logger } = require("../../../helpers/logger");
const { sendWhatsAppMessage } = require("../../../utils/messageHelper");

const sendTemplateMessage = async (template, customer, merchant) => {
    try {
        let tempData = JSON.parse(template);

        const to = customer.dataValues.phone_number; // the whatsapp number
        tempData.to = to;
        let setting = await merchant.getSetting();
        setting = setting.dataValues;
        
        console.log("TEMPLATE DATA>>>>>>>>>",tempData)
        const { data: response } = await sendWhatsAppMessage(
          tempData,
          setting
        );

        console.log("After sending the template message".bgCyan, response)
        messageId = response.messages[0].id;

        return messageId
      } catch (error) {
        console.log(error.message);
        logger.log({
          level: "error",
          message: `[ERROR SENDING MESSAGE TO CUSTOMER] for ${merchant.id}`,
        });
      }
}

module.exports = {
    sendTemplateMessage: sendTemplateMessage
}