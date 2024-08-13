import { Models } from "appwrite";

interface Links {
  [key: string]: string;
}

export type MerchantType = {
  id: int;
  username: string;
  business_name: string;
};

type Template = {
  name: string;
  components?: [[Object], [Object]];
  language: string;
  status: string;
  category: string;
  id: string;
};

type MessageInputType = {
  messaging_product: string;
  preview_url: boolean;
  recipient_type: string;
  to: string;
  type: string;
  text: Text;
};

type LoginFormProps = {
  changeLoginState: Dispatch<SetStateAction<boolean>>;
};

type CustomerType = {
  __typename: "Customer";
  id: number;
  first_name?: string | null | undefined;
  last_name?: string | null | undefined;
  phone_number: string;
} | null;

type CustomerSearchType = {
  __typename?: "Customer";
  id: number;
  first_name?: string | null;
  last_name?: string | null;
  customerSegment?: string | null;
  incomeCategory?: string | null;
  phone_number: string;
  age?: number | null;
  gender?: string | null;
}

type ChatAddedType = {
  __typename?: "Chat" | undefined;
  id?: number | null | undefined;
  customer: {
    __typename: "Customer";
    id: number;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    phone_number: string;
  };
} | null;

type ChatType =
  | {
      __typename?: "Chat" | undefined;
      id?: number | null | undefined;
      customer: {
        __typename: "Customer";
        id?: number | null | undefined;
        first_name?: string | null | undefined;
        last_name?: string | null | undefined;
        phone_number: string;
      };
      lastMessage?:
        | {
            __typename?: "Message" | undefined;
            id?: number | undefined;
            text: string;
            createdAt?: any | null;
          }
        | null
        | undefined;
    }
  | null
  | undefined;

type MessageType = {
  __typename?: "Message" | undefined;
  id?: number | null | undefined;
  from_customer: boolean;
  type?: string | null | undefined;
  timestamp?: any;
  createdAt?: any;
  text?:
    | {
        body: string;
      }
    | null
    | undefined;
} | null;

type SettingType =
  | {
      __typename?: "Setting" | undefined;
      callBack_url: string;
      APP_ID: string;
      APP_SECRET: string;
      PHONE_NUMBER_ID: string;
      BUSINESS_ACCOUNT_ID: string;
      ACCESS_TOKEN: string;
      API_VERSION: string;
      WEBHOOK_VERIFICATION_TOKEN: string;
      RECIPIENT_PHONE_NUMBER?: string | undefined;
    }
  | null
  | undefined;

type RemoteTemplateObj = {
  category: string;
  name: string;
  language: string;
  status: string;
  id: string;
  components: ComponentObj[];
};

interface PreviewObj {
  HEADER?: PrevContent;
  BODY?: PrevContent;
  FOOTER?: PrevContent;
  BUTTONS?: PrevContent;
}

interface PrevContent {
  static?: StaticInput;
  dynamic?: DynamicContent;
  buttons?: StaticButton;
}

interface StaticContent {
  [key: string]: any;
}

interface StaticInput {
  type?: string;
  format?: string;
  content?: StaticContent;
}

interface StaticButton {
  type: string;
  [key: string]: any;
}

interface DynamicContent {
  type?: string;
  format?: string;
  content?: StaticContent;
  inputs?: InputElement[];
}

interface ComponentObj {
  [key: string]: any;
  type: string;
}

interface InputElement {
  type: string;
  placeholder?: string;
  id?: string;
  name?: string;
}

type AddMessageType =
  | {
      __typename: "Message";
      id: number;
      from_customer: boolean;
      text: string;
      timestamp: number;
      createdAt: any;
      chat: {
        __typename: "Chat";
        id: number;
      };
    }
  | null
  | undefined;

type StoreType =
  | {
      __typename?: "Store" | undefined;
      id?: number | null | undefined;
      name?: string | null | undefined;
    }
  | null
  | undefined;

type BillboardType =
  | {
      __typename?: "Billboard" | undefined;
      id?: number | null | undefined;
      label?: string | null | undefined;
      imageUrl?: string | null | undefined;
      store?:
        | {
            __typename?: "Store" | undefined;
            id?: number | undefined;
          }
        | null
        | undefined;
    }
  | null
  | undefined;

type CategoryType = {
  __typename?: "Category" | undefined;
  id: number;
  name: string;
  updatedAt: any;
  billboard: {
    __typename?: "Billboard" | undefined;
    id: number;
    label: string;
  };
} | null;

type ColorType = {
  __typename?: "Color" | undefined;
  id: number;
  name: string;
  value: string;
  updatedAt: any;
  store: {
    __typename?: "Store" | undefined;
    id: number;
  };
} | null;

type SizeType = {
  __typename?: "Size" | undefined;
  id: number;
  name: string;
  value: string;
  store: {
    __typename?: "Store" | undefined;
    id: number;
  };
};

