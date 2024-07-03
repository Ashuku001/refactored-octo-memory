const cron = require("node-cron");
const { gql } = require("graphql-request");
const graphQLClient = require("./graphqlClient/graphqlClient");

const AddCampaign = gql`
  mutation AddTemplateCampaign(
    $selectedCustomers: String!
    $template: String
    $message: InteractiveMessageInput!
  ) {
    addTemplateMesBulk(
      template: $template
      selectedCustomers: $selectedCustomers
      message: $message
    ) {
      id
      __typename
    }
  }
`;

const GetJobs = gql`
  query templateSchedules {
    templateSchedules {
      id
      type
      timestamp
      bulkTempTask {
        customers
        template
        message
      }
    }
  }
`;
const getSchedules = async () => {
  let results;
  try {
    results = await graphQLClient.request(GetJobs);
    console.log(results)
  } catch (error) {
    console.log("there was an error saving to the database", error);
  }

  if (results) {
    console.log(results);
  }
};

cron.schedule("* * * * *", () => {
  getSchedules();
});

console.log("Job Getting schedules started");
