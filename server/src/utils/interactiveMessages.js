// This list will be cross selling from analysis of other customers buring and the past customers purchase
const list = {
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "PHONE_NUMBER",
  "type": "interactive",
  "interactive": {
    "type": "list",
    "header": {
      "type": "text",
      "text": "Add an Item to Existing Pending Order"
    },
    "body": {
      "text": "View our list of produce to add to your existing order. Hurry before your order is out for delivery!"
    },
    "footer": {
      "text": "Markt online groceries"
    },

    // actions a list of products one can add to the cart
    "action": {
      "button": "Products List", 
      "sections": [
        {
          "title": "Fresh Produce", // make this part dynamic first list
          "rows": [ // first list at postion zero
            {
              "id": "SECTION_1_ROW_1_ID",
              "title": "SECTION_1_ROW_1_TITLE",
              "description": "SECTION_1_ROW_1_DESCRIPTION"
            },
            {
              "id": "SECTION_1_ROW_2_ID",
              "title": "SECTION_1_ROW_2_TITLE",
              "description": "SECTION_1_ROW_2_DESCRIPTION"
            }
          ]
        },
        {
          "title": "Fresh Produce Cont",  // list of products of specific category
          "rows":[] // second list
        }
      ]
    }
  }
}

// buttons added to the interactive messages
const interactiveReplyButton = {
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "PHONE_NUMBER",
  "type": "interactive",
  "interactive": {
    "type": "button",
    "body": {
      "text": "Do you want to add an item to your order?"
    },
    "action": {
      "buttons": [
        {
          "type": "reply",
          "reply": {
            "id": "0",
            "title": "No"
          }
        },
        {
          "type": "reply",
          "reply": {
            "id": "1",
            "title": "Yes"
          }
        }
      ]
    }
  }
}

if (exports){ 
    exports.interactiveList = list,
    exports.interactiveReplyButton = interactiveReplyButton
}