type ProductType = {
  __typename?: "Product" | undefined;
  id: number;
  name: string;
  price: number;
  description?: string;
  brand?: string;
  stockCode?: string;
  isArchived?: boolean | null | undefined;
  isFeatured?: boolean | null | undefined;
  images?: ImageType[];
  updatedAt?: any;
  store: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  size?:
    | {
        id: number;
        name: string;
      }
    | undefined;
  color?:
    | {
        id: number;
        name: string;
        value: string;
      }
    | undefined;
} | null;

type SimilarProductFormatted = {
  id: number;
  name: string;
  price: string;
  category?: string;
  brand?: string;
  description: string;
  score: string;
};

type SimilarProductResponseType = {
  target: {
    brand: string;
    category: string;
    description: string;
    id: string;
    name: string;
    price: float;
  };
  value: {
    productId: string;
    name: string;
    price: string;
    category: string;
    brand: string;
  };
  description: string;
  score: string;
};

type ImageType = {
  id: number;
  url: string;
};

type OrderType = {
  __typename?: "Order" | undefined;
  id: number;
  phone: string;
  isPaid: boolean;
  address: string;
  createdAt?: any;
  orderItems: ({
    __typename?: "OrderItem" | undefined;
    orderProduct: {
      __typename?: "Product" | undefined;
      id: number;
      name: string;
      price: number;
    };
  } | null)[];
} | null;

// Template types
interface ParamObj {
  type: "image" | "text" | "document";
  image?: {
    link: string;
  };
  text?: string;
}

export interface FileObj {
  type: "";
  file: any;
  fileObj: Models.File;
}

// File store appwrite
interface Asset {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "IMAGE" | "DOCUMENT" | "VIDEO";

interface Column {
  id: TypedColumn;
  files: File[];
}

interface File {
  $id: string;
  $createdAt: string;
  name: string;
  type: TypedColumn;
  file: ActualFile;
}

interface ActualFile {
  bucketId: string;
  fileId: string;
}

interface MediaMessageObj {
  messaging_product: string;
  recipient_type: string;
  to: string;
  type: string;
  [key: string]: {
    link: string;
    caption: string;
    filename?: string;
  };
}

//  Message props

type InteractiveButtonProps = {
  button: {
    header: string;
    image: ImageHeaderType;
    body: string;
    buttons: [ButtonReplyType];
    footer: string;
  };
};

// LIST MESSAGE PROPS

type InteractiveListProps = {
  list: {
    header: string;
    listTextHead: TextHeaderType;
    body: string;
    sections: ListSectionsType[];
    footer: string;
    button: string;
  };
};

type ListSectionsType = {
  title: string;
  rows: ListRowType;
};
type ListRowType = {
  id: number;
  buttonId: string;
  title: string;
  description: string;
  product: ProductType;
};

type ProductType = {
  id: number;
  name: string;
  store: StoreType;
};

export type MesContextProductType = {
  product: {
    name: string;
    price: string;
    store: {
      name: string;
    };
  };
};

type StoreType = {
  id: number;
  name: string;
};

// #################### INTERACTIVE BUTTON DATA ###################
interface FormattedInteractiveButtonData {
  header?: ButtonHeader;
  body: ButtonBody;
  footer: ButtonFooter;
  buttons: ButtonButton[];
}

type ButtonHeader = {
  type: string;
  text?: string;
  filename?: string;
  link: string;
};

type ButtonBody = {
  text: string;
};
type ButtonFooter = {
  text: string;
};
type ButtonButton = {
  type: "reply";
  reply: {
    id: string;
    title: string;
  };
};

// ############################# INTERACTIVE LIST #######################
interface FormattedInteractiveListData {
  header?: ListHeaderType;
  body: ButtonBody;
  footer?: ButtonFooter;
  button: string;
  sections: ListSectionType[];
}

type ListHeaderType = {
  type: string;
  text: string;
};

type ListSectionType = {
  rows: ListRowType[];
};

type ListRowType = {
  id: string;
  title: string;
  description: string;
};

// adTemplate customer response
interface MarketResponseObj {
  customer: {
    customerId: number;
    name: string;
    phone: string;
  };
  chatId: number;
  response: string;
  createdAt: string;
}

// Customer360 view
export type OrderItemType = {
  productId?: number;
  name: string;
  price: string;
  quantity: number;
  subtotal: string;
};
interface Customer360OrderObj {
  orderID: string;
  id: number;
  isPaid: boolean;
  phone: string;
  address: string;
  updatedAt: string;
  status: string;
  orderItems: OrderItemType;
  storeOrder: {
    id: number;
    name: string;
  };
}

// ##################################PRODUCT VARIATIONS ###############
type OptionType = {
  value: string;
};

type VariantImageType = {
  link: string;
};
interface ProdVariationObject {
  name: string;
  prodVarOptions: OptionType[];
}

interface ProdCombinationObject {
  variantImage: VariantImageType;
  price: string;
  sku: string;
  availableStock: number;
}
