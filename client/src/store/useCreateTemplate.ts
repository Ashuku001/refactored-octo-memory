import { create } from "zustand";
import { FilePrevObj } from "@/components/appwrite/newFileUpload";
import { produce } from "immer";
import { newStringInput, newStringVar } from "@/lib/createTemplateUtils";
import toast from "react-hot-toast";

type CategoryType = "MARKETING" | "UTILITY" | "AUTHENTICATION" | "" | string;
export type MediaType =
  | "DOCUMENT"
  | "VIDEO"
  | "IMAGE"
  | "LOCATION"
  | ""
  | string;
export type LanguageType = { title: string; value: string };
export type HeaderType = "MEDIA" | "TEXT" | "NONE";
// ##########################HERE IS THE WORK ##################################
export type ComponentType = "HEADER" | "BODY" | "FOOTER" | "BUTTONS";
export type HeaderFormat = "TEXT" | "LOCATION" | "IMAGE" | "DOCUMENT" | string;

export interface HeaderObj {
  type: "HEADER";
  format: HeaderFormat;
  text?: string;
  example?: {
    header_text?: string[] | [];
    header_handle?: string;
  };
}
export interface BodyObj {
  type: "BODY";
  text: string;
  example?: {
    body_text: string[];
  };
}

export interface FooterObj {
  type: "FOOTER";
  text: string;
}

// ############## Button typings ###########

export interface ButtonBoard {
  columns: Map<TypedBtnColumn, BtnColomn>;
}

export type TypedBtnColumn = "callToAction" | "quickReply"; // an enum of all the keys

export interface BtnColomn {
  id: TypedBtnColumn;
  buttons:
    | (
        | QuickReplyType
        | PhoneNumberType
        | UrlType
        | CopyCodeType
        | OptOutType
        | WhatsAppType
      )[]
    | [];
}

export type TypedBtn =
  | "QUICK_REPLY"
  | "PHONE_NUMBER"
  | "URL"
  | "COPY_CODE"
  | "OPT_OUT"
  | "WHATSAPP";
interface ButtonBase {
  type: TypedBtn;
  text: string;
}

export interface OptOutType extends ButtonBase {}

export interface WhatsAppType extends ButtonBase {}

export interface QuickReplyType extends ButtonBase {}

export interface PhoneNumberType extends ButtonBase {
  phone_number: string;
}

export interface UrlType extends ButtonBase {
  url: string;
}

export interface CopyCodeType extends ButtonBase {
  code: string;
}

export type ComponentObject = HeaderObj | BodyObj | FooterObj;

// #########
export type UpdateCompParms = { to: ComponentType; value: string };
export type RemoveCompParams = { to: ComponentType; format?: HeaderFormat };
export type UpdateVarParams = {
  to: "BODY" | "HEADER" | "BUTTON";
  index: number;
  value: string;
};

// ######################### ##########################################
interface StateProps {
  category: CategoryType;
  name: string;
  language?: LanguageType;
  next: boolean;
  file: FilePrevObj | undefined;

  headerType: HeaderType;
  headerText: string;
  mediaType: MediaType;
  bodyText: string;
  footerText: string;

  components: (HeaderObj | BodyObj | FooterObj)[] | [];
  buttonBoard: ButtonBoard;
}

interface SettersProps {
  setCategory: (category: CategoryType) => void;
  setName: (name: string) => void;
  setLanguage: (language: LanguageType) => void;
  setNext: (next: boolean) => void;

  setHeaderType: (value: HeaderType) => void;
  setHeaderText: (value: string) => void;
  setMediaType: (value: MediaType) => void;
  setFile: (file: FilePrevObj) => void;
  removeFile: () => void;

  setBodyText: (value: string) => void;
  setFooterText: (value: string) => void;

