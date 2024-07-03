const XHubSignature = require("x-hub-signature");
const {
  saveTextMessageToDB,
  saveImageMessageToDB,
  saveDocumentMessageToDB,
  saveVideoMessageToDB,
  updateChatStatus,
  saveReplyToButtonMessage,
  saveReplyToListMessage,
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
      console.log(statuses)
      console.log(statuses[0].errors)
      console.log("############STATUS OF THE SENT MESSAGE############");
      participants.customer.phone_number = statuses[0]?.recipient_id;
      try {
        updateChatStatus({
          participants,
          payload: { status: statuses[0].status, messageId: statuses[0]?.id },
        });
      } catch (error) {
        console.log(error);
      }

      if (statuses[0].conversation) {
        // the conversation the message is in once it expires this field is null
        console.log("MEE conversation>>>>: ", statuses[0].conversation);
        console.log("MSG conversation ID>: ", statuses[0].conversation.id);
        console.log(
          "MSG conExp ",
          statuses[0].conversation.expiration_timestamp
        ); // expiration timestamp
      }

      if (statuses[0].pricing) {
        // the pricing once the conversation expires this field is null
        console.log("MSG PRICING>>>>>>>>>: ", statuses[0].pricing);
        console.log(
          "MSG PRICING MODEL>>>: ",
          statuses[0].pricing.pricing_model
        );
        console.log("MSG PRICING CATEGORY: ", statuses[0].pricing.category);
      }
    } else if (value.messages) {
      let message = { message: {} };
      let customer = {};

      console.log("############RECEIVING A MESSAGE FROM CUSTOMER#############");

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
        console.log(
          "$$$$$$ AN INTERACTIVE TYPE MESSAGE from interactive button $$$$$$$$$"
        );
        const interactiveTemp = messages[0].interactive;
        if (interactiveTemp.type === "button_reply") {
          // support for button_reply interactiveTemp message
          console.log("$$$$$$ A BUTTON INTERACTIVE TYPE");
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
        } else if (interactiveTemp.type === "list_reply") {
          message.message["type"] = "LIST_REPLY";
          console.log("$$$$$$ A LIST INTERACTIVE TYPE");

          const temp = interactiveTemp.list_reply;
          const listReply = {
            buttonId: temp.id,
            title: temp.title,
            description: temp.description,
          };
          message["mesListReply"] = listReply; // the text that was sent
          payload.message = message;
          console.log(payload);
          try {
            await saveReplyToListMessage(payload);
          } catch (error) {
            console.log("could not save the message to database");
          }
        }
      } else if (message_type === "button") {
        message.message["type"] = "TEMP_REPLY";
        console.log("$$$$$$ AN BUTTON TYPE MESSAGE from template $$$$$$$$$");
        console.log("Interactive>>>>>>>: ", messages[0].button);
        const button = messages[0].button;
        const mesTempReply = {
          text: button.text,
          payload: button.payload,
        };
        message["mesTempReply"] = mesTempReply;
        payload.message = message;
        console.log("THE PAYLOAD", payload);
        try {
          await saveReplyToTemplateMessage(payload);
        } catch (error) {
          console.log("could not save the message to database");
        }
      } else if (message_type === "image") {
        // support for image type of message
        console.log("$$$$$$$$ AN IMAGE TYPE MESSAGE $$$$$$$$$$");
        const temp = messages[0].image;
        let image = {
          url: "https://res.cloudinary.com/dzeeuz5g6/image/upload/v1702201840/qa9iszb4ebczgxffka5n.jpg",
          imageId: temp.id,
          sha256: temp.sha256,
          mimeType: temp.mime_type,
        };

        if (temp.caption) {
          image["caption"] = temp.caption;
        }
        message.message["type"] = "IMAGE";
        message["image"] = image;
        console.log(message);
        payload.message = message;

        try {
          await saveImageMessageToDB(payload);
        } catch (error) {
          console.log("could not save the message to database");
        }
      } else if (message_type === "document") {
        // support for document type of message
        console.log("$$$$$$$$ AN DOCUMENT TYPE MESSAGE $$$$$$$$$$");

        // console.log("document>>>>>>>>>>: ", messages[0].document);
        const temp = messages[0].document;
        let document = {
          url: "https://cloud.appwrite.io/v1/storage/buckets/657c8507c305096354f8/files/657e55198a707f669611/download?project=657c827f1c5737986d84",
          documentId: temp.id,
          filename: temp.filename,
          mimeType: temp.mime_type,
          sha256: temp.sha256,
        };
        if (temp.caption) {
          document["caption"] = temp.caption;
        }
        message.message["type"] = "DOCUMENT";
        message["document"] = document;
        console.log(document);
        payload.message = message;

        try {
          await saveDocumentMessageToDB(payload);
        } catch (error) {
          console.log("could not save the message to database");
        }
      } else if (message_type === "video") {
        console.log("$$$$$$$$ AN VIDEO TYPE MESSAGE $$$$$$$$$$");
        const temp = messages[0].video;

        let video = {
          url: "",
          videoId: temp.id,
          mimeType: temp.mime_type,
          sha256: temp.sha256,
        };
        if (temp.caption) {
          video["caption"] = temp.caption;
        }
        message.message["type"] = "VIDEO";
        message["video"] = video;
        console.log(video);
        payload.message = message;

        try {
          await saveVideoMessageToDB(payload);
        } catch (error) {
          console.log("could not save the message to database");
        }
      } else if (message_type === "audio") {
        console.log("$$$$$$$$ AN audio TYPE MESSAGE $$$$$$$$$$");
        const audio = messages[0].audio;
        console.log("audio mime_type>: ", audio.mime_type);
        console.log("audio sha256>>>>>: ", audio.sha256);
        console.log("audio id>>>>>>>>>: ", audio.id);
        console.log("audio is voicd", audio.voice);
      } else if (message_type === "location") {
        console.log("$$$$$$$$ A Location TYPE MESSAGE $$$$$$$$$$");
        const location = messages[0].location;
        console.log(location);
        console.log("location address>: ", location.address);
        console.log("location latitude>>>>>: ", location.latitude);
        console.log("location name>>>>>>>>>: ", location.name);
        console.log("location url", location.url);
      }
    }
  }
}

if (exports) {
  exports.getPayload = getPayload;
}
