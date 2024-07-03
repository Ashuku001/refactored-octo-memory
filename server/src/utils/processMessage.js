
const { interactiveList, interactiveReplyButton } = require("./interactiveMessages.js"); // the List  and the button yes and no
// const  products  = require("../models/products.js"); // the products = requireour mock db
const { createProductsList, updateWhatsAppMessage, sendWhatsAppMessage } = require("../utils/messageHelper.js")

// should be from the database
const products = [
  { id: 1, name: 'assorted berries', thumbnail: '2010/12/13/10/05/berries-2277__340.jpg', price: 2.99 },
  { id: 2, name: 'tomato', thumbnail: '2014/04/10/11/06/tomatoes-320860__340.jpg', price: 1.99 },
  { id: 3, name: 'oranges', thumbnail: '2017/01/20/15/06/oranges-1995056__340.jpg', price: 3.99 },
  { id: 4, name: 'cherries', thumbnail: '2016/06/18/22/36/cherries-1465801__340.jpg', price: 2.99 },
  { id: 5, name: 'pistacchio', thumbnail: '2018/03/13/20/08/pistachios-3223610__340.jpg', price: 5.99 },
  { id: 6, name: 'carrots', thumbnail: '2017/06/09/16/39/carrots-2387394__340.jpg', price: 2.99 },
  { id: 7, name: 'onions', thumbnail: '2016/05/16/22/47/onions-1397037__340.jpg', price: 1.99 },
  { id: 8, name: 'potatoes', thumbnail: '2014/08/06/20/32/potatoes-411975__340.jpg', price: 1.99 },
  { id: 9, name: 'broccoli', thumbnail: '2015/03/14/13/59/vegetables-673181__340.jpg', price: 3.99 },
  { id: 10, name: 'coffee', thumbnail: '2016/08/07/16/23/coffee-1576537__340.jpg', price: 3.99 },
  { id: 11, name: 'salmon', thumbnail: '2016/03/05/19/02/salmon-1238248__340.jpg', price: 5.99 },
  { id: 12, name: 'sausages', thumbnail: '2018/07/08/20/18/sausages-3524649__340.jpg', price: 3.99 },
  { id: 13, name: 'chicken wings', thumbnail: '2016/07/31/17/51/chicken-1559548__340.jpg', price: 5.99 },
  { id: 14, name: 'brie', thumbnail: '2015/02/10/02/42/cheese-630511__340.jpg', price: 7.99 },
  { id: 15, name: 'rice', thumbnail: '2019/02/15/03/28/rice-3997767__340.jpg', price: 4.99 },
  { id: 16, name: 'blonde ale beer', thumbnail: '2017/01/21/21/15/beer-1998293__340.jpg', price: 3.99 }]; // should be from the database


// pass in the message that has beeb sebt frin the user
async function processMessage(message, appSettings) {
  
  const customerPhoneNumber = message.from; // from who
  const messageType = message.type; // text message or wha
  // a message of type text is sent by user
  if (messageType === "text") {
    const textMessage = message.text.body; // retrive the message
    try {
      let replyButtonMessage = interactiveReplyButton; // the reply btn object
      replyButtonMessage.to = appSettings.RECIPIENT_PHONE_NUMBER; // the key to in the replyBtn object give the number to send to
      // const replyButtonSent = await sendWhatsAppMessage(replyButtonMessage, appSettings); // send the message to that number
      // console.log("THE REPLY BUTTONS SENT", replyButtonSent);
    } catch (error) {
      console.log("ERROR SENDING THE REPLY buttons", error);
    }

    // user replies with the interactive buttons
  } else if (messageType === "interactive") {
    const interactiveType = message.interactive.type;


    if (interactiveType === "button_reply") {
      const buttonId = message.interactive.button_reply.id; // get the button id if yes or no
      const buttonTitle = message.interactive.button_reply.title; // the buttons title
      console.log('BUTTON ID###############', buttonId)

      // if yes
      if (buttonId == 1) {
        try {
          // console.log("PRODUCTS", products)
          let productsList = interactiveList; // the interactive list object
          // console.log('PRODUCT LIST', productsList)
          productsList.to = appSettings.RECIPIENT_PHONE_NUMBER; // the phone number to send to
          productsList.interactive.action.sections[0].rows =
            products.map(createProductsList);

          // List messages have a 10 item limit total
          productsList.interactive.action.sections[0].rows.length = 10;
          // console.log("PRODUCT LIST TO SEND#################", productsList)
   
          // const sendProductLists = await sendWhatsAppMessage(productsList, appSettings)
          //                   .then((res) => {return res})
          //                   .then((error) => {
          //                     console.log("An error sending the product list")
          //                     // throw new Error(error)
          //                   });
          // console.log('SENT THE List', sendProductLists)
   
        } catch (error) {
          console.log("ERROR SENGING THE LIST################", error.message);
        }
      }
    }
    // user has clicked the items in the list just sent
    else if (interactiveType === "list_reply") {
      const itemId = message.interactive.list_reply.id; // the items id
      const itemTitle = message.interactive.list_reply.title; // title
      const itemDescrption = message.interactive.list_reply.description; // description
    }
  }
}

module.exports = processMessage