  addComponent: (component: ComponentObject) => void;
  updateComponent: ({ to, value }: UpdateCompParms) => void;
  removeComponent: (to: ComponentType) => void;
  addVariable: ({ to }: { to: "BODY" | "HEADER" }) => void;
  updateVariable: ({ to, index, value }: UpdateVarParams) => void;
  addButton: ({
    value,
    columnId,
  }: {
    value: TypedBtn;
    columnId: TypedBtnColumn;
  }) => void;
  updateButton: ({
    columnId,
    index,
    type,
    field,
    value,
  }: {
    columnId: TypedBtnColumn;
    index: number;
    type: TypedBtn;
    field?: "TEXT" | "URL" | "PHONE_NUMBER" | "CODE" | "URL_TYPE";
    value: string;
  }) => void;
  deleteBtn: ({
    columnId,
    index
  }: {
    columnId: TypedBtnColumn;
    index: number;
  }) => void;
  setButtonBoardState: (buttonBoard: ButtonBoard) => void;
}

export const buttonOptions = {
  quickReply: [
    {
      id: "optOut",
      title: "Marketing opt-out",
      desc: "Recommended",
      value: "OPT_OUT",
      columnId: "quickReply",
      max: 1,
    },
    {
      id: "quickReply",
      title: "Custom",
      desc: "",
      value: "QUICK_REPLY",
      columnId: "quickReply",
      max: 10,
    },
  ],
  callToAction: [
    {
      id: "url",
      title: "Visit website",
      desc: "2 buttons maximum",
      value: "URL",
      columnId: "callToAction",
      max: 2,
    },
    {
      id: "phoneNumber",
      title: "Call phone number",
      desc: "1 buttons maximum",
      value: "PHONE_NUMBER",
      columnId: "callToAction",
      max: 1,
    },
    {
      id: "whatsapp",
      title: "Call on WhatsApp",
      desc: "1 buttons maximum",
      value: "WHATSAPP",
      columnId: "callToAction",
      max: 1,
    },
    {
      id: "code",
      title: "Copy offer code",
      desc: "1 buttons maximum",
      value: "COPY_CODE",
      columnId: "callToAction",
      max: 1,
    },
  ],
};

const countMatch = (rgx: any, str: string) => {
  return ((str || "").match(rgx) || []).length;
};

