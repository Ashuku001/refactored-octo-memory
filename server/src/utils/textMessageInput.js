function getTextMessageInput(recipient, text) {
  return {
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: recipient,
    type: "text",
    text: {
      body: text,
    },
  };
}

if (exports) {
    exports.getTextMessageInput = getTextMessageInput
}