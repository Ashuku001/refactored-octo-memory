const graphQLClient = require("../graphqlClient/graphqlClient.js");
const { gql } = require("graphql-request");

const saveTextMessageQuery = gql`
  mutation AddTextMessage(
    $message: TextMessageInput!
    $participants: ParticipantsInput
    $contextMessage: ContextMessageInput
  ) {
    addTextMessage(
      message: $message
      participants: $participants
      contextMessage: $contextMessage
    ) {
      id
    }
  }
`;

const saveImageMessageQuery = gql`
  mutation AddImageMessage(
    $message: ImageMessageInput!
    $participants: ParticipantsInput
    $contextMessage: ContextMessageInput
  ) {
    addImageMessage(
      message: $message
      participants: $participants
      contextMessage: $contextMessage
    ) {
      id
    }
  }
`;

const saveDocumentMessageQuery = gql`
  mutation AddDocumentMessage(
    $message: DocumentMessageInput!
    $participants: ParticipantsInput
    $contextMessage: ContextMessageInput
  ) {
    addDocumentMessage(
      message: $message
      participants: $participants
      contextMessage: $contextMessage
    ) {
      __typename
      id
    }
  }
`;

const saveVideoMessageQuery = gql`
  mutation AddVideoMessage(
    $message: VideoMessageInput!
    $participants: ParticipantsInput
    $contextMessage: ContextMessageInput
  ) {
    addVideoMessage(
      message: $message
      participants: $participants
      contextMessage: $contextMessage
    ) {
      id
    }
  }
`;

const saveReplyToButtonMessageQuery = gql`
    mutation AddButtonRepliedMessage($message: ButtonRepliedInput!, $participants: ParticipantsInput, $contextMessage: ContextMessageInput) {
    addButtonRepliedMessage(message: $message, participants: $participants, contextMessage: $contextMessage) {
        id 
    }
  }
`;
const saveReplyToTemplateMessageQuery = gql`
      mutation AddTemplateRepliedMessage($message: TemplateRepliedInput!, $participants: ParticipantsInput, $contextMessage: ContextMessageInput) {
    addTemplateRepliedMessage(message: $message, participants: $participants, contextMessage: $contextMessage) {
         __typename
        id
    }
  }
`;

const saveReplyToListMessageQuery = gql`
     mutation addListRepliedMessage($message: ListRepliedInput!, $participants: ParticipantsInput, $contextMessage: ContextMessageInput) {
    addListRepliedMessage(message: $message, participants: $participants, contextMessage: $contextMessage) {
        id
    }
  }
`;

const updateStatus = gql`
  mutation updateChatStatus(
    $participants: ParticipantsInput!
    $payload: ChatStatus!
  ) {
    updateChatStatus(participants: $participants, payload: $payload) {
      id
    }
  }
`;

async function saveTextMessageToDB(data) {
  const variables = data;
  console.log("saveTextMessageToDB", data);
  try {
    const results = await graphQLClient.request(
      saveTextMessageQuery,
      variables
    );
    return;
  } catch (error) {
    console.log("there was an error saving to the database", error);
  }
}

async function saveImageMessageToDB(data) {
  const variables = data;
  console.log("saveImageMessageToDB", data);
  try {
    const results = await graphQLClient.request(
      saveImageMessageQuery,
      variables
    );
    return;
  } catch (error) {
    console.log("there was an error saving to the database", error);
  }
}

async function saveDocumentMessageToDB(data) {
  const variables = data;
  try {
    const results = await graphQLClient.request(
      saveDocumentMessageQuery,
      variables
    );
    return;
  } catch (error) {
    console.log("there was an error saving to the database", error);
  }
}

async function saveVideoMessageToDB(data) {
  const variables = data;
  try {
    const results = await graphQLClient.request(
      saveVideoMessageQuery,
      variables
    );
    return;
  } catch (error) {
    console.log("there was an error saving to the database", error);
  }
}

async function saveReplyToButtonMessage(data) {
  const variables = data;
  try {
    const results = await graphQLClient.request(
      saveReplyToButtonMessageQuery,
      variables
    );
    return;
  } catch (error) {
    console.log("there was an error saving to the database", error);
  }
}
async function saveReplyToTemplateMessage(data) {
  const variables = data;
  try {
    const results = await graphQLClient.request(
      saveReplyToTemplateMessageQuery,
      variables
    );
    return;
  } catch (error) {
    console.log("there was an error saving to the database", error);
  }
}

async function saveReplyToListMessage(data) {
  const variables = data;
  try {
    const results = await graphQLClient.request(
      saveReplyToListMessageQuery,
      variables
    );
    return;
  } catch (error) {
    console.log("there was an error saving to the database", error);
  }
}

async function updateChatStatus(data) {
  const variables = data;
  try {
    const results = await graphQLClient.request(updateStatus, variables);
    // console.log("RESULTS FROM ADDING TO DB", results);
    return;
  } catch (error) {
    console.log("there was an error saving to the database", error);
  }
}

if (exports) {
  exports.saveTextMessageToDB = saveTextMessageToDB;
  exports.saveImageMessageToDB = saveImageMessageToDB;
  exports.updateChatStatus = updateChatStatus;
  exports.saveDocumentMessageToDB = saveDocumentMessageToDB;
  exports.saveVideoMessageToDB = saveVideoMessageToDB;
  exports.saveReplyToButtonMessage = saveReplyToButtonMessage;
  exports.saveReplyToListMessage = saveReplyToListMessage;
  exports.saveReplyToTemplateMessage = saveReplyToTemplateMessage
}
