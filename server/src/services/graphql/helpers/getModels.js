
const getStore = async (Store, storeId, merchantId) => {
  const store = await Store.findOne({
    where: {
      id: parseInt(storeId),
    },
  });
  return store;
};

const getDupStore = async (Store, name, merchantId) => {
  const store = await Store.findOne({
    where: {
      name: name,
      merchantId: parseInt(merchantId),
    },
  });
  return store;
};

const getBillboard = async (Billboard, billboardId) => {
  const billboard = await Billboard.findOne({
    where: {
      id: parseInt(billboardId),
    },
  });

  return billboard;
};

const getDupBillboard = async (Billboard, label, storeId) => {
  const billboard = await Billboard.findOne({
    where: {
      label: label,
      storeId: parseInt(storeId),
    },
  });

  return billboard;
};

const getProduct = async (Product, productId) => {
  const product = await Product.findOne({
    where: {
      id: parseInt(productId),
    },
  });

  return product;
};

const getDupProduct = async (Product, name, categoryId) => {
  const product = await Product.findOne({
    where: {
      name: name,
      categoryId: parseInt(categoryId),
    },
  });

  return product;
};

const getCategory = async (Category, categoryId) => {
  const category = await Category.findOne({
    where: {
      id: parseInt(categoryId),
    },
  });

  return category;
};

const getDupCategory = async (Category, name, billboardId) => {
  const category = await Category.findOne({
    where: {
      name: name,
      billboardId: parseInt(billboardId),
    },
  });

  return category;
};

const getSize = async (Size, sizeId) => {
  const size = await Size.findOne({
    where: {
      id: parseInt(sizeId),
    },
  });

  return size;
};

const getDupSize = async (Size, name, storeId) => {
  const size = await Size.findOne({
    where: {
      name: name,
      storeId: storeId,
    },
  });

  return size;
};

const getColor = async (Color, colorId) => {
  const color = await Color.findOne({
    where: {
      id: parseInt(colorId),
    },
  });

  return color;
};

const getDupColor = async (Color, name, storeId) => {
  const color = await Color.findOne({
    where: {
      name: name,
      storeId: parseInt(storeId),
    },
  });

  return color;
};

const getCustomer = async (Customer, customerId, merchantId) => {
  const customer = await Customer.findOne({
    where: {
      id: parseInt(customerId),
      merchantId: parseInt(merchantId),
    },
  });

  return customer;
};

const getCusByNumber = async (Customer, phone_number, merchantId) => {
  const customer = await Customer.findOne({
    where: {
      phone_number: phone_number,
      merchantId: parseInt(merchantId),
    },
  });

  return customer;
};

const getChat = async (Chat, customerId, merchantId, chatId = undefined) => {
  let chat = null;
  if (chatId !== undefined) {
    chat = await Chat.findOne({
      where: {
        merchantId: parseInt(merchantId), // this is unique
        id: parseInt(chatId),
      },
    })
  } else if(customerId && merchantId)(
    chat = await Chat.findOne({
      where: {
        merchantId: parseInt(merchantId), // this is unique
        customerId: parseInt(customerId),
      },
    })
  )

  return chat;
};

const getMessage = async (Message, customerId, merchantId, chatId = undefined) => {
  let message = null;
  if (chatId !== undefined) {
    message = await Message.findOne({
      where: {
        merchantId: parseInt(merchantId), // this is unique
        id: parseInt(chatId),
      },
    })
  } else if(customerId && merchantId)(
    message = await Message.findOne({
      where: {
        merchantId: parseInt(merchantId), // this is unique
        customerId: parseInt(customerId),
      },
    })
  )

  return message;
};

const getAdTemplate = async (AdTemplate, merchantId, name) => {
  const adTemplate = await AdTemplate.findOne({
    where: {
      merchantId: merchantId,
      name: name
    }
  })

  return adTemplate
}

const getAd = async (Ad, merchantId, adId) => {
  const ad = await Ad.findOne({
    where: {
      id: adId,
      merchantId: merchantId
    }
  })

  return ad
}

module.exports = {
  getStore: getStore,
  getDupStore: getDupStore,
  getBillboard: getBillboard,
  getDupBillboard: getDupBillboard,
  getCategory: getCategory,
  getDupCategory: getDupCategory,
  getSize: getSize,
  getDupSize: getDupSize,
  getColor: getColor,
  getDupColor: getDupColor,
  getProduct: getProduct,
  getDupProduct: getDupProduct,
  getCustomer: getCustomer,
  getCusByNumber: getCusByNumber,
  getChat: getChat,
  getMessage: getMessage,
  getAdTemplate: getAdTemplate,
  getAd: getAd
};
