require("dotenv").config();
const JWT = require("jsonwebtoken");
const cron = require("node-cron");
const { gql } = require("graphql-request");

const graphQLClient = require("../graphqlClient/graphqlClient");
const JWT_SECRET = process.env.JWT_SECRET;

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

const UpdateJob = gql`
  mutation updateBulkTemplateTask($taskId: Int!, $merchantId: Int!) {
    updateBulkTemplateTask(taskId: $taskId, merchantId: $merchantId) {
      success
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
      merchantsTasks {
        id
        username
      }
    }
  }
`;
const getSchedules = async () => {
  let tasks;
  let merchant;

  try {
    const data = await graphQLClient.request(GetJobs);
    console.log("DATA", data);
    tasks = data.templateSchedules;
  } catch (error) {
    console.log("there was an error saving to the database", error);
  }

  if (tasks) {
    console.log(">>>>>>>>>>>>.", tasks);

    try {
      tasks.forEach(async (task) => {
        const temp = task.bulkTempTask;
        console.log(task, temp);
        const selectedCustomers = temp.customers;
        const message = JSON.parse(temp.message);
        const template = temp.template;
        const username = task.merchantsTasks.username;
        const merchantId = task.merchantsTasks.id;
        console.log(selectedCustomers, message, template);
        const token = JWT.sign({ username, id: merchantId }, JWT_SECRET, {
          expiresIn: "1d",
        });
        const requestHeaders = {
          authorization: `Bearer ${token}`,
        };

        await graphQLClient.request(
          AddCampaign,
          { selectedCustomers, message, template },
          requestHeaders
        );
        await graphQLClient.request(
          UpdateJob,
          { taskId:  task.id, merchantId: merchantId},
          requestHeaders
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
};

// getSchedules()

cron.schedule("* * * * *", () => {
  getSchedules();
});

console.log("Job Getting schedules started");