export const useCreateTemplateStore = create<StateProps & SettersProps>(
  (set) => ({
    category: "",
    name: "",
    language: undefined,
    next: false,
    headerType: "NONE",
    headerText: "",
    mediaType: "",
    bodyText: "",
    footerText: "",
    file: undefined,

    // @ts-ignore
    components: [
      {
        type: "BODY",
        text: "",
      },
    ],
    buttonBoard: {
      columns: new Map<TypedBtnColumn, BtnColomn>(),
    },

    setCategory: (category: CategoryType) => {
      set({ category });
    },
    setName: (name: string) => {
      set({ name });
    },
    setLanguage: (language: LanguageType) => {
      set({ language });
    },
    setNext: (next: boolean) => {
      set({ next });
    },
    setHeaderType: (value: HeaderType) => {
      set({ headerType: value });
    },
    setHeaderText: (value: string) => {
      set({ headerText: value });
    },
    setMediaType: (value: MediaType) => {
      set({ mediaType: value });
    },
    setFile: (file: FilePrevObj) => {
      set({ file });
    },
    removeFile: () => {
      set({ file: undefined });
    },
    setBodyText: (value: string) => {
      set({ bodyText: value });
    },
    setFooterText: (value: string) => {
      set({ footerText: value });
    },

    addComponent: (component: ComponentObject) => {
      set(
        produce((draft) => {
          const index = draft.components.findIndex(
            (c: ComponentObject) => c.type === component.type
          );
          if (index < 0) {
            draft.components.push(component);
          } else {
            draft.components?.splice(index, 1);
            draft.components.push(component);
          }
        })
      );
    },
    updateComponent: ({ to, value }: UpdateCompParms) => {
      set(
        produce((draft) => {
          const index = draft.components.findIndex(
            (c: ComponentObject) => c.type === to
          );
          let component = draft.components[index];
          if (component?.type === "HEADER") {
            const format = component.format;
            if (format === "TEXT") {
              component.text = value;

              const count = countMatch(/\{\{\d\}\}/g, component.text) as number;
              let length = component?.example?.header_text?.length;
              if (length && (length as number) > count) {
                component.example.header_text.pop();
                if (component.example.header_text.length === 0) {
                  const { example, ...rest } = component;
                  draft.components.splice(index, 1, rest);
                }
              }

              if (length) {
                component.example.header_text?.forEach(
                  (e: string, i: number) => {
                    const rgx = new RegExp(`\\{\\{${i + 1}\\}\\}`);
                    const temp = newStringInput({
                      rgx: rgx,
                      ref: component.text,
                      toTransForm: value,
                      newVal: e,
                      end: e?.length ?? 0,
                    });
                    draft.headerText = temp;
                  }
                );
              } else {
                draft.headerText = value;
              }
            }
          } else if (component?.type === "BODY") {
            draft.bodyText = value;
            component.text = value;
            const count = countMatch(/\{\{\d\}\}/g, component.text) as number;
            let length = component?.example?.body_text?.length;
            if (length && (length as number) > count) {
              component.example.body_text.pop();
              if (component.example.body_text.length === 0) {
                const { example, ...rest } = component;
                draft.components.splice(index, 1, rest);
              }
            }

            if (length) {
              let temp = value;
              component.example.body_text?.forEach((e: string, i: number) => {
                console.log("the indeX", i);
                if (e?.length) {
                  const rgx = new RegExp(`\\{\\{${i + 1}\\}\\}`);
                  temp = newStringInput({
                    rgx: rgx,
                    ref: component.text,
                    toTransForm: temp,
                    newVal: e,
                    end: e?.length ?? 0,
                  });
                }
              });
              draft.bodyText = temp;
            } else {
              draft.bodyText = value;
            }
          } else if (component?.type === "FOOTER") {
            draft.footerText = value;
            component.text = value;
          }
        })
      );
    },
    removeComponent: (to: ComponentType) => {
      set(
        produce((draft) => {
          const index = draft.components.findIndex(
            (c: ComponentObject) => c.type === to
          );
          if (index >= 0) {
            draft.components.splice(index, 1);
          }
        })
      );
    },
    addVariable: ({ to }: { to: "BODY" | "HEADER" }) => {
      set(
        produce((draft) => {
          if (to === "BODY") {
            let index = draft.components.findIndex(
              (c: ComponentObject) => c.type === to
            );
            if (index > -1) {
              let body = draft.components[index];
              let length = body?.example?.body_text?.length;
              if (!length) {
                body = {
                  ...body,
                  text: body.text.concat(`{{1}}`),
                  example: {
                    body_text: [""],
                  },
                };
              } else {
                length = length + 1;
                body = {
                  ...body,
                  text: body.text.concat(`${"{{" + length + "}}"}`),
                  example: {
                    body_text: [...body.example.body_text, ""],
                  },
                };
              }
              draft.bodyText = body.text;
              draft.components.splice(index, 1, body);
            }
          } else if (to === "HEADER") {
            const index = draft.components.findIndex(
              (c: ComponentObject) => c.type === to && c.format === "TEXT"
            );
            if (index > -1) {
              let header = draft.components[index];
              const length = header?.example?.header_text?.length;
              if (!length || length < 1) {
                header = {
                  ...header,
                  text: header.text.concat("{{1}}"),
                  example: {
                    header_text: [""],
                  },
                };
                draft.headerText = header.text;
              }
              draft.components.splice(index, 1, header);
            }
          }
        })
      );
    },
    updateVariable: ({ to, index, value }: UpdateVarParams) => {
      set(
        produce((draft) => {
          const component = draft.components.find(
            (c: ComponentObject) => c.type === to
          );

          if (to === "HEADER") {
            const rgx = new RegExp(`\\{\\{${index + 1}\\}\\}`, "g");
            draft.headerText = newStringVar({
              rgx: rgx,
              ref: component.text,
              toTransForm: draft.headerText,
              newVal: value,
              end: component.example.header_text[index].length,
            });
            component.example.header_text.splice(index, 1, value);
          } else if (to === "BODY") {
            const rgx = new RegExp(`\\{\\{${index + 1}\\}\\}`, "g");
            draft.bodyText = newStringVar({
              rgx: rgx,
              ref: component.text,
              toTransForm: draft.bodyText,
              newVal: value,
              end: component.example.body_text[index].length,
            });
            component.example.body_text.splice(index, 1, value);
          }
        })
      );
    },
    addButton: ({
      value,
      columnId,
    }: {
      value: TypedBtn;
      columnId: TypedBtnColumn;
    }) => {
      set(
        // @ts-ignore
        (draft) => {
          const newColumns = new Map(draft.buttonBoard.columns);
          let newBtn:
            | QuickReplyType
            | PhoneNumberType
            | UrlType
            | CopyCodeType
            | OptOutType
            | WhatsAppType = {
            type: value,
            text: "",
          };
          if (value === "QUICK_REPLY") {
            newBtn = { ...newBtn };
          } else if (value === "URL") {
            newBtn = { ...newBtn, url: "" };
          } else if (value === "PHONE_NUMBER") {
            newBtn = { ...newBtn, phone_number: "" };
          } else if (value === "WHATSAPP") {
            newBtn = { ...newBtn };
          } else if (value === "COPY_CODE") {
            newBtn = { ...newBtn, code: "" };
          } else if (value === "OPT_OUT") {
            newBtn = { ...newBtn, text: "Stop promotions" };
          }

          const column: BtnColomn = newColumns.get(columnId) as BtnColomn;

          if (!column) {
            newColumns.set(columnId, {
              id: columnId,
              buttons: [newBtn],
            });
          } else {
            // @ts-ignore
            newColumns.get(columnId)?.buttons!.push(newBtn);
          }

          return { buttonBoard: { columns: newColumns } };
        }
      );
    },
    updateButton: ({
      columnId,
      index,
      type,
      field,
      value,
    }: {
      columnId: TypedBtnColumn;
      index: number;
      type: TypedBtn;
      field?: "TEXT" | "URL" | "PHONE_NUMBER" | "CODE" | "URL_TYPE";
      value: string;
    }) => {
      set(
        // produce(
        // @ts-ignore
        (draft) => {
          const newColumns = new Map(draft.buttonBoard.columns);
          const column: BtnColomn = newColumns.get(columnId) as BtnColomn;
          if (column) {
            if (type === "QUICK_REPLY") {
              const button = column.buttons[index] as QuickReplyType;
              field === "TEXT" ? (button.text = value) : "";
            } else if (type === "URL") {
              const button = column.buttons[index] as UrlType;
              field === "URL"
                ? (button.url = value)
                : field === "TEXT"
                ? (button.text = value)
                : field === "URL_TYPE"
                ? (button.text = value)
                : "";
            } else if (type === "PHONE_NUMBER") {
              const button = column.buttons[index] as PhoneNumberType;
              field === "PHONE_NUMBER"
                ? (button.phone_number = value)
                : field === "TEXT"
                ? (button.text = value)
                : "";
            } else if (type === "WHATSAPP") {
              const button = column.buttons[index] as WhatsAppType;
              field === "TEXT" ? (button.text = value) : "";
            } else if (type === "COPY_CODE") {
              const button = column.buttons[index] as CopyCodeType;
              field === "CODE"
                ? (button.code = value)
                : field === "TEXT"
                ? (button.text = value)
                : "";
            } else if (type === "OPT_OUT") {
            }
          } else {
            toast.error("Something went wrong unable to update button value");
          }
          return { buttonBoard: { columns: newColumns } };
        }
      );
      // )
    },
    deleteBtn: ({
      columnId,
      index,
    }: {
      columnId: TypedBtnColumn;
      index: number;
    }) => {
      set(
        // @ts-ignore
        (draft) => {
          const newColumns = new Map(draft.buttonBoard.columns);
          const column: BtnColomn = newColumns.get(columnId) as BtnColomn;
          if (column) {
            column.buttons.splice(index, 1)
          } else {
            toast.error("Something went wrong unable to update button value");
          }
          return { buttonBoard: { columns: newColumns } };
        }
      );
    },
    setButtonBoardState: (buttonBoard: ButtonBoard) =>
      set({ buttonBoard: buttonBoard }),
  })
);
