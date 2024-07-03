const createCustomer = async (Customer, customer, merchantId) => {
  customer = await Customer.create({
    ...customer, // whatsapp_name and the phone number
  }).then((newCustomer) => {
    newCustomer.setMerchant(merchantId);
    return newCustomer;
  });
  return customer;
};

const createChat = async (Chat, customerId, merchantId) => {
  const chat = await Chat.create(
    {
     conversations: [
        {
          category: "marketing",
          expiryDate: null,
          status: "closed",
          conversationId: null,
          pricingModel: null,
        },
        {
          category: "authentication",
          expiryDate: null,
          status: "closed",
          conversationId: null,
          pricingModel: null,
        },
        {
          category: "utility",
          expiryDate: null,
          status: "closed",
          conversationId: null,
          pricingModel: null,
        },
        {
          category: "service",
          expiryDate: null,
          status: "closed",
          conversationId: null,
          pricingModel: null,
        },
      ],
    },
    {
      include: {
        association: "conversations",
      },
    }
  ).then(async (newChat) => {
    await Promise.all([
      newChat.setMerchant(merchantId),
      newChat.setCustomer(customerId),
    ]);
    return newChat;
  });

  return chat;
};

module.exports = {
  createCustomer: createCustomer,
  createChat: createChat,
};
