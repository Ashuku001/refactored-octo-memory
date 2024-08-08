const { logger } = require("../../helpers/logger.js");
const colors = require("colors");
require("dotenv").config();
const { sendWhatsAppMessage } = require("../../utils/messageHelper.js");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { Op, where } = require("sequelize");
const { setCookie } = require("./helpers/setCookies.js");
const { withFilter, PubSub } = require("graphql-subscriptions");
const {
  getStore,
  getBillboard,
  getCategory,
  getProduct,
  getDupProduct,
  getDupStore,
  getDupBillboard,
  getDupCategory,
  getCustomer,
  getCusByNumber,
  getChat,
  getAd,
} = require("./helpers/getModels.js");
const { createCustomer, createChat } = require("./helpers/createModels.js");
const { messageStatuses } = require("../../utils/messageStatuses.js");
const {
  getCreateChatForMessage,
} = require("./helpers/GetCreateChatToAddMessage.js");
const { tempMarketPerformance } = require("./helpers/tempMarketPerformance.js");
const { level } = require("winston");
// const { pubsub } = require("../subscriptions/redisSetup.js");
const pubsub = new PubSub();

const JWT_SECRET = process.env.JWT_SECRET;

// a nonarrow fun doesnt take a scope
function resolvers() {
  const { db } = this.db;
  const {
    Customer,
    Merchant,
    Chat,
    Conversation,
    Message,
    Setting,
    Product,
    Image,
    Store,
    Billboard,
    Category,
    Brand,
    TextMessage,
    ImageMessage,
    DocumentMessage,
    VideoMessage,
    InteractiveMessage,
    InteractiveButton,
    InteractiveTemplate,
    InteractiveList,
    ListRowButton,
    ListSection,
    ButtonRepliedAction,
    ListRepliedAction,
    TemplateRepliedAction,
    Order,
    TextHeader,
    Ad,
    AdTemplate,
    MarketingResponse,
    ScheduleTask,

    Promotion,
    Coupon,
    Sale,
    MpesaSetting
  } = db.models;

  const resolvers = {
    Customer: {
      // a function to get the associated merchant of a customer
      merchant(customer, args, context) {
        return customer.getMerchant();
      },
    },
    Chat: {
      messages(chat, args, context) {
        return chat.getMessages({ order: [["createdAt", "ASC"]] });
      },
      merchant(chat, args, context) {
        return chat.getMerchant();
      },
      customer(chat, args, context) {
        return chat.getCustomer();
      },
    },
    Message: {
      chat(message, args, context) {
        return message.getChat();
      },
    },
    Ad: {
      adTemplate(adTemplate, args, context) {
        return adTemplate.getAdTemplate();
      },
    },
    Merchant: {
      customers(merchant, args, context) {
        return merchant.getCustomers();
      },
      setting(merchant, args, context) {
        return merchant.getSetting();
      },
      products(merchant, args, context) {
        return merchant.getProducts();
      },
      chats(merchant, args, context) {
        return merchant.getChats({ order: [["createdAt", "ASC"]] });
      },
      stores(merchant, args, context) {
        return merchant.getStore();
      },
    },
    Store: {
      merchant(store, args, context) {
        return store.getMerchant();
      },
      billboards(store, args, context) {
        return store.getBillboards();
      },
      products(store, args, context) {
        return store.getProducts();
      },
    },
    Billboard: {
      store(billboard, args, context) {
        return billboard.getStore();
      },
      categories(billboard, args, context) {
        return billboard.getCategories();
      },
    },

    Category: {
      billboard(category, args, context) {
        return category.getBillboard();
      },
      store(category, args, context) {
        return category.getStore();
      },
      products(category, args, context) {
        return category.getProducts();
      },
    },

    Product: {
      store(product, args, context) {
        return product.getStore();
      },
      category(product, args, context) {
        return product.getCategory();
      },
      images(product, args, context) {
        return product.getImages();
      },
    },

    RootQuery: {
      async currentMerchant(root, args, context) {
        return context.merchant;
      },

      async customers(root, args, context) {
        const merchant = await Merchant.findOne({
          where: {
            id: context.merchant.id,
          },
        });
        if (!merchant) {
          throw new Error(
            "It seems you are not registered. Sign up to start managing your customers"
          );
        }

        return await merchant.getCustomers();
      },

      async customer(root, { customerId }, context) {
        const customer = await Customer.findOne({
          where: {
            id: customerId,
            merchantId: context.merchant.id,
          },
        });
        if (!customer) {
          throw new Error("Unautharized operation could not find the customer");
        }
        return customer;
      },

      async customer360(root, { customerId }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error("Unauthenticated! Make sure you are logged in.");
        }
        const customer = await Customer.findOne({
          where: {
            id: customerId,
            merchantId: merchant.id,
          },
          include: [
            {
              association: "customerOrder",
              include: [
                {
                  association: "storeOrder",
                },
                {
                  association: "orderItems",
                  include: {
                    association: "orderProduct",
                  },
                },
              ],
            },
          ],
        });
        if (!customer) {
          throw new Error("Unautharized operation could not find the customer");
        }
        return customer;
      },

      async customerChatSearch(root, { page, limit, text }, context) {
        // if text length less than three skip
        let customers = [];
        if (text.length < 3) {
          return {
            customers,
          };
        }

        var skip = 0;
        if (page && limit) {
          skip = page * limit;
        }

        var query = {
          order: [["createdAt", "DESC"]],
          offset: skip,
        };
        if (limit) {
          query.limit = limit;
        }

        query.where = {
          [Op.or]: [
            {
              first_name: { [Op.iLike]: "%" + text + "%" },
              merchantId: context.merchant.id,
            },
            {
              last_name: { [Op.iLike]: "%" + text + "%" },
              merchantId: context.merchant.id,
            },
            {
              phone_number: { [Op.iLike]: "%" + text + "%" },
              merchantId: context.merchant.id,
            },
          ],
        };

        customers = await Customer.findAll(query);
        if (customers.length === 0) {
          throw new Error(`No results found for "${text}"`);
        }

        const customerIds = customers.map((cus) => {
          return cus.id;
        });
        let chats = await Chat.findAll({
          where: {
            merchantId: context.merchant.id,
            customerId: { [Op.in]: customerIds },
          },
        });

        if (chats) {
          customers = await customers.filter((cus) =>
            chats.every((chat) => cus.id !== chat.customerId)
          );
        }

        return { customers, chats };
      },

      async customersSearch(root, { page, limit, text }, context) {
        // if text length less than three skip
        let customers = [];
        if (text.length < 3) {
          return {
            customers,
          };
        }

        var skip = 0;
        if (page && limit) {
          skip = page * limit;
        }

        var query = {
          order: [["createdAt", "DESC"]],
          offset: skip,
        };
        if (limit) {
          query.limit = limit;
        }

        query.where = {
          [Op.or]: [
            {
              first_name: { [Op.iLike]: "%" + text + "%" },
              merchantId: context.merchant.id,
            },
            {
              last_name: { [Op.iLike]: "%" + text + "%" },
              merchantId: context.merchant.id,
            },
            {
              phone_number: { [Op.iLike]: "%" + text + "%" },
              merchantId: context.merchant.id,
            },
          ],
        };

        customers = await Customer.findAll(query);
        if (customers.length === 0) {
        }

        return customers;
      },

      async chats(root, args, context) {
        const merchant = await Merchant.findOne({
          where: {
            id: context.merchant.id,
          },
        });
        if (!merchant) {
          throw new Error(
            "It seems you are not registered. Sign up to start managing your customers"
          );
        }

        return Chat.findAll({
          where: {
            merchantId: context.merchant.id,
          },
          order: [["updatedAt", "DESC"]],
          include: [
            {
              model: Customer,
              required: true,
            },
          ],
        });
      },

      async lastMessage(args, { chatId }, context) {
        if (!context.merchant) {
          throw new Error("Unauthenticated make sure you are logged in.");
        }
        if (chatId) {
          const lastMessage = await Message.findAll({
            where: {
              chatId: chatId,
            },
            include: [
              {
                model: TextMessage,
                as: "text",
              },
              {
                model: ImageMessage,
                as: "image",
              },
              {
                model: DocumentMessage,
                as: "document",
              },
              {
                model: VideoMessage,
                as: "video",
              },
              {
                model: InteractiveMessage,
                as: "interactive",
                include: [
                  {
                    model: InteractiveButton,
                    as: "button",
                    include: ["buttons", "product"],
                  },
                  {
                    model: InteractiveTemplate,
                    as: "template",
                    include: ["buttons", "tempProduct"],
                  },
                  {
                    model: InteractiveList,
                    as: "list",
                    include: [
                      {
                        model: TextHeader,
                        as: "listTextHead",
                      },
                      {
                        model: ListSection,
                        as: "sections",
                        include: [
                          {
                            model: ListRowButton,
                            as: "rows",
                            include: ["product"],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                model: ButtonRepliedAction,
                as: "mesBtnReply",
                required: false,
                include: [
                  {
                    model: InteractiveButton,
                    as: "buttonReply",
                    include: ["product"],
                  },
                ],
              },
              {
                model: TemplateRepliedAction,
                as: "mesTempReply",
                required: false,
                include: [
                  {
                    model: InteractiveTemplate,
                    as: "tempReply",
                    include: ["tempProduct"],
                  },
                ],
              },
              {
                model: ListRepliedAction,
                as: "mesListReply",
                required: false,
                include: [
                  {
                    model: ListRowButton,
                    as: "listReply",
                    include: ["product"],
                  },
                ],
              },
              {
                model: Chat,
              },
            ],
            order: [["createdAt", "DESC"]],
            limit: 1,
          });

          return lastMessage[0];
        }
      },

      async chat(root, { chatId }, context) {
        const merchant = await Merchant.findOne({
          where: {
            id: context.merchant.id,
          },
        });
        if (!merchant) {
          throw new Error("Unauthenticated make sure you are logged in");
        }

        const chat = await Chat.findOne({
          where: {
            id: chatId,
            merchantId: context.merchant.id,
          },
          include: [
            {
              model: Message,
              as: "messages",
              include: [
                {
                  model: Ad,
                  as: "messageAd",
                },
                {
                  model: Message,
                  as: "contexts",
                  include: [
                    "text",
                    "image",
                    "document",
                    "video",
                    "interactive",
                  ],
                },
                {
                  model: Message,
                  as: "context",
                  include: [
                    {
                      model: TextMessage,
                      as: "text",
                      required: false,
                    },
                    {
                      model: ImageMessage,
                      as: "image",
                      required: false,
                    },
                    {
                      model: DocumentMessage,
                      as: "document",
                      required: false,
                    },
                    {
                      model: VideoMessage,
                      as: "video",
                      required: false,
                    },
                    {
                      model: InteractiveMessage,
                      as: "interactive",
                      include: [
                        {
                          model: InteractiveButton,
                          as: "button",
                          include: ["product"],
                        },
                        {
                          model: InteractiveTemplate,
                          as: "template",
                          include: ["tempProduct"],
                        },
                        {
                          model: InteractiveList,
                          as: "list",
                          include: [
                            {
                              model: TextHeader,
                              as: "listTextHead",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  model: TextMessage,
                  as: "text",
                  required: false,
                },
                {
                  model: ImageMessage,
                  as: "image",
                  required: false,
                },
                {
                  model: DocumentMessage,
                  as: "document",
                  required: false,
                },
                {
                  model: VideoMessage,
                  as: "video",
                  required: false,
                },
                {
                  model: ButtonRepliedAction,
                  as: "mesBtnReply",
                  required: false,
                  include: [
                    {
                      model: InteractiveButton,
                      as: "buttonReply",
                      include: ["product"],
                    },
                  ],
                },
                {
                  model: TemplateRepliedAction,
                  as: "mesTempReply",
                  required: false,
                  include: [
                    {
                      model: InteractiveTemplate,
                      as: "tempReply",
                      include: ["tempProduct"],
                    },
                  ],
                },
                {
                  model: ListRepliedAction,
                  as: "mesListReply",
                  required: false,
                  include: [
                    {
                      model: ListRowButton,
                      as: "listReply",
                      include: ["product"],
                    },
                  ],
                },
                {
                  model: InteractiveMessage,
                  as: "interactive",
                  required: false,
                  include: [
                    {
                      model: InteractiveButton,
                      as: "button",
                      include: [
                        "btnImageHead",
                        "btnTextHead",
                        "buttons",
                        "product",
                      ],
                    },
                    {
                      model: InteractiveTemplate,
                      as: "template",
                      include: [
                        "tempImageHead",
                        "tempTextHead",
                        "buttons",
                        "tempProduct",
                      ],
                    },
                    {
                      model: InteractiveList,
                      as: "list",
                      include: [
                        {
                          model: TextHeader,
                          as: "listTextHead",
                        },
                        {
                          model: ListSection,
                          as: "sections",
                          include: [
                            {
                              model: ListRowButton,
                              as: "rows",
                              include: ["product"],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              model: Customer,
            },
            {
              model: Conversation,
              as: "conversations",
            },
          ],
          order: [[{ model: Message, as: "messages" }, "createdAt", "ASC"]],
        });

        if (!chat) {
          throw new Error("Unauthorized operation");
        }
        return chat;
      },

      async ads(root, {}, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated please make sure you are logged in."
          );
        }

        const ads = await Ad.findAll({
          where: {
            merchantId: merchant.id,
          },
          include: {
            model: AdTemplate,
          },
          order: [["createdAt", "DESC"]],
        });

        return ads;
      },

      async tempMarketResponse(root, { adTemplateId }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated please make sure you are logged in."
          );
        }

        const adTemplate = await AdTemplate.findOne({
          where: {
            merchantId: merchant.id,
            id: adTemplateId,
          },
          include: [
            {
              association: "adTempProduct",
            },
            {
              association: "adTempMessage",
              include: {
                association: "interactive",
                include: {
                  association: "template",
                  include: ["buttons"],
                },
              },
            },
            {
              association: "adTempResponses",
              include: [
                {
                  association: "cusTempLead",
                },
                {
                  association: "mesTempLead",
                  include: ["mesTempReply"],
                },
              ],
            },
          ],
        });
        if (!adTemplate) {
          throw new Error("We could not find your ad Template");
        }

        return adTemplate;
      },

      // username required to verify the webhook events and context from logged in user
      async setting(root, { username }, context) {
        let merchant = null;
        if (username && !context.merchant) {
          merchant = await Merchant.findOne({
            where: {
              username: username,
            },
          });
          if (!merchant) {
            // console to an error reporting system
            logger.log({
              level: "error",
              message: `error retriving settings for merchant requested by webhook, "${username}" could not find the username`,
            });

            return; // short circuit
          }
        } else {
          // client requesting settings
          merchant = context.merchant;
        }

        if (!merchant) {
          throw new Error(
            "Failed to authenticate you while retrieving settings Contact us to solve this"
          );
        }

        const setting = await merchant.getSetting();

        if (setting) {
          return setting;
        } else {
          return
          // throw new Error(
          //   "Could not retrieve your WhatsApp business setting. Please ensure to add your settings from the settings page."
          // );
        }
      },

      async stores(root, args, context) {
        let stores = undefined;

        const merchant = await context.merchant;
        if (!merchant) {
          throw new Error(
            "Make sure you are logged in to access your products"
          );
        }

        var query = { order: [["createdAt", "DESC"]] };
        query.where = { "$Store.merchantId$": merchant.id };

        stores = await Store.findAll(query);

        if (!stores) {
          throw new Error("Add stores to view them here");
        }

        return stores;
      },

      async store(root, { storeId }, context) {
        if (!context.merchant) {
          throw new Error("Unauthenticated make sure you are logged in");
        }
        if (storeId) {
          const store = await getStore(Store, storeId, context.merchant.id);

          if (!store) {
            throw new Error("Could not find the store");
          }
          return store;
        }
      },

      async mpesa(root, { storeId }, context) {
        if(!storeId){
          throw new Error("Store id is required.")
        }
        try{

          return await MpesaSetting.findOne({
            where: {
              storeId: storeId
            }
          })
        } catch {
          logger.log({
            level: "error",
            message: `Could not retrieve mpesa settings for store ${storeId}`
          })
          throw new Error("Something went wrong")
        }
      },

      async billboards(root, { storeId }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error("Unauthenticated make sure you are logged in");
        }
        if (!storeId) {
          throw new Error("We couldn't find a store ID");
        }
        try {
          const store = await getStore(Store, storeId, merchant.id);
          if (!store) {
            throw new Error("Unauthorized operation");
          }

          const billboards = Billboard.findAll({
            where: {
              storeId: storeId,
            },
          });

          if (!billboards) {
            throw new Error("This store has no billboards yet");
          }
          return billboards;
        } catch (error) {
          logger.log({
            level: "error",
            message: `An error occurred for ${merchant.id} while querying for billboards`,
          });
          throw new Error(
            "Something went wrong while getting your billboards",
            error
          );
        }
      },

      async billboard(root, { billboardId }, context) {
        try {
          const billboard = await Billboard.findOne({
            where: {
              id: billboardId,
            },
          });

          if (!billboard) {
            throw new Error("Could not find the billboard");
          }

          return billboard;
        } catch (error) {
          throw new Error("Something went wrong", error);
        }
      },

      async brands(root, { storeId }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error("Unauthenticated make sure you are logged in");
        }
        if (!storeId) {
          throw new Error("We couldn't find a store ID");
        }
        try {
          const store = await getStore(Store, storeId, merchant.id);
          if (!store) {
            throw new Error("Unauthorized operation");
          }

          const brands = Brand.findAll({
            where: {
              storeId: storeId,
            },
          });

          if (!brands) {
            throw new Error("This store has no billboards yet");
          }
          return brands;
        } catch (error) {
          logger.log({
            level: "error",
            message: `An error occurred for ${merchant.id} while querying for brands`,
          });
          throw new Error(
            "Something went wrong while getting your brands",
            error
          );
        }
      },

      async brand(root, { brandId }, context) {
        if(!context.merchant){
          throw new Error("Unauthenticated make sure you are logged in")
        }

        try {
          const brand = await Brand.findOne({
            where: {
              id: brandId,

            },
          });

          if (!brand) {
            throw new Error("Could not find the brand");
          }

          return brand;
        } catch (error) {
          throw new Error("Something went wrong", error);
        }
      },

      async categories(root, { storeId }, context) {
        const merchant = context.merchant;
        if (!storeId) {
          throw new Error("Billboard id is required.");
        }
        try {
          const categories = Category.findAll({
            where: {
              storeId: storeId,
            },
          });

          if (!categories) {
            throw new Error("This billboard has no categories yet");
          }
          return categories;
        } catch (error) {
          logger.log({
            level: "error",
            message: `An error occurred for ${merchant.id} while querying for categories`,
          });
          throw new Error(
            "Something went wrong while getting your categories",
            error
          );
        }
      },

      async category(root, { categoryId }, context) {
        try {
          if (!categoryId) {
            throw new Error("Category Id is required");
          }

          const category = await getCategory(Category, categoryId);

          if (!category) {
            throw new Error("Could not find the category");
          }

          return category;
        } catch (error) {
          throw new Error("Something went wrong", error);
        }
      },

      async products(
        root,
        { storeId, categoryId, isFeatured, isArchived },
        context
      ) {
        const merchant = context.merchant;

        let filter = {};
        if (storeId) {
          filter["storeId"] = storeId;
        }
        if (categoryId) {
          filter["categoryId"] = categoryId;
        }
        if (isFeatured) {
          filter["isFeatured"] = isFeatured;
        }

        const products = Product.findAll({
          where: filter,
        });

        if (!products) {
          throw new Error("This billboard has no categories yet");
        }
        return products;
      },

      async productsIds(root, { storeId, productIds }, context) {
        let filter = {};
        if (storeId) {
          filter["storeId"] = storeId;
        }

        const products = Product.findAll({
          where: {
            id: productIds,
            storeId: storeId,
          },
          order: [["updatedAt", "ASC"]],
        });

        if (!products) {
          throw new Error("This billboard has no categories yet");
        }
        return products;
      },

      async productsWithVariants(
        root,
        { storeId, categoryId, variantId, isFeatured, isArchived },
        context
      ) {
        let filter = {};
        if (storeId) {
          filter["storeId"] = storeId;
        }
        if (categoryId) {
          filter["categoryId"] = categoryId;
        }
        if (variantId) {
          filter["variantId"] = variantId;
        }
        if (isFeatured) {
          filter["isFeatured"] = isFeatured;
        }

        const products = Product.findAll({
          where: filter,
          include: [
            {
              association: "prodVariations",
              include: [
                {
                  association: "prodVarOptions",
                },
              ],
            },
            {
              association: "prodCombinations",
              include: [
                {
                  association: "variantImage",
                },
              ],
            },
          ],
        });

        if (!products) {
          throw new Error("This store has no products yet");
        }
        return products;
      },

      async product(root, { productId }, context) {
        // if (!context.merchant) {
        //   throw new Error("Unauthenticated make sure you are logged in");
        // }
        if (!productId) {
          throw new Error("Product Id is required");
        }
        const product = await Product.findOne({
          where: {
            id: productId,
          },
          include: [
            {
              as: "images",
              model: Image,
            },
            {
              model: Brand,
              as: 'brand'
            },
            {
              association: "prodVariations",
              include: [{ association: "prodVarOptions" }],
            },
            {
              association: "prodCombinations",
              include: [
                {
                  association: "variantImage",
                },
              ],
            },
          ],
        });

        if (!product) {
          throw new Error("Could not find the product");
        }

        return product;
      },

      async allProducts(root, args, context) {
        let stores = undefined;

        const merchant = await context.merchant;
        if (!merchant) {
          throw new Error(
            "Make sure you are logged in to access your products"
          );
        }

        stores = await Store.findAll({
          where: {
            merchantId: merchant.id,
          },
          include: {
            model: Product,
          },
        });

        if (!stores) {
          throw new Error("Add stores to view them here");
        }

        return stores;
      },

      async productSearch(root, { page, limit, text, storeId }, context) {
        // if text length less than three skip
        let products = [];
        if (text.length < 3) {
          return {
            products,
          };
        }

        var skip = 0;
        if (page && limit) {
          skip = page * limit;
        }

        var query = {
          order: [["createdAt", "DESC"]],
          offset: skip,
        };
        if (limit) {
          query.limit = limit;
        }

        query.where = {
          [Op.or]: [
            {
              name: { [Op.iLike]: "%" + text + "%" },
              storeId,
            },
          ],
        };

        products = await Product.findAll(query);
        if (products.length === 0) {
          throw new Error(`No results found for "${text}"`);
        }

        return products
      },

      async customerSearch(root, { page, limit, text }, context) {
        const merchant = context.merchant
        if(!merchant) throw new Error("Unauthenticated ensure you are logged in first.")
        // if text length less than three skip
        let customers = [];
        if (text.length < 3) {
          return {
            customers,
          };
        }

        var skip = 0;
        if (page && limit) {
          skip = page * limit;
        }

        var query = {
          order: [["createdAt", "DESC"]],
          offset: skip,
        };
        if (limit) {
          query.limit = limit;
        }


        query.where = {
          [Op.or]: [
            {
              first_name: { [Op.iLike]: "%" + text + "%" },
              merchantId: context.merchant.id,
            },
            {
              last_name: { [Op.iLike]: "%" + text + "%" },
              merchantId: context.merchant.id,
            },
            {
              phone_number: { [Op.iLike]: "%" + text + "%" },
              merchantId: context.merchant.id,
            },
          ],
        };

        customers = await Customer.findAll(query);
        if (customers.length === 0) {
          throw new Error(`No results found for "${text}"`);
        }

        return customers
      },

      async orders(root, { storeId }, context) {
        if (!context.merchant) {
          throw new Error(
            "Unauthenticated please make sure you are logged in."
          );
        }

        const store = await getStore(Store, storeId, context.merchant.id);
        if (!store) {
          throw new Error("Unauthorized operation.");
        }
        const orders = Order.findAll({
          where: {
            storeId: store.id,
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              association: "customerOrder",
            },
            {
              association: "orderItems",
              include: {
                association: "orderProduct",
              },
            },
          ],
        });

        return orders;
      },

      async sales(root, { storeId }, context) {
        if (!context.merchant) {
          throw new Error(
            "Unauthenticated please make sure you are logged in."
          );
        }

        const store = await getStore(Store, storeId, context.merchant.id);
        if (!store) {
          throw new Error("Unauthorized operation.");
        }
        const orders = Sale.findAll({
          where: {
            storeId: store.id,
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              association: "customerSales",
            },
            {
              association: "saleDetails",
              include: {
                association: "productSales",
              },
            },
          ],
        });

        return orders;
      },

      async templateSchedules(root, params, context) {
        const schedules = ScheduleTask.findAll({
          where: {
            type: "bulkTemplate",
            timestamp: { [Op.lte]: new Date() },
            status: "PENDING",
          },
          include: [
            {
              association: "bulkTempTask",
            },
            {
              association: "merchantsTasks",
            },
          ],
        });

        return schedules;
      },

      // #############3 PROMOTIONS ####################
      async promotions(root, { storeId }, context) {
        if (!context.merchant) {
          throw new Error(
            "Unauthenticated please make sure you are logged in."
          );
        }

        const store = await getStore(Store, storeId, context.merchant.id);
        if (!store) {
          throw new Error("Unauthorized operation.");
        }
        const promotions = Promotion.findAll({
          where: {
            storeId: store.id,
          },
          include: ["coupon", "storePromotions"],
          order: [["createdAt", "DESC"]],
        });

        return promotions;
      },
    },

    RootMutation: {
      async addCustomer(root, { customer }, context) {
        const merchant = await Merchant.findOne({
          where: {
            id: context.merchant.id,
          },
        });

        // check if a customer does exist with the same phone number
        const existingCustomer = await Customer.findOne({
          where: {
            phone_number: customer.phone_number,
            merchantId: merchant.id,
          },
        });

        // update the customer
        if (existingCustomer) {
          throw new Error(`Customer of phone number ${customer.phone_number} already exists.`)
        } else {
          // create the new customer
          return await Customer.create({
            ...customer,
          },{
            include: ["customerLoyalty"]
          }).then(async (newCustomer) => {
            await Promise.all([newCustomer.setMerchant(merchant.id)]);
            logger.log({
              level: "info",
              message: "Customer was created",
            });
            return newCustomer;
          });
        }
      },

      async updateCustomer(root, { customerId, payload }, context) {
        if (!context.merchant) {
          throw new Error("Unauthenticated please make sure you are logged in");
        }

        if (!customerId) {
          throw new Error(
            "Unathorized operation customer Id and the new names is required"
          );
        }

        let customer = await getCustomer(
          Customer,
          customerId,
          context.merchant.id
        );

        if (!customer) {
          throw new Error("Unathorized operation could not find the customer");
        }

        try {
          const id = await Customer.update(
            {
              ...customer,
              first_name: payload.first_name,
              last_name: payload.last_name,
              phone_number: payload.phone_number,
            },
            {
              where: {
                id: parseInt(customerId),
                merchantId: context.merchant.id,
              },
              returning: true,
              plain: true,
            }
          ).then((result) => {
            return result[1];
          });
        } catch (error) {
          if (error.validatorKey === "not_unique") {
            throw new Error(
              `A customer of the given phone ${payload.name} already exists`
            );
          }
          logger.log({
            level: "error",
            message: `update customer for ${
              context.merchant.id
            } failed ${new Date().toLocaleDateString()}`,
          });
        }
        return customer;
      },

      async addChat(root, { chat }, context) {
        const existingChat = await Chat.findOne({
          where: {
            merchantId: context.merchant.id,
            customerId: chat.customer,
          },
        });

        if (existingChat) {
          await Chat.update(
            {
              ...chat,
            },
            {
              where: {
                merchantId: context.merchant.id,
                customerId: chat.customer,
              },
            }
          ).then((chat) => {
            logger.log({
              level: "info",
              message: "Updated an existing chat",
            });
            return chat;
          });
        } else {
          return await Chat.create().then(async (newChat) => {
            return Promise.all([
              newChat.setCustomer(chat.customer),
              newChat.setMerchant(context.merchant),
            ]).then(() => {
              logger.log({
                level: "info",
                message: "Chat was created",
              });

              pubsub.publish("chatAdded", {
                chatAdded: newChat,
                merchantId: chat.merchantId,
              });
              return newChat;
            });
          });
        }
      },

      async addTextMessage(
        root,
        { message, participants, customerId, template, contextMessage },
        context
      ) {
        const {
          customer,
          merchant,
          chat,
          addNewChat,
          messageId,
          contextedMessage,
        } = await getCreateChatForMessage({
          Merchant: Merchant,
          Customer: Customer,
          Chat: Chat,
          participants: participants,
          message: message,
          context: context,
          customerId: customerId,
          template: template,
          Message: Message,
          contextMessage: contextMessage,
        });

        const newMessage = await Message.create(
          messageId
            ? {
                ...message.message,
                text: message.text,
                messageId: messageId,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              }
            : {
                ...message.message,
                text: message.text,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              },
          {
            include: ["text"],
          }
        ).then(async (newMessage) => {
          return Promise.all([
            newMessage.setChat(chat.id),
            newMessage.setMerchant(merchant.id),
            newMessage.setCustomer(customer.id),
          ]).then(async () => {
            if (addNewChat === true) {
              pubsub.publish("chatAdded", {
                chatAdded: chat,
                merchantId: chat.merchantId,
              });
            }
            pubsub.publish("messageAdded", {
              messageAdded: { message: newMessage },
              chatId: newMessage.chatId,
            });
            logger.log({
              level: "info",
              message: `Message was created ${new Date().toDateString()}`,
            });

            const newChat = await Chat.update(
              {
                ...chat,
                createdAt: chat.createdAt,
              },
              {
                where: {
                  merchantId: merchant.id,
                  customerId: customer.id,
                },
                silent: false,
              }
            ).then((chat) => {
              logger.log({
                level: "info",
                message: "chat updated",
              });
              return chat;
            });
            // send the message to whatsapp after it is saved into the database
            return newMessage;
          });
        });

        return newMessage;
      },

      async addImageMessage(
        root,
        { message, template, customerId, participants, contextMessage },
        context
      ) {
        const {
          customer,
          merchant,
          chat,
          addNewChat,
          messageId,
          contextedMessage,
        } = await getCreateChatForMessage({
          Merchant: Merchant,
          Customer: Customer,
          Chat: Chat,
          participants: participants,
          message: message,
          context: context,
          customerId: customerId,
          template: template,
          Message: Message,
          contextMessage: contextMessage,
        });

        const newMessage = await Message.create(
          messageId
            ? {
                ...message.message,
                image: message.image,
                messageId: messageId,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              }
            : {
                ...message.message,
                image: message.image,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              },
          {
            include: ["image"],
          }
        ).then(async (newMessage) => {
          return Promise.all([
            newMessage.setChat(chat.id),
            newMessage.setMerchant(merchant.id),
            newMessage.setCustomer(customer.id),
          ]).then(async () => {
            if (addNewChat === true) {
              pubsub.publish("chatAdded", {
                chatAdded: chat,
                merchantId: chat.merchantId,
              });
            }
            pubsub.publish("messageAdded", {
              messageAdded: { message: newMessage },
              chatId: newMessage.chatId,
            });

            const newChat = await Chat.update(
              {
                ...chat,
                createdAt: chat.createdAt,
              },
              {
                where: {
                  merchantId: merchant.id,
                  customerId: customer.id,
                },
                silent: false,
              }
            ).then((chat) => {
              return chat;
            });
            // send the message to whatsapp after it is saved into the database
            return newMessage;
          });
        });

        return newMessage;
      },

      async addDocumentMessage(
        root,
        { message, template, customerId, participants, contextMessage },
        context
      ) {
        const {
          customer,
          merchant,
          chat,
          addNewChat,
          messageId,
          contextedMessage,
        } = await getCreateChatForMessage({
          Merchant: Merchant,
          Customer: Customer,
          Chat: Chat,
          participants: participants,
          message: message,
          context: context,
          customerId: customerId,
          template: template,
          Message: Message,
          contextMessage: contextMessage,
        });

        const newMessage = await Message.create(
          messageId
            ? {
                ...message.message,
                document: message.document,
                messageId: messageId,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              }
            : {
                ...message.message,
                document: message.document,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              },
          {
            include: ["document"],
          }
        ).then(async (newMessage) => {
          return Promise.all([
            newMessage.setChat(chat.id),
            newMessage.setMerchant(merchant.id),
            newMessage.setCustomer(customer.id),
          ]).then(async () => {
            if (addNewChat === true) {
              pubsub.publish("chatAdded", {
                chatAdded: chat,
                merchantId: chat.merchantId,
              });
            }
            pubsub.publish("messageAdded", {
              messageAdded: { message: newMessage },
              chatId: newMessage.chatId,
            });

            const newChat = await Chat.update(
              {
                ...chat,
                createdAt: chat.createdAt,
              },
              {
                where: {
                  merchantId: merchant.id,
                  customerId: customer.id,
                },
                silent: false,
              }
            ).then((chat) => {
              return chat;
            });
            // send the message to whatsapp after it is saved into the database
            return newMessage;
          });
        });
        return newMessage;
      },

      async addVideoMessage(
        root,
        { message, template, customerId, participants, contextMessage },
        context
      ) {
        const {
          customer,
          merchant,
          chat,
          addNewChat,
          messageId,
          contextedMessage,
        } = await getCreateChatForMessage({
          Merchant: Merchant,
          Customer: Customer,
          Chat: Chat,
          participants: participants,
          message: message,
          context: context,
          customerId: customerId,
          template: template,
          Message: Message,
          contextMessage: contextMessage,
        });

        const newMessage = await Message.create(
          messageId
            ? {
                ...message.message,
                video: message.video,
                messageId: messageId,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              }
            : {
                ...message.message,
                video: message.video,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              },
          {
            include: ["video"],
          }
        ).then(async (newMessage) => {
          return Promise.all([
            newMessage.setChat(chat.id),
            newMessage.setMerchant(merchant.id),
            newMessage.setCustomer(customer.id),
          ]).then(async () => {
            if (addNewChat === true) {
              pubsub.publish("chatAdded", {
                chatAdded: chat,
                merchantId: chat.merchantId,
              });
            }
            pubsub.publish("messageAdded", {
              messageAdded: { message: newMessage },
              chatId: newMessage.chatId,
            });

            const newChat = await Chat.update(
              {
                ...chat,
                createdAt: chat.createdAt,
              },
              {
                where: {
                  merchantId: merchant.id,
                  customerId: customer.id,
                },
                silent: false,
              }
            ).then((chat) => {
              return chat;
            });
            // send the message to whatsapp after it is saved into the database
            return newMessage;
          });
        });
        return newMessage;
      },

      async addInteractiveButtonMessage(
        root,
        { message, customerId, template, participants, contextMessage },
        context
      ) {
        const {
          customer,
          merchant,
          chat,
          addNewChat,
          messageId,
          contextedMessage,
        } = await getCreateChatForMessage({
          Merchant: Merchant,
          Customer: Customer,
          Chat: Chat,
          participants: participants,
          message: message,
          context: context,
          customerId: customerId,
          template: template,
          Message: Message,
          contextMessage: contextMessage,
        });

        const newMessage = await Message.create(
          messageId
            ? {
                ...message.message,
                interactive: message.interactive,
                messageId: messageId,
              }
            : {
                ...message.message,
                interactive: message.interactive,
              },
          {
            include: {
              association: "interactive",
              include: {
                association: "button",
                include: ["btnImageHead", "buttons", "btnTextHead"],
              },
            },
          }
        ).then(async (newMessage) => {
          return Promise.all([
            newMessage.setChat(chat.id),
            newMessage.setMerchant(merchant.id),
            newMessage.setCustomer(customer.id),
            newMessage.interactive.button.setProduct(
              newMessage.interactive.button.productId
            ),
          ]).then(async () => {
            if (addNewChat === true) {
              pubsub.publish("chatAdded", {
                chatAdded: chat,
                merchantId: chat.merchantId,
              });
            }
            pubsub.publish("messageAdded", {
              messageAdded: { message: newMessage },
              chatId: newMessage.chatId,
            });

            const newChat = await Chat.update(
              {
                ...chat,
                createdAt: chat.createdAt,
              },
              {
                where: {
                  merchantId: merchant.id,
                  customerId: customer.id,
                },
                silent: false,
              }
            ).then((chat) => {
              return chat;
            });
            // send the message to whatsapp after it is saved into the database
            return newMessage;
          });
        });
        return newMessage;
      },

      async addInteractiveTemplateMessage(
        root,
        { message, customerId, template, participants, contextMessage },
        context
      ) {
        const {
          customer,
          merchant,
          chat,
          addNewChat,
          messageId,
          contextedMessage,
        } = await getCreateChatForMessage({
          Merchant: Merchant,
          Customer: Customer,
          Chat: Chat,
          participants: participants,
          message: message,
          context: context,
          customerId: customerId,
          template: template,
          Message: Message,
          contextMessage: contextMessage,
        });

        const newMessage = await Message.create(
          messageId
            ? {
                ...message.message,
                interactive: message.interactive,
                messageId: messageId,
              }
            : {
                ...message.message,
                interactive: message.interactive,
              },
          {
            include: {
              association: "interactive",
              include: {
                association: "template",
                include: ["tempImageHead", "buttons", "tempTextHead"],
              },
            },
          }
        ).then(async (newMessage) => {
          return Promise.all([
            newMessage.setChat(chat.id),
            newMessage.setMerchant(merchant.id),
            newMessage.setCustomer(customer.id),
            // newMessage.interactive.template.setProduct(
            //   newMessage.interactive.template.productId
            // ),
          ]).then(async () => {
            if (addNewChat === true) {
              pubsub.publish("chatAdded", {
                chatAdded: chat,
                merchantId: chat.merchantId,
              });
            }
            pubsub.publish("messageAdded", {
              messageAdded: { message: newMessage },
              chatId: newMessage.chatId,
            });

            const newChat = await Chat.update(
              {
                ...chat,
                createdAt: chat.createdAt,
              },
              {
                where: {
                  merchantId: merchant.id,
                  customerId: customer.id,
                },
                silent: false,
              }
            ).then((chat) => {
              return chat;
            });
            // send the message to whatsapp after it is saved into the database
            return newMessage;
          });
        });
        return newMessage;
      },

      async addInteractiveListMessage(
        root,
        { message, customerId, participants, contextMessage, template },
        context
      ) {
        const {
          customer,
          merchant,
          chat,
          addNewChat,
          messageId,
          contextedMessage,
        } = await getCreateChatForMessage({
          Merchant: Merchant,
          Customer: Customer,
          Chat: Chat,
          participants: participants,
          message: message,
          context: context,
          customerId: customerId,
          template: template,
          Message: Message,
          contextMessage: contextMessage,
        });

        const newMessage = await Message.create(
          messageId
            ? {
                ...message.message,
                interactive: message.interactive,
                messageId: messageId,
              }
            : {
                ...message.message,
                interactive: message.interactive,
              },
          {
            include: {
              association: "interactive",
              include: {
                association: "list",
                include: [
                  {
                    model: TextHeader,
                    as: "listTextHead",
                  },
                  { model: ListSection, as: "sections", include: ["rows"] },
                ],
              },
            },
          }
        ).then(async (newMessage) => {
          return Promise.all([
            newMessage.setChat(chat.id),
            newMessage.setMerchant(merchant.id),
            newMessage.setCustomer(customer.id),
          ]).then(async () => {
            if (addNewChat === true) {
              pubsub.publish("chatAdded", {
                chatAdded: chat,
                merchantId: chat.merchantId,
              });
            }
            pubsub.publish("messageAdded", {
              messageAdded: { message: newMessage },
              chatId: newMessage.chatId,
            });

            const newChat = await Chat.update(
              {
                ...chat,
                createdAt: chat.createdAt,
              },
              {
                where: {
                  merchantId: merchant.id,
                  customerId: customer.id,
                },
                silent: false,
              }
            ).then((chat) => {
              return chat;
            });
            // send the message to whatsapp after it is saved into the database
            return newMessage;
          });
        });
        return newMessage;
      },

      async addButtonRepliedMessage(
        root,
        { message, participants, contextMessage },
        context
      ) {
        const {
          customer,
          merchant,
          chat,
          addNewChat,
          messageId,
          contextedMessage,
        } = await getCreateChatForMessage({
          Merchant: Merchant,
          Customer: Customer,
          Chat: Chat,
          participants: participants,
          message: message,
          context: context,
          Message: Message,
          contextMessage: contextMessage,
          InteractiveMessage: InteractiveMessage,
          InteractiveButton: InteractiveButton,
        });

        message.mesBtnReply["interactiveButtonId"] =
          contextedMessage.interactive.button.id;

        const newMessage = await Message.create(
          messageId
            ? {
                ...message.message,
                mesBtnReply: message.mesBtnReply,
                messageId: messageId,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              }
            : {
                ...message.message,
                mesBtnReply: message.mesBtnReply,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              },
          {
            include: {
              association: "mesBtnReply",
              // include: {
              //   association: ''
              // }
            },
          }
        ).then(async (newMessage) => {
          return Promise.all([
            newMessage.setChat(chat.id),
            newMessage.setMerchant(merchant.id),
            newMessage.setCustomer(customer.id),
            // newMessage.buttonReply.setInteractiveButton(contextedMessage.interactive.button.id)
          ]).then(async () => {
            if (addNewChat === true) {
              pubsub.publish("chatAdded", {
                chatAdded: chat,
                merchantId: chat.merchantId,
              });
            }
            pubsub.publish("messageAdded", {
              messageAdded: { message: newMessage },
              chatId: newMessage.chatId,
            });

            const newChat = await Chat.update(
              {
                ...chat,
                createdAt: chat.createdAt,
              },
              {
                where: {
                  merchantId: merchant.id,
                  customerId: customer.id,
                },
                silent: false,
              }
            ).then((chat) => {
              return chat;
            });
            return newMessage;
          });
        });

        // update the contexted message
        if (contextedMessage.isAd) {
          tempMarketPerformance({
            Ad: Ad,
            merchantId: merchant.id,
            adId: contextedMessage.adId,
          });
        }

        return newMessage;
      },

      async addTemplateRepliedMessage(
        root,
        { message, participants, contextMessage },
        context
      ) {
        const {
          customer,
          merchant,
          chat,
          addNewChat,
          messageId,
          contextedMessage,
        } = await getCreateChatForMessage({
          Merchant: Merchant,
          Customer: Customer,
          Chat: Chat,
          participants: participants,
          message: message,
          context: context,
          Message: Message,
          contextMessage: contextMessage,
          InteractiveMessage: InteractiveMessage,
          InteractiveTemplate: InteractiveTemplate,
        });

        message.mesTempReply["interactiveTemplateId"] =
          contextedMessage?.interactive.template.id;
        const newMessage = await Message.create(
          messageId
            ? {
                ...message.message,
                mesTempReply: message.mesTempReply,
                messageId: messageId,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              }
            : {
                ...message.message,
                mesTempReply: message.mesTempReply,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              },
          {
            include: {
              association: "mesTempReply",
            },
          }
        ).then(async (newMessage) => {
          return Promise.all([
            newMessage.setChat(chat.id),
            newMessage.setMerchant(merchant.id),
            newMessage.setCustomer(customer.id),
            // newMessage.buttonReply.setInteractiveButton(contextedMessage.interactive.button.id)
          ]).then(async () => {
            if (addNewChat === true) {
              pubsub.publish("chatAdded", {
                chatAdded: chat,
                merchantId: chat.merchantId,
              });
            }
            pubsub.publish("messageAdded", {
              messageAdded: { message: newMessage },
              chatId: newMessage.chatId,
            });

            const newChat = await Chat.update(
              {
                ...chat,
                createdAt: chat.createdAt,
              },
              {
                where: {
                  merchantId: merchant.id,
                  customerId: customer.id,
                },
                silent: false,
              }
            ).then((chat) => {
              return chat;
            });
            return newMessage;
          });
        });

        // update the contexted message
        if (contextedMessage.isAd) {
          await tempMarketPerformance({
            Ad: Ad,
            merchantId: merchant.id,
            adId: contextedMessage.adId,
            MarketingResponse: MarketingResponse,
            response: {
              customerId: customer.id,
              messageId: newMessage.id,
              productId: contextedMessage?.interactive?.template?.productId,
            },
          });
        }

        return newMessage;
      },

      async addListRepliedMessage(
        root,
        { message, participants, contextMessage },
        context
      ) {
        const {
          customer,
          merchant,
          chat,
          addNewChat,
          messageId,
          contextedMessage,
        } = await getCreateChatForMessage({
          Merchant: Merchant,
          Customer: Customer,
          Chat: Chat,
          participants: participants,
          message: message,
          context: context,
          Message: Message,
          contextMessage: contextMessage,
          InteractiveMessage: InteractiveMessage,
          InteractiveList: InteractiveList,
          ListSection: ListSection,
        });

        let rowId = undefined;
        contextedMessage?.interactive?.list?.sections?.every((section) => {
          section?.rows?.every((row) => {
            if (row?.buttonId === message.mesListReply.buttonId) {
              rowId = row?.id;
              return false;
            } else {
              return true;
            }
          });
          if (rowId) {
            return false;
          } else return true;
        });

        message.mesListReply["listRowButtonId"] = rowId;

        const newMessage = await Message.create(
          messageId
            ? {
                ...message.message,
                mesListReply: message.mesListReply,
                messageId: messageId,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              }
            : {
                ...message.message,
                mesListReply: message.mesListReply,
                hasContext: contextedMessage ? true : false,
                contextId: contextedMessage ? contextedMessage.id : null,
              },
          {
            include: {
              association: "mesListReply",
            },
          }
        ).then(async (newMessage) => {
          return Promise.all([
            newMessage.setChat(chat.id),
            newMessage.setMerchant(merchant.id),
            newMessage.setCustomer(customer.id),
            // newMessage.buttonReply.setInteractiveButton(contextedMessage.interactive.button.id)
          ]).then(async () => {
            if (addNewChat === true) {
              pubsub.publish("chatAdded", {
                chatAdded: chat,
                merchantId: chat.merchantId,
              });
            }
            pubsub.publish("messageAdded", {
              messageAdded: { message: newMessage },
              chatId: newMessage.chatId,
            });

            const newChat = await Chat.update(
              {
                ...chat,
                createdAt: chat.createdAt,
              },
              {
                where: {
                  merchantId: merchant.id,
                  customerId: customer.id,
                },
                silent: false,
              }
            ).then((chat) => {
              return chat;
            });
            return newMessage;
          });
        });

        // update the contexted message
        if (contextedMessage.isAd) {
          tempMarketPerformance({
            Ad: Ad,
            merchantId: merchant.id,
            adId: contextedMessage.adId,
          });
        }

        return newMessage;
      },

      async addTemplateMesBulk(
        root,
        { message, selectedCustomers, template },
        context
      ) {
        let merchant = context.merchant;
        let addNewChat = false;
        let messageId = null;
        if (!merchant) {
          throw new Error("Unauthenticated you need to be logged in!");
        }

        const customers = JSON.parse(selectedCustomers);
        // prepare the template and merchants settings
        let tempData = JSON.parse(template);
        let setting = await merchant.getSetting();
        setting = setting.dataValues;
        if (!setting) {
          throw new Error(
            "We could not find you Whatsapp business Setting make sure you add the settings before sending any message."
          );
        }
        let adTemplate = undefined;
        let ad = undefined;

        try {
          adTemplate = await AdTemplate.create({
            name: tempData.template.name,
            productId: message.interactive.template?.productId,
          }).then((newAdTemplate) => {
            newAdTemplate.setMerchant(merchant.id);
            return newAdTemplate;
          });
          if (adTemplate) {
            ad = await Ad.create().then(async (newAd) => {
              await Promise.all([
                newAd.setMerchant(merchant.id),
                newAd.setAdTemplate(adTemplate.id),
              ]);
              return newAd;
            });
            if (!ad) {
              throw new Error(
                "An error occured while creating your marketing campaign please try again later or contact us"
              );
            }
          }
        } catch (error) {
          console.log(error);
          logger.log({
            level: "error",
            message: `[ERROR CREATING AD FOR MERCHANT], ${merchant.id}`,
          });
          throw new Error(
            "An error occured while creating your marketing campaign please try again later or contact us"
          );
        }

        customers.forEach(async (customer) => {
          try {
            tempData.to = customer.phone_number;
            const { data: response } = await sendWhatsAppMessage(
              tempData,
              setting
            );

            if (response) {
              messageId = response.messages[0].id;

              let chat;
              try {
                chat = await getChat(Chat, customer.id, merchant.id);
                if (!chat) {
                  chat = await createChat(Chat, customer.id, merchant.id);
                  addNewChat = true;
                }
              } catch (error) {
                logger.log({
                  level: "error",
                  message: `Could not create chat before sending bulk message for ${
                    (customer.id, merchant.id)
                  }`,
                });
              }

              const newMessage = await Message.create(
                messageId
                  ? {
                      ...message.message,
                      chatId: chat.id,
                      interactive: message.interactive,
                      messageId: messageId,
                      isAd: true,
                      adId: ad.id,
                    }
                  : {
                      ...message.message,
                      chatId: chat.id,
                      interactive: message.interactive,
                      isAd: true,
                      adId: ad.id,
                    },
                {
                  include: {
                    association: "interactive",
                    include: {
                      association: "template",
                      include: ["tempImageHead", "buttons", "tempTextHead"],
                    },
                  },
                }
              ).then(async (newMessage) => {
                return Promise.all([
                  newMessage.setChat(chat.id),
                  newMessage.setMerchant(merchant.id),
                  newMessage.setCustomer(customer.id),
                ]).then(async () => {
                  if (addNewChat === true) {
                    pubsub.publish("chatAdded", {
                      chatAdded: chat,
                      merchantId: chat.merchantId,
                    });
                  }
                  pubsub.publish("messageAdded", {
                    messageAdded: { message: newMessage },
                    chatId: newMessage.chatId,
                  });

                  if (!adTemplate?.messageId) {
                    await AdTemplate.update(
                      {
                        ...adTemplate,
                        messageId: newMessage.id,
                      },
                      {
                        where: {
                          id: adTemplate.id,
                        },
                      }
                    );
                  }
                  // send the message to whatsapp after it is saved into the database
                  return newMessage;
                });
              });

              return newMessage;
            } else {
              // no data from whatsapp
              const result = await Ad.update(
                {
                  ...ad,
                  failed: ad.failed !== null ? (ad.failed += 1) : 1,
                },
                {
                  where: {
                    id: ad.id,
                  },
                  silent: false,
                }
              );
            }
          } catch (error) {
            logger.log({
              level: "error",
              message: `[ERROR SENDING MESSAGE TO CUSTOMER] for ${merchant.id} bulk message`,
            });

            ad = await Ad.update(
              {
                ...ad,
                failed: ad.failed !== null ? (ad.failed += 1) : 1,
              },
              {
                where: {
                  id: ad.id,
                },
                returning: true,
                plain: true,
              }
            ).then((result) => {
              const ad = result[1];
              return ad;
            });
          }
        });
      },

      async addSetting(root, { setting }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error("not_allowed");
        }
        // the authenticated merchant
        setting.callBack_url = `${process.env.WEBHOOK_BASE_URL}/incoming?username=${merchant.username}`;

        const existingSetting = await Setting.findOne({
          where: {
            merchantId: merchant.id,
          },
        });
        if (existingSetting) {
          // update settings
          await Setting.update(
            {
              ...setting,
            },
            {
              where: {
                merchantId: merchant.id,
              },
            }
          ).then((setting) => {
            logger.log({
              level: "info",
              message: "setting updated",
            });
            return setting;
          });
        } else {
          // add the webhook url
          // create a new setting
          return Setting.create({
            ...setting,
          }).then(async (newSetting) => {
            Promise.all([newSetting.setMerchant(merchant.id)]);
            logger.log({
              level: "info",
              message: "Setting created",
            });
            return newSetting;
          });
        }
      },

      async addStore(root, { store }, context) {
        const merchant = context.merchant;

        if (merchant) {
          const existingStore = await Store.findOne({
            where: {
              name: store.name,
              merchantId: merchant.id,
            },
          });

          if (existingStore) {
            throw new Error(
              `Store of name "${existingStore.name}" already exists. Use a different name to create a new store`
            );
          }

          const newStore = await Store.create({
            ...store,
          }).then(async (newStore) => {
            return Promise.all([newStore.setMerchant(merchant.id)]).then(() => {
              logger.log({
                level: "info",
                message: `Store of merchant ${merchant.id}`,
              });

              return newStore;
            });
          });

          return newStore;
        }
      },

      async updateStore(root, { storeId, payload }, context) {
        if (!context.merchant) {
          throw new Error("Unauthenticated please make sure you are logged in");
        }

        if (!storeId) {
          throw new Error(
            "Unathorized operation store Id and the new name required"
          );
        }

        let store = await getStore(Store, storeId, context.merchant.id);

        if (!store) {
          throw new Error("Unathorized operation could not find the store");
        }

        const duplicateStore = await getDupStore(
          Store,
          payload.name,
          context.merchant.id
        );

        if (duplicateStore) {
          if (store.id !== duplicateStore.id) {
            throw new Error(`Store of name "${payload.name}" already exists.`);
          }
        }

        try {
          const id = await Store.update(
            {
              ...store,
              name: payload.name,
            },
            {
              where: {
                id: parseInt(storeId),
                merchantId: context.merchant.id,
              },
            }
          );

          if (id[0] === 0) {
            throw new Error("Update failed");
          }

          store = await getStore(Store, storeId, context.merchant.id);
        } catch (error) {
          console.log("[UPDATING STORE ERROR]", error);
          if (error.validatorKey === "not_unique") {
            throw new Error(
              `A store of the give name ${payload.name} already exists`
            );
          }
          logger.log({
            level: "error",
            message: `update store for ${
              context.merchant.id
            } failed ${new Date().toLocaleDateString()}`,
          });
        }

        return store;
      },

      async deleteStore(root, { storeId }, context) {
        if (!context.merchant) {
          throw new Error("Unauthorized make sure you are logged in.");
        }

        const store = await getStore(Store, storeId, context.merchant.id);

        if (!store) {
          throw new Error("Unauthorized operation");
        }
        try {
          const store = await Store.destroy({
            where: {
              id: storeId,
              merchantId: context.merchant.id,
            },
          });
        } catch (error) {
          console.log(error);
          return false;
        }
        return true;
      },

      async addMpesa(root, { mpesa }, context) {
        const merchant = context.merchant;
        
        if(!merchant)
          throw new Error("Unathenticated please make sure you are logged in.");

        const store = await getStore(Store, mpesa.storeId, merchant.id)
        if(!store){
          throw new Error("Unauthorized operation.")
        }

        const exisistingMpesa = await MpesaSetting.findOne({
          where: {
            storeId: mpesa.storeId
          }
        })
        if(exisistingMpesa)
          throw new Error("A store can only have one Mpesa payment service. ${store.name} has an existing payment service. Update or delete.");
      
        try {
          const newMpesa = await MpesaSetting.create({
            ...mpesa,
          })
  
          return newMpesa;
        } catch {
          logger.log({
            level: "error",
            message: `Failed to create mpesa for ${merchant.id}`
          })
          throw new Error ("Failed to create mpesa settings.")
        }
      },

      async updateMpesa(root, { mpesaId, payload }, context) {
        if (!context.merchant) {
          throw new Error("Unauthenticated please make sure you are logged in");
        }
        if (!payload.storeId) {
          throw new Error(
            "Store Id is required"
          );
        }
        let store = await getStore(Store, payload.storeId, context.merchant.id);

        if (!store) {
          throw new Error("Unathorized operation could not find the store");
        }


        let mpesa = MpesaSetting.findOne({
          where: {
            id: mpesaId,
            storeId: payload.storeId
          }
        })

        if(!mpesa){
          throw new Error("Could of find Mpesa settings")
        }

        try {
          const updatedMpesa = await MpesaSetting.update(
            {
              ...mpesa,
              consumer_key: payload.consumer_key,
              consumer_secret: payload.consumer_secret,
              pass_key: payload.pass_key,
              business_shortcode: payload.business_shortcode,
              account_reference: payload.account_reference,
              transaction_desc: payload.transaction_desc,
              callback_url: payload.callback_url,
            },
            {
              where: {
                id: parseInt(mpesaId),
                storeId: payload.storeId,
              },
              returning: true,
              plain: true,
            }
          ).then((result) => {
            return result[1]
          });
          return updatedMpesa
        } catch (error) {
          logger.log({
            level: "error",
            message: `update mpesa for ${
              context.merchant.id
            } failed ${new Date().toLocaleDateString()}`,
          });
        }
      },

      async deleteMpesa(root, { mpesaId, storeId }, context) {
        if (!context.merchant) {
          throw new Error("Unauthorized make sure you are logged in.");
        }

        const store = await getStore(Store, storeId, context.merchant.id);

        if (!store) {
          throw new Error("Unauthorized operation");
        }


        try {
          await MpesaSetting.destroy({
            where: {
              storeId: storeId,
              id: mpesaId,
            },
          });
        } catch (error) {
          return "failed";
        }
        return "success";
      },

      async updateChatStatus(root, { participants, payload }, context) {
        // from webhook
        let merchant = null;
        let customer = null;
        let message = null;
        let chat = null;
        try {
          merchant = await Merchant.findOne({
            where: {
              username: participants.mer_username,
            },
          });

          customer = await Customer.findOne({
            where: {
              phone_number: participants.customer.phone_number,
              merchantId: merchant.id,
            },
          });
          if (!customer || !merchant) {
            logger.log({
              level: "error",
              message: `"Could not find merchant or customer" ${participants.mer_username} ${participants.customer.phone_number}} `,
            });
          } else {
            message = await Message.findOne({
              where: {
                merchantId: parseInt(merchant.id), // this is unique
                customerId: parseInt(customer.id),
                messageId: payload.messageId,
              },
            });

            if (message) {
              const result = await Message.update(
                {
                  ...message,
                  status:
                    message.status === "read"
                      ? "read"
                      : message.status === "delivered"
                      ? "delivered"
                      : payload.status,
                },
                {
                  where: {
                    id: message.id,
                  },
                  silent: false,
                }
              );

              if (result[0] === 0) {
                logger.log({
                  level: "error",
                  message: `Update failed for message of ${merchant.id} and customer ${customer.id}`,
                });
                return;
              } else {
                message = await Message.findOne({
                  where: {
                    id: message.id,
                    merchantId: merchant.id,
                    customerId: customer.id,
                  },
                });
              }
              pubsub.publish("messageAdded", {
                messageAdded: { message: message },
                chatId: message.chatId,
              });

              // check if message is a marketing campaign and update the the marketing performance
              if (message.isAd) {
                const ad = await getAd(Ad, merchant.id, message.adId);

                const result = await Ad.update(
                  {
                    ...ad,
                    [message.status]:
                      ad[`${message.status}`] !== null
                        ? (ad[`${message.status}`] += 1)
                        : 1,
                  },
                  {
                    where: {
                      id: ad.id,
                    },
                    silent: false,
                  }
                );
              }
            }

            // updating the conversation status
            chat = await getChat(Chat, customer.id, merchant.id);
            if (chat && payload.conversationId) {
              chat = await Chat.update(
                {
                  ...chat,
                  status: "opened",
                  conversationId: payload.conversationId,
                },
                {
                  where: {
                    merchantId: merchant.id,
                    customerId: customer.id,
                  },
                  silent: false,
                }
              );
            }
          }
        } catch (error) {
          console.log("[AN ERROR WHILE UPDATING MESSAGE]", error);
        }
      },

      async updateMessageStatus(root, { id, messageId }, context) {
        const merchant = context.merchant;
        if (merchant) {
          try {
            let updated = false;
            let message = await Message.findOne({
              where: {
                id,
                messageId,
              },
            });

            if (message && message.status !== "read") {
              result = await Message.update(
                {
                  ...message,
                  status: "read",
                },
                {
                  where: {
                    id,
                    messageId,
                  },
                  silent: false,
                }
              );

              updated = true;
              if (result[0] === 0) {
                logger.log({
                  level: "error",
                  message: `"updating message failed" "${message.merchantId}"`,
                });
              }

              message = await Message.findOne({
                where: {
                  id: message.id,
                },
                include: [
                  {
                    model: TextMessage,
                    as: "text",
                  },
                  {
                    model: ImageMessage,
                    as: "image",
                  },
                ],
              }).then(async (message) => {
                if (updated === true) {
                  let setting = await merchant.getSetting();
                  setting = setting.dataValues;
                  let sendDeliveredStatus = messageStatuses.read;
                  sendDeliveredStatus.message_id = messageId;
                  const response = await sendWhatsAppMessage(
                    sendDeliveredStatus,
                    setting
                  );
                }

                return message;
              });

              return message;
            }
          } catch (error) {
            console.log("[AN ERROR WHILE UPDATING MESSAGE]");
          }
        }
      },

      
      async addBillboard(root, { billboard }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated make sure you are logged in to create a billboard"
          );
        }

        // find the users store
        const store = await getStore(
          Store,
          billboard.storeId,
          context.merchant.id
        );

        if (!store) {
          throw new Error("Unauthorized operation");
        }

        let existBillboard = await Billboard.findOne({
          where: {
            storeId: store.id,
            label: billboard.label,
          },
        });

        if (existBillboard) {
          throw new Error(
            `Billboard of name ${billboard.label} already exists.`
          );
        }

        try {
          const newBillboard = await Billboard.create({
            ...billboard,
          });
          return newBillboard;
        } catch (error) {
          logger.log({
            level: "error",
            message: `An error occured while creating billboard for ${
              merchant.id
            } at ${new Date().toLocaleDateString()}`,
          });
          throw new Error(
            "Could not create a billboard try again later",
            error
          );
        }
      },

      async updateBillboard(root, { billboardId, payload }, context) {
        if (!context.merchant) {
          throw new Error("Unauthorized make sure you are logged in.");
        }
        if (!billboardId) {
          throw new Error("Billboard id is required");
        }

        if (!payload.storeId) {
          throw new Error("Unauthorized operation");
        }

        const store = await getStore(
          Store,
          payload.storeId,
          context.merchant.id
        );

        if (!store) {
          throw new Error("Unauthorized operation");
        }

        let billboard = await Billboard.findOne({
          where: {
            id: billboardId,
            storeId: store.id,
          },
        });

        if (!billboard) {
          throw new Error("Could not find the billboard");
        }

        const duplicateBillboard = await getDupBillboard(
          Billboard,
          payload.label,
          store.id
        );

        if (duplicateBillboard) {
          if (billboard.id !== duplicateBillboard.id) {
            throw new Error(
              `Billboard of name "${payload.label}" already exists.`
            );
          }
        }

        try {
          if (!payload.label) {
            throw new Error("Label is required");
          }
          if (!payload.imageUrl) {
            throw new Error("Image Url is required");
          }

          const id = await Billboard.update(
            {
              ...billboard,
              label: payload.label,
              imageUrl: payload.imageUrl,
            },
            {
              where: {
                id: parseInt(billboard.id),
                storeId: billboard.storeId,
              },
            }
          );
          if (id[0] === 0) {
            throw new Error("Update failed.");
          }

          const updatedBillboard = await getBillboard(Billboard, billboardId);
          return updatedBillboard;
        } catch (error) {
          console.log("[UPDATING BILLBOARD ERROR]", error);
          if (error.validatorKey === "not_unique") {
            throw new Error(
              `A billboard of the give name ${payload.name} already exists`
            );
          }
          logger.log({
            level: "error",
            message: `update store for ${
              context.merchant.id
            } failed ${new Date().toLocaleDateString()}`,
          });
        }
      },

      async deleteBillboard(root, { billboardId, storeId }, context) {
        console.log("DELETING BILLBOARD", billboardId, storeId);
        if (!context.merchant.id) {
          throw new Error("Unauthenticated make sure you are logged in");
        }

        if (!billboardId) {
          throw new Error("Billboard ID is requreid");
        }

        if (!storeId) {
          throw new Error("Unauthorized operation store Id does not match");
        }

        const store = await getStore(Store, storeId, context.merchant.id);

        if (!store) {
          throw new Error("Unauthaurized operation");
        }

        const billboard = await Billboard.findOne({
          where: {
            id: billboardId,
            storeId: store.id,
          },
        });
        if (!billboard) {
          throw new Error("Could not find the billboard.");
        }
        try {
          const billboard = await Billboard.destroy({
            where: {
              id: billboardId,
            },
          });
        } catch (error) {
          console.log(error);
          return false;
        }
        return true;
      },

      async addBrand(root, { brand }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a brand"
          );
        }
        if(!brand.storeId) {
          throw new Error("Store Id is required");
        }

        const store = await getStore(Store, brand.storeId, merchant.id);

        if (!store) {
          throw new Error("Unauthorized operation");
        }

        let existingBrand = await Category.findOne({
          where: {
            name: brand.name,
            storeId: store.id,
          },
        });

        if (existingBrand) {
          throw new Error(
            `Brand of name ${existingBrand.name} already exists.`
          );
        }

        try {
          const newBrand = await Brand.create({
            ...brand,
          }).then((newBrand) => {
            newBrand.setStore(store.id);
            return newBrand;
          });
          return newBrand;
        } catch (error) {
          if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error(`Brand of name ${brand.name} already exists.`);
          } else {
            logger.log({
              level: "error",
              message: `An error occured while creating brand for ${
                merchant.id
              } at ${new Date().toLocaleDateString()}`,
            });
            throw error;
          }
        }
      },

      async updateBrand(root, { brandId, payload }, context) {
        if (!context.merchant) {
          throw new Error("Unauthorized make sure you are logged in.");
        }
        if (!brandId) {
          throw new Error("Brand id is required.");
        } else if (!payload.storeId) {
          throw new Error("Store id is required");
        }

        const store = await getStore(
          Store,
          payload.storeId,
          context.merchant.id
        );
        if (!store) {
          throw new Error("Unauthorized operation.");
        }

        let brand = await Brand.findOne({
          where: {
            id: brandId,
            storeId: store.id,
          },
        });

        if (!brand) {
          throw new Error("Could not find the brand.");
        }

        // if (brand.name.toLowerCase() == payload.name.toLowerCase()) {
        //   throw new Error(
        //     `Brand of name ${payload.name} already exists.`
        //   );
        // }

        try {
          const updatedBrand = await Brand.update(
            {
              ...brand,
              name: payload.name,
              joinDate: payload.joinDate,
              description: payload.description,
              phoneNumber: payload.phoneNumber,
              industry: payload.industry,
              loc_name: payload.loc_name,
              loc_address: payload.loc_address,
              loc_latitude: payload.loc_address,
              loc_url: payload.loc_url
            },
            {
              where: {
                id: parseInt(brandId),
              },
              returning: true,
              plain: true,
            }
          ).then((result) => {
            const temp = result[1];
            return temp
          })

          return updatedBrand;
        } catch (error) {
          if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error(`Brand of name ${payload.name} already exists.`);
          } else {
            logger.log({
              level: "error",
              message: `An error occured while updating brand for ${
                context.merchant.id
              } at ${new Date().toLocaleDateString()}`,
            });s
            throw error;
          }
        }
      },

      async deleteBrand(root, { brandId, storeId }, context) {
        if (!context.merchant.id) {
          throw new Error("Unauthenticated make sure you are logged in");
        }

        if (!brandId) {
          throw new Error("Brand ID is requreid");
        }

        if (!storeId) {
          throw new Error("Store Id id required");
        }

        const store = await getStore(Store, storeId, context.merchant.id);

        if (!store) {
          throw new Error("Unauthaurized operation");
        }

        try {
          await Brand.destroy({
            where: {
              id: brandId,
              storeId: store.id,
            },
          });
        } catch (error) {
          return "failed";
        }
        return "success";
      },

      async addCategory(root, { category }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }
        if (!category.name) {
          throw new Error("Category name is required");
        } else if (!category.billboardId) {
          throw new Error("Billboard Id is required");
        }

        // find the users store
        const billboard = await getBillboard(Billboard, category.billboardId);

        if (!billboard) {
          throw new Error("Could not find the billboard");
        }

        const store = await getStore(Store, billboard.storeId, merchant.id);

        if (!store) {
          throw new Error("Unauthorized operation");
        }

        let existingCategory = await Category.findOne({
          where: {
            name: category.name,
            billboardId: category.billboardId,
            storeId: store.id,
          },
        });

        if (existingCategory) {
          throw new Error(
            `Category of name ${existingCategory.name} already exists.`
          );
        }

        try {
          const newCategory = await Category.create({
            ...category,
          }).then((newCategory) => {
            newCategory.setStore(store.id);
            return newCategory;
          });
          return newCategory;
        } catch (error) {
          logger.log({
            level: "error",
            message: `An error occured while creating category for ${
              merchant.id
            } at ${new Date().toLocaleDateString()}`,
          });
          throw new Error("Could not create a category try again later", error);
        }
      },

      async updateCategory(root, { categoryId, payload }, context) {
        if (!context.merchant) {
          throw new Error("Unauthorized make sure you are logged in.");
        }
        if (!categoryId) {
          throw new Error("Cateory id is required.");
        } else if (!payload.name) {
          throw new Error("A name is required");
        } else if (!payload.billboardId) {
          throw new Error("Billboard id is required");
        }

        let category = await Category.findOne({
          where: {
            id: categoryId,
          },
        });
        if (!category) {
          throw new Error("Could not find the category.");
        }

        const billboard = await getBillboard(Billboard, payload.billboardId);
        if (!billboard) {
          throw new Error("Could not find billboard.");
        }

        const store = await getStore(
          Store,
          billboard.storeId,
          context.merchant.id
        );
        if (!store) {
          throw new Error("Unauthorized operation.");
        }

        const duplicateCategory = await getDupCategory(
          Category,
          payload.name,
          billboard.id
        );

        if (duplicateCategory) {
          if (category.id !== duplicateCategory.id) {
            throw new Error(
              `Category of name "${payload.name}" already exists for this store.`
            );
          }
        }

        try {
          const id = await Category.update(
            {
              ...category,
              name: payload.name,
              billboardId: payload.billboardId,
            },
            {
              where: {
                id: parseInt(categoryId),
              },
            }
          );
          if (id[0] === 0) {
            throw new Error("Update failed");
          }
          const updatedCategory = await getCategory(Category, categoryId);
          return updatedCategory;
        } catch (error) {
          console.log("[UPDATING BILLBOARD ERROR]", error);
          if (error.validatorKey === "not_unique") {
            throw new Error(
              `A category of the given name ${payload.name} already exists`
            );
          }
          logger.log({
            level: "error",
            message: `update store for ${
              context.merchant.id
            } failed ${new Date().toLocaleDateString()}`,
          });
        }
      },

      async deleteCategory(root, { categoryId, storeId }, context) {
        console.log("DELETING BILLBOARD", categoryId, storeId);
        if (!context.merchant.id) {
          throw new Error("Unauthenticated make sure you are logged in");
        }

        if (!categoryId) {
          throw new Error("Category ID is requreid");
        }

        if (!storeId) {
          throw new Error("Store Id id required");
        }

        const store = await getStore(Store, storeId, context.merchant.id);

        if (!store) {
          throw new Error("Unauthaurized operation");
        }

        try {
          const category = await Category.destroy({
            where: {
              id: categoryId,
              storeId: store.id,
            },
          });
        } catch (error) {
          console.log(error);
          return false;
        }
        return true;
      },

      // ########################## PRODUCTS ####################################

      async addProduct(root, { product }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }
        if (!product.name) {
          throw new Error("Product name is required");
        } else if (!product.price) {
          throw new Error("product price is required");
        } else if (!product.categoryId) {
          throw new Error("Product's category id is required");
        } else if (!product.storeId) {
          throw new Error("Product's store id is required");
        } else if (!product.images || !product.images.length) {
          throw new Error("Product images is required.");
        }

        const store = await getStore(Store, product.storeId, merchant.id);

        if (!store) {
          throw new Error("Unauthorized operation.");
        }

        let existingProduct = await Product.findOne({
          where: {
            name: product.name,
            categoryId: product.categoryId,
            storeId: product.storeId,
          },
        });

        if (existingProduct) {
          throw new Error(
            `Category of name ${existingProduct.name} already exists.`
          );
        }

        const formattedImages = product.images.map((image) => ({
          ...image,
          storeId: product.storeId,
        }));

        try {
          const newProduct = await Product.create(
            {
              ...product,
              images: formattedImages,
            },
            {
              include: ["images"],
            }
          ).then((newProduct) => {
            newProduct.setStore(store.id);
            return newProduct;
          });

          return newProduct;
        } catch (error) {
          logger.log({
            level: "error",
            message: `An error occured while creating product for ${
              merchant.id
            } at ${new Date().toLocaleDateString()}`,
          });
          console.log(error);
          throw new Error("Could not create a product try again later", error);
        }
      },

      async updateProduct(root, { productId, payload }, context) {
        if (!context.merchant) {
          throw new Error("Unauthorized make sure you are logged in.");
        }
        if (!productId) {
          throw new Error("Product id is required.");
        } else if (!payload.name) {
          throw new Error("A product name is required");
        } else if (!payload.storeId) {
          throw new Error("Store id is required");
        } else if (!payload.categoryId) {
          throw new Error("Category id is required");
        } else if (!payload.images || !payload.images.length) {
          throw new Error("Product images is required.");
        }

        const product = await getProduct(Product, productId);
        if (!product) {
          throw new Error("Could not find product.");
        }

        const store = await getStore(
          Store,
          product.storeId,
          context.merchant.id
        );
        if (!store) {
          throw new Error("Unauthorized operation.");
        }

        const duplicateProduct = await getDupProduct(
          Product,
          payload.name,
          product.categoryId
        );

        if (duplicateProduct) {
          if (product.id !== duplicateProduct.id) {
            throw new Error(
              `Product of name "${payload.name}" already exists for this store.`
            );
          }
        }

        // delete all images first
        await Image.destroy({
          where: {
            productId: productId,
            storeId: payload.storeId,
          },
        });

        try {
          const id = await Product.update(
            {
              ...product,
              ...payload,
            },
            {
              where: {
                id: parseInt(productId),
              },
            },
            {
              include: ["images"],
            }
          );
          if (id[0] === 0) {
            throw new Error("Update failed");
          }

          const updatedProduct = await getProduct(Product, productId);
          const formattedImages = await payload.images.map((image) => ({
            ...image,
            storeId: store.id,
            productId: updatedProduct.id,
          }));
          const images = await Image.bulkCreate(formattedImages);

          return updatedProduct;
        } catch (error) {
          console.log("[UPDATING PRODUCT ERROR]", error);
          if (error.validatorKey === "not_unique") {
            throw new Error(
              `A category of the given name ${payload.name} already exists`
            );
          }
          logger.log({
            level: "error",
            message: `update store for ${
              context.merchant.id
            } failed ${new Date().toLocaleDateString()}`,
          });
        }
      },

      async deleteProduct(root, { productId, storeId }, context) {
        if (!context.merchant.id) {
          throw new Error("Unauthenticated make sure you are logged in");
        }

        if (!productId) {
          throw new Error("Product ID is requreid");
        }

        if (!storeId) {
          throw new Error("Store ID is required");
        }

        const store = await getStore(Store, storeId, context.merchant.id);

        if (!store) {
          throw new Error("Unauthaurized operation");
        }

        try {
          const product = await Product.destroy({
            where: {
              id: productId,
              storeId: store.id,
            },
          });
        } catch (error) {
          console.log(error);
          return false;
        }
        return true;
      },

      async addProductVariations(root, { product }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }
        if (!product.name) {
          throw new Error("Product name is required");
        } else if (!product.price) {
          throw new Error("product price is required");
        } else if (!product.categoryId) {
          throw new Error("Product's category id is required");
        } else if (!product.storeId) {
          throw new Error("Product's store id is required");
        }

        const store = await getStore(Store, product.storeId, merchant.id);

        if (!store) {
          throw new Error("Unauthorized operation.");
        }
        let existingProduct = await Product.findOne({
          where: {
            name: product.name,
            categoryId: product.categoryId,
            storeId: product.storeId,
          },
        });

        if (existingProduct) {
          throw new Error(
            `Product of name ${existingProduct.name} already exists.`
          );
        }

        const newProduct = await Product.create(
          {
            ...product,
          },
          {
            include: [
              {
                association: "images",
              },
              {
                model: Brand,
                as: 'brand'
              },
              {
                association: "prodVariations",
                include: [{ association: "prodVarOptions" }],
              },
              {
                association: "prodCombinations",
                include: [
                  {
                    association: "variantImage",
                  },
                ],
              },
            ],
          }
        ).then((newProduct) => {
          newProduct.setStore(store.id);
          return newProduct;
        });

        return newProduct;
      },

      async updateProductVariation(root, { productId, payload }, context) {
        if (!context.merchant) {
          throw new Error("Unauthorized make sure you are logged in.");
        }
        if (!productId) {
          throw new Error("Product id is required.");
        } else if (!payload.name) {
          throw new Error("A product name is required");
        } else if (!payload.storeId) {
          throw new Error("Store id is required");
        } else if (!payload.categoryId) {
          throw new Error("Category id is required");
        } else if (!payload.images || !payload.images.length) {
          throw new Error("Product images is required.");
        }

        const product = await getProduct(Product, productId);
        if (!product) {
          throw new Error("Could not find product.");
        }

        const store = await getStore(
          Store,
          product.storeId,
          context.merchant.id
        );
        if (!store) {
          throw new Error("Unauthorized operation.");
        }

        const duplicateProduct = await getDupProduct(
          Product,
          payload.name,
          product.categoryId
        );

        if (duplicateProduct) {
          if (product.id !== duplicateProduct.id) {
            throw new Error(
              `Product of name "${payload.name}" already exists for this store.`
            );
          }
        }

        // delete all images first
        await Image.destroy({
          where: {
            productId: productId,
            storeId: payload.storeId,
          },
        });

        // await ProductImage.destroy({
        //   where: {

        //   }
        // })

        try {
          const id = await Product.update(
            {
              ...product,
              name: payload.name,
              price: payload.price,
              isFeatured: payload.isFeatured,
              isArchived: payload.isArchived,
              categoryId: payload.categoryId,
              storeId: payload.storeId,
              prodVariations: payload.prodVariations,
              prodCombinations: payload.prodCombinations,
            },
            {
              where: {
                id: parseInt(productId),
              },
            },
            {
              include: [
                {
                  association: "images",
                },
                {
                  association: "prodVariations",
                  include: [{ association: "prodVarOptions" }],
                },
                {
                  association: "prodCombinations",
                  include: [
                    {
                      association: "variantImage",
                    },
                  ],
                },
              ],
            }
          );
          if (id[0] === 0) {
            throw new Error("Update failed");
          }

          const updatedProduct = await getProduct(Product, productId);

          return updatedProduct;
        } catch (error) {
          console.log("[UPDATING PRODUCT ERROR]", error);
          if (error.validatorKey === "not_unique") {
            throw new Error(
              `A category of the given name ${payload.name} already exists`
            );
          }
          logger.log({
            level: "error",
            message: `update store for ${
              context.merchant.id
            } failed ${new Date().toLocaleDateString()}`,
          });
        }
      },

      async addImage(root, { image }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated make sure you are logged in to create a billboard"
          );
        }

        // find the users store
        const store = await getStore(Store, image.storeId, context.merchant.id);

        if (!store) {
          throw new Error("Unauthorized operation");
        }

        try {
          const newImage = await Image.create({
            ...image,
          });
          return newImage;
        } catch (error) {
          logger.log({
            level: "error",
            message: `An error occured while creating image for ${
              merchant.id
            } at ${new Date().toLocaleDateString()}`,
          });
          throw new Error(
            "Could not create a new image try again later",
            error
          );
        }
      },

      async deleteImage(root, { imageId, storeId }, context) {
        if (!context.merchant.id) {
          throw new Error("Unauthenticated make sure you are logged in");
        }

        if (!imageId) {
          throw new Error("Image ID is requreid");
        }

        if (!storeId) {
          throw new Error("Store ID is required");
        }

        const store = await getStore(Store, storeId, context.merchant.id);

        if (!store) {
          throw new Error("Unauthaurized operation");
        }

        try {
          const image = await Image.destroy({
            where: {
              id: imageId,
              storeId: store.id,
            },
          });
        } catch (error) {
          console.log(error);
          return false;
        }
        return true;
      },

      // The order is registered using customer's phone number
      async addOrder(root, { order, storeId }, context) {
        if (!storeId) {
          throw new Error("Could not find the store.");
        }
        const store = await getStore(Store, storeId);
        if (!store) {
          throw new Error("Unauthorized operation");
        }

        let customer;
        if (order.phone_number) {
          customer = await getCusByNumber(
            Customer,
            order.phone_number,
            store.merchantId
          );
          if (!customer) {
            customer = await createCustomer(
              Customer,
              { phone_number: order.phone_number },
              store.merchantId
            );
          }
        }

        const newOrder = await Order.create(
          {
            ...order,
            phone: customer.phone_number,
            customerId: customer.id,
            status: order.isPaid ? "CONFIRMED" : "PENDING",
            storeId: storeId,
          },
          {
            include: [
              {
                association: "orderItems",
                include: {
                  association: "orderProduct",
                },
              },
            ],
          }
        ).then((newOrder) => {
          let orderID =
            store.name.slice(0, 10).replaceAll(/[^a-zA-Z0-9]/g, "") +
            `-${newOrder.id}`;
          const updated = Order.update(
            {
              ...newOrder,
              orderID: orderID.toLowerCase(),
            },
            {
              where: {
                id: newOrder.id,
              },
              returning: true,
              include: [
                {
                  association: "orderItems",
                  include: {
                    association: "orderProduct",
                  },
                },
              ],
            }
          ).then((result) => {
            const res = Order.findOne({
              where: {
                id: newOrder.id,
              },
              include: [
                {
                  association: "orderItems",
                  include: {
                    association: "orderProduct",
                  },
                },
              ],
            });
            return res;
          });
          return updated;
        });

        return newOrder;
      },

      async updateOrderCheckout(root, { storeId, orderId, payload }, context) {
        console.log("UPDATING Billboard", orderId, payload, storeId);
        if (!orderId) {
          throw new Error("Order id is required");
        }

        if (!storeId) {
          throw new Error("Unauthorized operation");
        }

        const store = await getStore(Store, storeId);

        if (!store) {
          throw new Error("Unauthorized operation");
        }

        let order = await Order.findOne({
          where: {
            id: orderId,
            storeId: store.id,
          },
        });

        if (!order) {
          throw new Error("Could not find the order");
        }

        // Add customer ID to metadata dont create a customer from phone numer
        // let customer
        // if(order.phone_number){
        //   customer = await getCusByNumber(
        //       Customer,
        //       order.phone_number,
        //       store.merchantId
        //     );
        //   if (!customer) {
        //     customer = await createCustomer(
        //       Customer,
        //       { phone_number: order.phone_number },
        //       store.merchantId
        //     );
        //   }
        // }

        try {
          const updatedOrder = await Order.update(
            {
              ...order,
              isPaid: payload.isPaid,
              address: payload.address,
              phone: payload.phone_number,
              status: payload.isPaid ? "CONFIRMED" : "PENDING",
            },
            {
              where: {
                id: parseInt(order.id),
                storeId: storeId,
              },
              returning: true,
              plain: true,
            },
            {
              include: ["orderItems"],
            }
          ).then(async (result) => {
            return await Order.findOne({
              where: {
                id: result[1].id,
              },
              include: [
                {
                  association: "customerOrder",
                },
                {
                  association: "orderItems",
                  include: {
                    association: "orderProduct",
                  },
                },
              ],
            });
          });
          console.log(updatedOrder);
          return updatedOrder;
        } catch (error) {
          logger.log({
            level: "error",
            message: `update orderItesm for ${
              context.merchant.id
            } failed ${new Date().toLocaleDateString()}`,
          });
        }
      },

      // ########## Updating from a merchant physically to remove order items
      // async updateOrder(root, { orderId, payload }, context) {
      //   console.log("UPDATING Billboard", orderId, payload);
      //   if (!orderId) {
      //     throw new Error("Order id is required");
      //   }

      //   if (!payload.storeId) {
      //     throw new Error("Unauthorized operation");
      //   }

      //   const store = await getStore(
      //     Store,
      //     payload.storeId,
      //     context.merchant.id
      //   );

      //   if (!store) {
      //     throw new Error("Unauthorized operation");
      //   }

      //   let order = await Order.findOne({
      //     where: {
      //       id: orderId,
      //       storeId: store.id,
      //     },
      //   });

      //   // console.log(order);
      //   if (!order) {
      //     throw new Error("Could not find the order");
      //   }

      //   await OrderItem.destroy({
      //     where: {
      //       orderId: order.id,
      //     },
      //   });

      //   try {
      //     const updatedOrder = await Order.update(
      //       {
      //         ...order,
      //         isPaid: payload.isPaid,
      //         orderItems: payload.orderItems,
      //         address: payload.address,
      //         phone: payload.phone_number,
      //         status: payload.isPaid ? "CONFIRMED" : "PENDING",
      //       },
      //       {
      //         where: {
      //           id: parseInt(order.id),
      //           storeId: order.storeId,
      //         },
      //         returning: true,
      //         plain: true,
      //       },
      //       {
      //         include: ["orderItems"],
      //       }
      //     ).then(async (result) => {
      //       payload?.orderItems?.forEach(
      //         async (item) => await result[1].createOrderItem(item)
      //       );

      //       return await Order.findOne({
      //         where: {
      //           id: result[1].id,
      //         },
      //         include: [
      //           {
      //             association: "customerOrder",
      //           },
      //           {
      //             association: "orderItems",
      //             include: {
      //               association: "orderProduct",
      //             },
      //           },
      //         ],
      //       });
      //     });
      //     console.log(updatedOrder);
      //     return updatedOrder;
      //   } catch (error) {
      //     logger.log({
      //       level: "error",
      //       message: `update orderItesm for ${
      //         context.merchant.id
      //       } failed ${new Date().toLocaleDateString()}`,
      //     });
      //   }
      // },

      async signupMerchant(
        root,
        { username, password, whatsapp_phone_number, email },
        context
      ) {
        return Merchant.findAll({
          where: {
            [Op.or]: [{ whatsapp_phone_number }, { username }],
          },
          raw: true,
        }).then(async (merchants) => {
          if (merchants.length) {
            throw new Error("Username or phone number already in use");
          } else {
            return bcrypt.hash(password, 10).then((hash) => {
              return Merchant.create({
                username,
                password: hash,
                email,
                whatsapp_phone_number,
                activated: 1,
              }).then((merchant) => {
                const token = JWT.sign(
                  { username, id: merchant.id },
                  JWT_SECRET,
                  {
                    expiresIn: "1d",
                  }
                );
                // set the cookies for the users browser in the context of the user
                setCookie(context, token);
                return { token, merchant };
              });
            });
          }
        });
      },

      async loginMerchant(root, { username, password }, context) {
        return Merchant.findAll({
          where: {
            username,
          },
          raw: true,
        }).then(async (merchants) => {
          if (merchants.length === 1) {
            const merchant = merchants[0];
            const passwordValid = await bcrypt.compare(
              password,
              merchant.password
            );
            if (!passwordValid) {
              throw new Error("Password or username does not match");
            }
            const token = JWT.sign({ username, id: merchant.id }, JWT_SECRET, {
              expiresIn: "1d",
            });

            // add the cookies in the context of the client
            setCookie(context, token);
            return { token, merchant };
          } else {
            throw new Error(
              "Error while logging you in we did not find the user"
            );
          }
        });
      },

      logoutMerchant(root, params, context) {
        setCookie(context, (logout = true)); //remove the cookie from clients context
        return {
          message: true,
        };
      },

      async addBulkTemplateTask(root, { schedule }, context) {
        const merchant = context.merchant;
        if (!merchant)
          throw new Error(
            "Unauthenticated please make sure you are logged in."
          );
        if (!schedule)
          throw new Error("An error occured. Could not add the schedule");

        const newSchedule = await ScheduleTask.create(
          {
            ...schedule,
            merchantId: merchant.id,
            timestamp: new Date(schedule.timestamp).getUTCDate(),
            bulkTempTask: schedule.bulkTempTask,
          },
          {
            include: {
              association: "bulkTempTask",
            },
          }
        );

        console.log(newSchedule);

        return newSchedule;
      },

      async updateBulkTemplateTask(root, { taskId, merchantId }, context) {
        const merchant = context.merchant;
        if (!merchant) throw new Error("No authentication headers");
        if (!merchantId) {
          logger.log({
            level: "error",
            message:
              "##################Could not find the merchant's ID while updating task##########",
          });
        }

        const schedule = await ScheduleTask.findOne({
          where: {
            id: taskId,
            merchantId: merchantId,
          },
        });

        try {
          await ScheduleTask.update(
            {
              ...schedule,
              status: "EXECUTED",
            },
            {
              where: {
                id: taskId,
                merchantId: merchantId,
              },
            }
          );

          return "success";
        } catch (error) {
          logger.log({
            level: "error",
            message: `Could not update {}`,
          });
          console.log(error);
          throw new Error(`Could not update Schedule task for ID ${taskId}`);
        }
      },

      // ############# PROMOTIONS APPLICATIONS #########################
      async addDiscount(root, { discount }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }
        if (!discount.name) {
          throw new Error("Discount name is required");
        } else if (!discount.startDate) {
          throw new Error("Discount's start date is required");
        } else if (!discount.endDate) {
          throw new Error("Discount's end date id is required");
        } else if (!discount.discountType) {
          throw new Error("Discount's type is required");
        } else if (!discount.discountValue) {
          throw new Error("Discount value is required.");
        } else if (!discount.storeId) {
          throw new Error("Discount Store is required.");
        }

        const store = await getStore(Store, discount.storeId, merchant.id);
        if (!store) {
          throw new Error("Unauthorized operation.");
        }

        try {
          const newPromotion = await Promotion.create({
            ...discount,
          });
          return newPromotion;
        } catch (error) {
          console.log(error);
          logger.log({
            level: "error",
            message: `An error occured while creating a discount promotion for ${
              merchant.id
            } at ${new Date().toTimeString()}`,
          });
          throw new Error("Could not create a discount promotion.", error);
        }
      },

      async updateDiscount(root, { promotionId, payload }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }
        if (!payload.name) {
          throw new Error("Discount name is required");
        } else if (!payload.startDate) {
          throw new Error("Discount's start date is required");
        } else if (!payload.endDate) {
          throw new Error("Discount's end date id is required");
        } else if (!payload.discountType) {
          throw new Error("Discount's type is required");
        } else if (!payload.discountValue) {
          throw new Error("Discount value is required.");
        } else if (!payload.storeId) {
          throw new Error("Discount Store is required.");
        }

        const discount = await Promotion.findOne({
          where: {
            id: promotionId,
          },
        });
        if (!discount) {
          throw new Error("Could not find promotion discount.");
        }

        const store = await getStore(
          Store,
          discount.storeId,
          context.merchant.id
        );
        if (!store) {
          throw new Error("Unauthorized operation.");
        }

        try {
          const updatedDiscount = await Promotion.update(
            {
              ...discount,
              name: payload.name,
              startDate: payload.startDate,
              endDate: payload.endDate,
              active: payload.active,
              discountType: payload.discountType,
              discountValue: payload.discountValue,
              description: payload.description,
            },
            {
              where: {
                id: parseInt(promotionId),
                storeId: store.id,
              },
              returning: true,
              plain: true,
            }
          ).then(async (result) => {
            return result[1];
          });

          return updatedDiscount;
        } catch (error) {
          console.log("[UPDATING DISCOUNT ERROR]", error);

          logger.log({
            level: "error",
            message: `update promotin discount for ${
              context.merchant.id
            } failed ${new Date().toLocaleTimeString()}`,
          });
        }
      },

      async deleteDiscount(root, { promotionId, storeId }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }
        if (!promotionId) {
          throw new Error("Could not delete promotion");
        } else if (!storeId) {
          throw new Error("Discount Store is required.");
        }

        const discount = await Promotion.findOne({
          where: {
            id: promotionId,
            name: "discount",
          },
        });
        if (!discount) {
          throw new Error("Could not find promotion discount.");
        }

        const store = await getStore(
          Store,
          discount.storeId,
          context.merchant.id
        );
        if (!store) {
          throw new Error("Unauthorized operation.");
        }

        try {
          const product = await Promotion.destroy({
            where: {
              id: promotionId,
              storeId: store.id,
            },
          });
        } catch (error) {
          console.log(error);
          logger.log({
            level: "error",
            message: `delete promotion discount for ${
              context.merchant.id
            } failed ${new Date().toLocaleTimeString()}`,
          });
          return "failed";
        }
        return "success";
      },
      async addCoupon(root, { promotion }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }
        if (!promotion.name) {
          throw new Error("Discount name is required");
        } else if (!promotion.coupon.validFrom) {
          throw new Error("Discount's start date is required");
        } else if (!promotion.coupon.validTo) {
          throw new Error("Discount's end date id is required");
        } else if (!promotion.coupon.discount) {
          throw new Error("Discount value is required.");
        } else if (!promotion.storeId) {
          throw new Error("Discount Store is required.");
        }

        const store = await getStore(Store, promotion.storeId, merchant.id);
        if (!store) {
          throw new Error("Unauthorized operation.");
        }

        try {
          const newPromotion = await Promotion.create(
            {
              ...promotion,
            },
            {
              include: ["coupon"],
            }
          );
          return newPromotion;
        } catch (error) {
          console.log(error);
          logger.log({
            level: "error",
            message: `An error occured while creating a coupon promotion for ${
              merchant.id
            } at ${new Date().toTimeString()}`,
          });
          throw new Error("Could not create a coupon promotion.", error);
        }
      },

      async updateCoupon(root, { promotionId, payload }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }
        if (!payload.name) {
          throw new Error("Discount name is required");
        } else if (!payload.coupon.validFrom) {
          throw new Error("Discount's start date is required");
        } else if (!payload.coupon.validTo) {
          throw new Error("Discount's end date id is required");
        } else if (!payload.coupon.discount) {
          throw new Error("Discount value is required.");
        } else if (!payload.storeId) {
          throw new Error("Discount Store is required.");
        }

        const promotion = await Promotion.findOne({
          where: {
            id: promotionId,
          },
        });
        if (!promotion) {
          throw new Error("Could not find coupon promotion.");
        }

        const store = await getStore(
          Store,
          promotion.storeId,
          context.merchant.id
        );
        if (!store) {
          throw new Error("Unauthorized operation.");
        }

        try {
          const updatedCoupon = await Promotion.update(
            {
              ...promotion,
              name: payload.name,
              discountType: payload.discountType,
              description: payload.description,
              coupon: payload.coupon,
            },
            {
              where: {
                id: parseInt(promotionId),
                storeId: store.id,
              },
              returning: true,
              plain: true,
              include: {
                association: "coupon",
              },
            }
          ).then(async (result) => {
            console.log("the promotion", promotion)
            const { id, ...rest } = payload.coupon;
            const coupon = await Coupon.update(
              {
                ...rest,
              },
              {
                where: {
                  id: payload.coupon.id,
                },
              }
            );
            return Promotion.findOne({
              where: { id: promotionId },
              include: ["coupon"],
            });
          });

          return updatedCoupon;
        } catch (error) {
          console.log("[UPDATING DISCOUNT ERROR]", error);

          logger.log({
            level: "error",
            message: `update promotin discount for ${
              context.merchant.id
            } failed ${new Date().toLocaleTimeString()}`,
          });
        }
      },

      async deleteCoupon(root, { promotionId, storeId }, context) {
        const merchant = context.merchant;
        if (!merchant) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }
        if (!promotionId) {
          throw new Error("Could not delete promotion");
        } else if (!storeId) {
          throw new Error("Coupon Store is required.");
        }

        const promotion = await Promotion.findOne({
          where: {
            id: promotionId,
            name: "coupon"
          },
        });
        if (!promotion) {
          throw new Error("Could not find coupon promotion.");
        }

        const store = await getStore(
          Store,
          promotion.storeId,
          context.merchant.id
        );
        if (!store) {
          throw new Error("Unauthorized operation.");
        }

        try {
          const product = await Promotion.destroy({
            where: {
              id: promotionId,
              storeId: store.id,
            },
          });
        } catch (error) {
          console.log(error);
          logger.log({
            level: "error",
            message: `delete promotion coupon for ${
              context.merchant.id
            } failed ${new Date().toLocaleTimeString()}`,
          });
          return "failed";
        }
        return "success";
      },
    },

    RootSubscription: {
      messageAdded: {
        subscribe: withFilter(
          () => pubsub.asyncIterator(["messageAdded"]),
          async (payload, variables) => {
            return payload.messageAdded.message.chatId === variables.chatId;
          }
        ),
      },
      chatAdded: {
        // subscribe: () => pubsub.asyncIterator(["chatAdded"]),
        subscribe: withFilter(
          () => pubsub.asyncIterator(["chatAdded"]),
          async (payload, variables) => {
            // console.log("variables", variables);
            // console.log("subscribed merchant", variables.merchantId);
            // console.log("The payload for", payload.chatAdded.merchantId);
            return payload.chatAdded.merchantId === variables.merchantId;
          }
        ),
      },
    },
  };

  return resolvers;
}
module.exports = resolvers;
