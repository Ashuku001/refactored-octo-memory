

const express = require('express');
const router = express.Router();
require('dotenv').config()
const bodyParser = require('body-parser');
const  messageTemplates  = require("../utils/messageTemplates.js")
const { createMessageTemplate } =require("../utils/messageHelper.js");
const { listTemplates } = require("../utils/messageHelper.js");

// console.log("###########", bodyParser.json())
 
router.use(bodyParser.json());

router.post('/', async function (req, res, next) {

  try {
      // list of all the templates in my business account =whatsapp business account
      const templatesResponse = await listTemplates()
      console.log('##############I AM HERE IN CREATING TEMPLATES3<<<<<<<<<<<<<<#############', templatesResponse)
      templatesResponse.data.data.map((t) => console.log(t))
      
      
      // filter the templates that have been approved
      const remoteApprovedTemplates = templatesResponse.data.data.filter(t => t.status === 'APPROVED');
      console.log("$%$%$%$%",remoteApprovedTemplates)
      

      // the templates we have already configured  
      const localTemplates = messageTemplates.messageTemplates
      console.log("LOCLA TEMPLATES", localTemplates)

      ////// for all the local templates we look fot the templates that we are going to use and have been approved by whatsapp

      console.log("#3333333#############################33", localTemplates.length)
      for (let index = 0; index < localTemplates.length; index++) {
        const localTemplate = localTemplates[index]; // index of the templates

        console.log("In here*(*(*(*(*(*")
        // filter the templates from the whatsapp business account whose name === to the 
        // of the local templates that we have
        const queryResult = remoteApprovedTemplates
        .filter(t => t.name == process.env.TEMPLATE_NAME_PREFIX
          + '_' + localTemplate.name)

        // filter out the remote template that we have configured locally i.e
        // template has been approved and we have it locally we want to use
        // template that already exists no need of sending a request to whatsapp to create it
        // const queryResult = remoteApprovedTemplates
        // .filter(t => t.name == localTemplate.name)

        // template to be created
        console.log(`Creating template: ${localTemplate.name}.`) // log the templates we are creating

        // the templates that we have been approved so no need of sending a request to create them
        if (queryResult.length > 0) {
          console.log(`Template ${queryResult[0].name} already exists.`)
          continue; // skip to the next template
        }

        // otherwise the template is not approved or does not exist from the remote templates from whatsapp we got through listTemplates()
        try {
          // send a request to whatsapp to create the template
          await createMessageTemplate(localTemplate);
          console.log(`Template ${localTemplate.name} created successfully.`)
        } catch (error) {
          console.log(`Failed creating template ${localTemplate.name}.`)
          console.log("###########",error.response.data);
        }

      }
    } catch (error) {
      console.log("Failed obtaining remote template list.")
      console.log("##########",error);
    }

    console.log("Redirecting to the backoffice.")
    // res.redirect('/backoffice');
});

module.exports = router;