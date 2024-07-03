const {
  saveTextMessageToDB,
  updateChatStatus,
  saveReplyToButtonMessage,
  saveReplyToTemplateMessage,
} = require("./saveToDatabase/saveDataToDB.js");


async function getPayload(req) {
  const mer_username = req.query["username"]; // the merchant receiving the text from the webhook endpoint

  let participants = {
    mer_username: mer_username,
    customer: {
      phone_number: undefined,
    },
  };
  let payload = {
    contextMessage: undefined,
    message: undefined,
    participants: undefined,
  };

  let body = req.body;
  body = body.entry;

  if (body[0].changes[0].value) {
    const value = body[0].changes[0].value;

    if (value.statuses) {
      const statuses = value.statuses;

    } else if (value.messages) {
      let message = { message: {} };
      let customer = {};


      const messages = value.messages;
      console.log(messages);
      if (messages[0].context) {
        const context = messages[0].context;
        payload.contextMessage = { messageId: context.id };
      }

      customer["phone_number"] = messages[0].from;
      // set the customer and merchat being texted
      participants.customer = customer; // customer object with phone_number and whatsapp_name
      payload.participants = participants; 

      message.message["from_customer"] = true; // from customer to true
      message.message["timestamp"] = new Date().getTime(); // timestamp when meta received the message
      message.message["messageId"] = messages[0].id;
      message.message["status"] = "delivered";

      const message_type = messages[0].type;
      if (message_type === "text") {
        let text = { body: messages[0].text.body };
        message.message["type"] = "TEXT";
        message["text"] = text; // the text that was sent
        payload.message = message;

        try {
          await saveTextMessageToDB(payload);
        } catch (error) {
          console.log("could not save the message to database");
        }
      } else if (message_type === "interactive") {
        
        message.message["type"] = "BUTTON_REPLY";
        const interactiveTemp = messages[0].interactive;
        if (interactiveTemp.type === "button_reply") {
          // support for button_reply interactiveTemp message
          const temp = interactiveTemp.button_reply;

          const buttonReply = {
            buttonId: temp.id,
            title: temp.title,
          };

          message["mesBtnReply"] = buttonReply; // the text that was sent
          payload.message = message;
          try {
            await saveReplyToButtonMessage(payload);
          } catch (error) {
            console.log("could not save the message to database");
          }
        } 
      } else if (message_type === "button") {
        message.message["type"] = "TEMP_REPLY";
        const button = messages[0].button;
        const mesTempReply = {
          text: button.text,
          payload: button.payload,
        };
        message["mesTempReply"] = mesTempReply;
        payload.message = message;
        try {
          await saveReplyToTemplateMessage(payload);
        } catch (error) {
          console.log("could not save the message to database");
        }

      }   
    }
  }
}

if (exports) {
  exports.getPayload = getPayload;
}
