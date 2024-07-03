import {
  PrevContent,
  PreviewObj,
  ParamObj,
  RemoteTemplateObj,
  InputElement,
} from "@/types";
interface tempData {}

const checkComponent = (component, type) => {
  return component.type === "header";
};

const textParam = {
  type: "text",
  text: {
    preview_url: true,
    body: "",
  },
};

export const componentIndex = (tempData, type) => {
  return tempData.template.components.findIndex(
    (component) => component.type === type
  );
};

export const templatePreviewObj = (template: RemoteTemplateObj) => { 
  let previewUI: PreviewObj = {};  // for preview of the message user is creating
  let tempVariables: any = {
    type: "TEMPLATE",
    template: {
      body: '',
      action: 'BUTTON_REPLY',
    }
  }  // for the mutation query to save in the database
  let tempData = {                    // for whatsapp api
    messaging_product: "whatsapp",
    type: "template",
    template: {
      name: template.name,
      language: {
        code: template.language,
      },
      components: [],
    },
  };

  const components = template.components;
  components.forEach((component) => {

    if (component.type === "HEADER") {
      let tempVarHeader: any
      let content: PrevContent = {};
      if (component.example) {
        tempData.template.components.push({
          type: "header",
          parameters: [],
        });

        let inputs: InputElement[] = [];

        if (component.format === "TEXT") {
          const parameter = {
            type: 'text',
            text: ''
          };

          const index = tempData.template.components.findIndex((component) => component.type === "header");
          tempData.template.components[index].parameters.push(parameter);

          tempVariables.template['header'] === "TEXT",
          tempVariables.template['tempTextHead'] = {
            body: ""
          }
        }
        else if (component.format === "IMAGE") {
          const parameter = {
            type: "image",
            image: {
              link: "",
            },
          };

          const index = componentIndex(tempData, "header");
          tempData.template.components[index].parameters.push(parameter);

          tempVariables.template['header'] = "IMAGE",
          tempVariables.template['tempImageHead'] = {
            link: ""
          }

        } else if(component.format === 'DOCUMENT') {
          const parameter = {
            type: "document",
            document: {
              link: "",
              filename: "",
            },
          };

          const index = componentIndex(tempData, "header");
          tempData.template.components[index].parameters.push(parameter);

          tempVariables.template['header'] = "DOCUMENT",
          tempVariables.template['tempDocumentHead'] = {
            link: "",
            filename: "",
            mimeType: "",
          }

        } else if(component.format === 'VIDEO') {

          const parameter = {
            type: "video",
            video: {
              link: "",
            },
          };
          const index = componentIndex(tempData, "header");
          tempData.template.components[index].parameters.push(parameter);

          tempVariables.template['header'] = "VIDEO",
          tempVariables.template['tempVideoHead'] = {
            link: ""
          }
        }

        // only one input on the message header is expected
        inputs.push({
          type: component.format === "TEXT" ? "text" : "file",
          id: `var1`,
          name: "var1",
          placeholder: `${component.example.header_text}`,
        });

        const { example, ...rest1 } = component;
        const { type, ...rest2 } = rest1;
        const { format, ...rest3 } = rest2;

        content.dynamic = {
          inputs: inputs,
          type: component.format === "TEXT" ? "text" : "file",
          format: component.format,
          content: rest3,
        };

        console.log(content)

      } else {
        const { type, ...rest } = component;
        content.static = {
          type: component.format === "TEXT" ? "paragraph" : "notParagraph",
          content: rest,
        };

        if(component.format === 'TEXT'){
          tempVariables.template['header'] = "TEXT",
            tempVariables.template['tempTextHead'] = {
              body: ""
          }
        }
      }
      previewUI.HEADER = content;
    }

    if (component.type === "BODY") {
      let content: PrevContent = {};
      if (component?.example) {
        tempData.template.components.push({
          type: "body",
          parameters: [],
        });

        let inputs: InputElement[] = [];

        if (component.example.body_text[0].length !== 0) {
          for (let i = 0; i < component.example.body_text[0].length; i++) {
            inputs.push({
              type: "text",
              id: `var${i}`,
              name: `var${i}`,
              label: `var ${i}`,
              placeholder: `${component.example.body_text[0][i]}`,
            });
            const index = componentIndex(tempData, "body");
            const parameter: ParamObj = {
                type: "text",
                text: "",
              };
            tempData.template.components[index].parameters.push(parameter);
          }
        }
        const { example, ...rest } = component;
        content.dynamic = { inputs: inputs, content: rest };

        tempVariables.template['body'] = ""

      } else {
        const { type, ...rest } = component;
        content.static = {
          type: component.text !== undefined ? "paragraph" : "notParagraph",
          content: rest,
        };
      }
      tempVariables.template['body'] = ""
      previewUI.BODY = content;
    }

    if (component.type === "FOOTER") {

      let content: PrevContent = {};
      content.static = { type: "paragraph", content: component };
      previewUI.FOOTER = content;

      tempVariables.template['footer'] = component.text
    }

    if (component.type === "BUTTONS") {
      console.log('BUTTON COMPONENT', component)
      let content: PrevContent = {};
      let staticBtns = [];
      let dynamicBtns = [];
      let tempVarBtns = []

      for (let i = 0; i < component?.buttons?.length; i++) {
        if ("example" in component?.buttons[i]) {
          tempData.template.components.push({
            type: "button",
            parameters: [],
          });
          break;
        }
      }

      component?.buttons?.forEach((button, i) => {
        if ("example" in button) {

          dynamicBtns.push({
            btnType: button.type,
            inputType: "text",
            placeholder: button.example[0],
            name: `button${i}`,
            id: `button${i}`,
            label: `button ${i + 1}`,
            text: button.text,
          });

          const index = componentIndex(tempData, "button");
          const btnParam = {
            type:
              button.type === "COPY_CODE"
                ? "COUPON_CODE"
                : button.type === "URL"
                ? "TEXT"
                : button.type,
            text: "",
          };
          tempData.template.components[index].parameters.push(btnParam);

          tempVarBtns.push({id: `button${i}`, text: ""})
        } else {
          staticBtns.push(button);
          tempVarBtns.push({text: button.text})
        }

      });
      tempVariables.template['buttons'] = tempVarBtns

      content.static = staticBtns;
      content.dynamic = { inputs: dynamicBtns };
      previewUI.BUTTONS = content;
    }
  });

  // console.log("THE PREVIEW UI>>>>>>>>>>>>", previewUI, tempData, tempVariables);
  return { previewUI, tempData, tempVariables };
};
