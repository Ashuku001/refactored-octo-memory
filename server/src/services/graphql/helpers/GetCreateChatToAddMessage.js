const { logger } = require("../../../helpers/logger");
const { getCustomer, getCusByNumber, getChat } = require("./getModels.js");
const { createCustomer, createChat } = require("./createModels.js");
const { sendTemplateMessage } = require("./sendTemplateMessage");

const getCreateChatForMessage = async ({
  Merchant,
  Customer,
  Chat,
  Message,
  InteractiveMessage = undefined,
  InteractiveButton = undefined,
  InteractiveList = undefined,
  InteractiveTemplate = undefined,
  ListSection = undefined,
  participants = undefined,
  message,
  context,
  customerId = undefined,
  template = undefined,
  contextMessage = undefined,
}) => {
  let chatId = null;
  let customer = undefined;
  let merchant = undefined;
  let chat = undefined;
  let addNewChat = false;
  let messageId = null;
  let contextedMessage = null;

  if (participants) {
    // find or create new chat for the message received from webhook
    const mer_username = participants.mer_username;
    const cus_phone_number = participants.customer.phone_number;

    merchant = await Merchant.findOne({
      where: {
        username: mer_username,
      },
    });

    if (!merchant) {
      throw new Error(
        "Could not get merchant from received webhook",
        mer_username
      );
    }

    customer = await getCusByNumber(Customer, cus_phone_number, merchant.id);

    if (!customer) {
      customer = await createCustomer(
        Customer,
        {...participants.customer, status: "new"},
        merchant.id,
        "new"
      );
    }
    chat = await getChat(Chat, customer.id, merchant.id);

    console.log("CUSTOMER and merchant".bgBlue, customer.id , merchant.id)

    if (!chat) {
      try {
        chat = await createChat(Chat, customer.id, merchant.id);
        addNewChat = true;
      } catch (error) {
        logger.log({
          level: "error",
          message: `[ERROR CREATING CHAT] from webhook for, ${merchant.id}`,
        });
      }
    }
    console.log("THE CHAT",chat)
  } else {
    try {
      // find or create chat for message from merchant to customer
      chatId = message.message.chatId;
      merchant = context.merchant;
      if (!chatId || chatId < 0) {
        customer = await getCustomer(Customer, customerId, merchant.id); // merchant creating new chat with customer
        if (!customer) {
          throw new Error(
            "Customer not found make sure the customer is in your customer list."
          );
        }
        if (customer) {
          chat = await getChat(Chat, customer.id, merchant.id);

          if (!chat) {
            chat = await createChat(Chat, customer.id, merchant.id);
            addNewChat = true;
          }
        }

      } else {
        chat = await Chat.findOne({
          where: {
            id: chatId,
          },
          include: [
            {
              model: Customer,
            },
            {
              model: Merchant,
            },
          ],
        });
        customer = await chat.getCustomer();
        merchant = await chat.getMerchant();
      }
    } catch (error) {
      logger.log({
        level: "error",
        message: `ERROR CREATING OR GETTING CHAT FOR MERCHANT, ${new Date().toDateString()}`,
      });
    }

    // send the template message
    if (template) {
      console.log(template)
      messageId = await sendTemplateMessage(template, customer, merchant);
    }
  }

  if (contextMessage) {
    if (InteractiveButton) {
      console.log("inCluding button");
      contextedMessage = await Message.findOne({
        where: {
          messageId: contextMessage.messageId,
          chatId: chat.id,
        },
        include: [
          {
            model: InteractiveMessage,
            as: "interactive",
            required: true,
            include: [
              {
                model: InteractiveButton,
                as: "button",
                required: true,
                include: ["buttons"],
              },
            ],
          },
        ],
      });
    } else if (InteractiveList) {
      contextedMessage = await Message.findOne({
        where: {
          messageId: contextMessage.messageId,
          chatId: chat.id,
        },
        include: [
          {
            model: InteractiveMessage,
            as: "interactive",
            required: true,
            include: [
              {
                model: InteractiveList,
                as: "list",
                include: [
                  {
                    model: ListSection,
                    as: "sections",
                    include: ['rows']
                  },
                ],
              },
            ],
          },
        ],
      });
    } else if (InteractiveTemplate){
      contextedMessage = await Message.findOne({
        where: {
          messageId: contextMessage.messageId,
          chatId: chat.id,
        },
        include: [
          {
            model: InteractiveMessage,
            as: "interactive",
            required: true,
            include: [
              {
                model: InteractiveTemplate,
                as: "template",
                required: true,
              },
            ],
          },
        ],
      });
    }
    else {
      contextedMessage = await Message.findOne({
        where: {
          messageId: contextMessage.messageId,
          chatId: chat.id,
        },
      });
    }
  }

  return {
    customer,
    merchant,
    chat,
    addNewChat,
    messageId,
    contextedMessage,
  };
};

module.exports = {
  getCreateChatForMessage: getCreateChatForMessage,
};
