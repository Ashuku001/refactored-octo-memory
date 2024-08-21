/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Decimal: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  adTemplate: AdTemplate;
  delivered?: Maybe<Scalars['Int']['output']>;
  failed?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  merchantId: Scalars['Int']['output'];
  read?: Maybe<Scalars['Int']['output']>;
  response?: Maybe<Scalars['Int']['output']>;
  sent?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type AdTemplate = {
  __typename?: 'AdTemplate';
  adTempMessage?: Maybe<Message>;
  adTempProduct?: Maybe<Product>;
  adTempResponses?: Maybe<Array<Maybe<MarketingResponse>>>;
  id: Scalars['Int']['output'];
  leads?: Maybe<Scalars['Int']['output']>;
  merchant: Merchant;
  name: Scalars['String']['output'];
};

export type Auth = {
  __typename?: 'Auth';
  merchant?: Maybe<Merchant>;
  token?: Maybe<Scalars['String']['output']>;
};

export type Billboard = {
  __typename?: 'Billboard';
  categories?: Maybe<Array<Maybe<Category>>>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  label: Scalars['String']['output'];
  store?: Maybe<Store>;
  updatedAt: Scalars['Date']['output'];
};

export type BillboardInput = {
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  storeId: Scalars['Int']['input'];
};

export type Brand = {
  __typename?: 'Brand';
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  joinDate?: Maybe<Scalars['Date']['output']>;
  loc_address?: Maybe<Scalars['String']['output']>;
  loc_latitude?: Maybe<Scalars['String']['output']>;
  loc_longitude?: Maybe<Scalars['String']['output']>;
  loc_name?: Maybe<Scalars['String']['output']>;
  loc_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  storeId?: Maybe<Scalars['Int']['output']>;
};

export type BrandInput = {
  description: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  joinDate: Scalars['Date']['input'];
  loc_address: Scalars['String']['input'];
  loc_latitude?: InputMaybe<Scalars['String']['input']>;
  loc_longitude?: InputMaybe<Scalars['String']['input']>;
  loc_name: Scalars['String']['input'];
  loc_url?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};

export type BulkTemplateTask = {
  __typename?: 'BulkTemplateTask';
  customers?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  schedule?: Maybe<ScheduleTask>;
  template?: Maybe<Scalars['String']['output']>;
};

export type ButtonRepliedAction = {
  __typename?: 'ButtonRepliedAction';
  buttonId?: Maybe<Scalars['String']['output']>;
  buttonReply?: Maybe<InteractiveButton>;
  id?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Message>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ButtonRepliedActionInput = {
  buttonId: Scalars['String']['input'];
  interactiveButtonId?: InputMaybe<Scalars['Int']['input']>;
  messageId?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type ButtonRepliedInput = {
  mesBtnReply?: InputMaybe<ButtonRepliedActionInput>;
  message: MessageInput;
};

export type ButtonReplyAction = {
  __typename?: 'ButtonReplyAction';
  button: InteractiveButton;
  buttonId: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type ButtonReplyActionInput = {
  buttonId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  billboard: Billboard;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
  store: Store;
  updatedAt: Scalars['Date']['output'];
};

export type CategoryInput = {
  billboardId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type Chat = {
  __typename?: 'Chat';
  conversations?: Maybe<Array<Maybe<Conversation>>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  customer: Customer;
  id: Scalars['Int']['output'];
  lastMessage?: Maybe<Message>;
  merchant: Merchant;
  messages: Array<Maybe<Message>>;
  status?: Maybe<Scalars['String']['output']>;
};

export type ChatInput = {
  customer: Scalars['Int']['input'];
  merchant?: InputMaybe<Scalars['Int']['input']>;
};

export type ChatStatus = {
  messageId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ChatUpdated = {
  __typename?: 'ChatUpdated';
  chat?: Maybe<Chat>;
  message?: Maybe<Message>;
};

export type ContextMessageInput = {
  messageId: Scalars['String']['input'];
};

export type Conversation = {
  __typename?: 'Conversation';
  category?: Maybe<Scalars['String']['output']>;
  chat?: Maybe<Chat>;
  conversationId?: Maybe<Scalars['String']['output']>;
  expiryDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Int']['output'];
  pricingModel?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Coupon = {
  __typename?: 'Coupon';
  active?: Maybe<Scalars['Boolean']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  discount?: Maybe<Scalars['Decimal']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  validFrom?: Maybe<Scalars['Date']['output']>;
  validTo?: Maybe<Scalars['Date']['output']>;
};

export type CouponInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  code: Scalars['String']['input'];
  discount: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  validFrom: Scalars['Date']['input'];
  validTo: Scalars['Date']['input'];
};

export type CouponPromInput = {
  coupon: CouponInput;
  description?: InputMaybe<Scalars['String']['input']>;
  discountType: DiscountType;
  discountValue?: InputMaybe<Scalars['Decimal']['input']>;
  name: Scalars['String']['input'];
  storeId: Scalars['Int']['input'];
};

export type CusChatSearch = {
  __typename?: 'CusChatSearch';
  chats?: Maybe<Array<Maybe<Chat>>>;
  customers?: Maybe<Array<Maybe<Customer>>>;
};

export type Customer = {
  __typename?: 'Customer';
  age?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  customerLoyalty?: Maybe<Loyalty>;
  customerOrder?: Maybe<Array<Maybe<Order>>>;
  customerSegment?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  incomeCategory?: Maybe<Scalars['String']['output']>;
  joinDate?: Maybe<Scalars['Date']['output']>;
  lastPromoted?: Maybe<Scalars['Date']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  merchant?: Maybe<Merchant>;
  occupation?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  whatsapp_name?: Maybe<Scalars['String']['output']>;
};

export type CustomerInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  customerLoyalty?: InputMaybe<LoyaltyInput>;
  customerSegment?: InputMaybe<CustomerSegmentType>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderType>;
  incomeCategory?: InputMaybe<IncomeCategoryType>;
  joinDate?: InputMaybe<Scalars['Date']['input']>;
  lastPromoted?: InputMaybe<Scalars['Date']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  merchantId?: InputMaybe<Scalars['Int']['input']>;
  occupation?: InputMaybe<OccupationType>;
  phone_number: Scalars['String']['input'];
  status?: InputMaybe<CustomerStatus>;
  whatsapp_name?: InputMaybe<Scalars['String']['input']>;
};

export enum CustomerSegmentType {
  Cooperate = 'cooperate',
  Individual = 'individual',
  Medium = 'medium',
  Small = 'small'
}

export enum CustomerStatus {
  HighRated = 'high_rated',
  LowRated = 'low_rated',
  MediumRated = 'medium_rated',
  New = 'new'
}

export type DiscountPromInput = {
  active: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  discountType: DiscountType;
  discountValue: Scalars['Decimal']['input'];
  endDate: Scalars['Date']['input'];
  name: PromotionType;
  startDate: Scalars['Date']['input'];
  storeId: Scalars['Int']['input'];
};

export enum DiscountType {
  Fixed = 'fixed',
  Percent = 'percent'
}

export type DocumentHeader = {
  __typename?: 'DocumentHeader';
  filename?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
};

export type DocumentHeaderInput = {
  filename?: InputMaybe<Scalars['String']['input']>;
  link: Scalars['String']['input'];
  mimeType?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentInput = {
  caption?: InputMaybe<Scalars['String']['input']>;
  documentId?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  sha256?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentMessage = {
  __typename?: 'DocumentMessage';
  caption?: Maybe<Scalars['String']['output']>;
  documentId?: Maybe<Scalars['String']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  message: Message;
  mimeType?: Maybe<Scalars['String']['output']>;
  sha256?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type DocumentMessageInput = {
  document?: InputMaybe<DocumentInput>;
  message: MessageInput;
};

export enum GenderType {
  Female = 'female',
  Male = 'male',
  NotSure = 'not_sure'
}

export type Image = {
  __typename?: 'Image';
  id: Scalars['Int']['output'];
  productId: Scalars['Int']['output'];
  storeId: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type ImageHeader = {
  __typename?: 'ImageHeader';
  link: Scalars['String']['output'];
};

export type ImageHeaderInput = {
  link: Scalars['String']['input'];
};

export type ImageInput = {
  AWbucketId?: InputMaybe<Scalars['String']['input']>;
  AWfileId?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  imageId?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  sha256?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  url: Scalars['String']['input'];
};

export type ImageMessage = {
  __typename?: 'ImageMessage';
  AWbucketId?: Maybe<Scalars['String']['output']>;
  AWfileId?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  imageId?: Maybe<Scalars['String']['output']>;
  message: Message;
  mimeType?: Maybe<Scalars['String']['output']>;
  sha256?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type ImageMessageInput = {
  image?: InputMaybe<ImageInput>;
  message: MessageInput;
};

export enum IncomeCategoryType {
  High = 'high',
  Low = 'low',
  Medium = 'medium'
}

export type InteractiveButton = {
  __typename?: 'InteractiveButton';
  action?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
  btnImageHead?: Maybe<ImageHeader>;
  btnTextHead?: Maybe<TextHeader>;
  buttons?: Maybe<Array<Maybe<ButtonReplyAction>>>;
  footer?: Maybe<Scalars['String']['output']>;
  header?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  interactiveMessage: InteractiveMessage;
  product?: Maybe<Product>;
};

export type InteractiveButtonInput = {
  action?: InputMaybe<Scalars['String']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
  btnImageHead?: InputMaybe<ImageHeaderInput>;
  btnTextHead?: InputMaybe<TextHeaderInput>;
  buttons?: InputMaybe<Array<InputMaybe<ButtonReplyActionInput>>>;
  footer?: InputMaybe<Scalars['String']['input']>;
  header?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
};

export type InteractiveInput = {
  button?: InputMaybe<InteractiveButtonInput>;
  list?: InputMaybe<InteractiveListInput>;
  template?: InputMaybe<InteractiveTemplateInput>;
  type: Scalars['String']['input'];
};

export type InteractiveList = {
  __typename?: 'InteractiveList';
  body?: Maybe<Scalars['String']['output']>;
  button?: Maybe<Scalars['String']['output']>;
  footer?: Maybe<Scalars['String']['output']>;
  header?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  interactiveMessage: InteractiveMessage;
  listReplys?: Maybe<ListRepliedAction>;
  listTextHead?: Maybe<TextHeader>;
  sections?: Maybe<Array<Maybe<ListSection>>>;
};

export type InteractiveListInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  button?: InputMaybe<Scalars['String']['input']>;
  footer?: InputMaybe<Scalars['String']['input']>;
  header?: InputMaybe<Scalars['String']['input']>;
  listTextHead?: InputMaybe<TextHeaderInput>;
  sections?: InputMaybe<Array<InputMaybe<ListSectionInput>>>;
};

export type InteractiveMessage = {
  __typename?: 'InteractiveMessage';
  button?: Maybe<InteractiveButton>;
  id: Scalars['Int']['output'];
  list?: Maybe<InteractiveList>;
  message: Message;
  template?: Maybe<InteractiveTemplate>;
  type: Scalars['String']['output'];
};

export type InteractiveMessageInput = {
  interactive?: InputMaybe<InteractiveInput>;
  message: MessageInput;
};

export type InteractiveTemplate = {
  __typename?: 'InteractiveTemplate';
  action?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
  buttons?: Maybe<Array<Maybe<TemplateReplyAction>>>;
  footer?: Maybe<Scalars['String']['output']>;
  header?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  interactiveMessage: InteractiveMessage;
  tempImageHead?: Maybe<ImageHeader>;
  tempProduct?: Maybe<Product>;
  tempTextHead?: Maybe<TextHeader>;
};

export type InteractiveTemplateInput = {
  action?: InputMaybe<Scalars['String']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
  buttons?: InputMaybe<Array<InputMaybe<TemplateReplyActionInput>>>;
  footer?: InputMaybe<Scalars['String']['input']>;
  header?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  tempImageHead?: InputMaybe<ImageHeaderInput>;
  tempTextHead?: InputMaybe<TextHeaderInput>;
};

export type ListRepliedAction = {
  __typename?: 'ListRepliedAction';
  buttonId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  listReply?: Maybe<ListRowButton>;
  message?: Maybe<Message>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ListRepliedActionInput = {
  buttonId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  listRowButtonId?: InputMaybe<Scalars['Int']['input']>;
  messageId?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type ListRepliedInput = {
  mesListReply?: InputMaybe<ListRepliedActionInput>;
  message: MessageInput;
};

export type ListRowButton = {
  __typename?: 'ListRowButton';
  buttonId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  listSection?: Maybe<ListSection>;
  product?: Maybe<Product>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ListRowButtonInput = {
  buttonId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  interactiveListId?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type ListSection = {
  __typename?: 'ListSection';
  interactiveList: InteractiveList;
  rows?: Maybe<Array<Maybe<ListRowButton>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ListSectionInput = {
  rows?: InputMaybe<Array<InputMaybe<ListRowButtonInput>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Loyalty = {
  __typename?: 'Loyalty';
  createdAt?: Maybe<Scalars['Date']['output']>;
  customer?: Maybe<Customer>;
  id?: Maybe<Scalars['Int']['output']>;
  lastUpdated?: Maybe<Scalars['Date']['output']>;
  pointsBalance?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type LoyaltyInput = {
  customerId?: InputMaybe<Scalars['Int']['input']>;
  lastUpdated?: InputMaybe<Scalars['Date']['input']>;
  pointsBalance?: InputMaybe<Scalars['Int']['input']>;
};

export type MarketingResponse = {
  __typename?: 'MarketingResponse';
  cusTempLead?: Maybe<Customer>;
  id: Scalars['Int']['output'];
  mesTempLead?: Maybe<Message>;
};

export type Merchant = {
  __typename?: 'Merchant';
  business_name?: Maybe<Scalars['String']['output']>;
  chats?: Maybe<Array<Maybe<Chat>>>;
  customers?: Maybe<Array<Maybe<Customer>>>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Maybe<Product>>>;
  setting?: Maybe<Setting>;
  stores?: Maybe<Array<Maybe<Store>>>;
  username: Scalars['String']['output'];
  whatsapp_phone_number?: Maybe<Scalars['String']['output']>;
};

export type MerchantInput = {
  business_name: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
  whatsapp_phone_number?: InputMaybe<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  chat?: Maybe<Chat>;
  context?: Maybe<Message>;
  contexts?: Maybe<Array<Maybe<Message>>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  document?: Maybe<DocumentMessage>;
  from_customer?: Maybe<Scalars['Boolean']['output']>;
  hasContext?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['Int']['output'];
  image?: Maybe<ImageMessage>;
  interactive?: Maybe<InteractiveMessage>;
  isAd?: Maybe<Scalars['Boolean']['output']>;
  mesBtnReply?: Maybe<ButtonRepliedAction>;
  mesListReply?: Maybe<ListRepliedAction>;
  mesTempReply?: Maybe<TemplateRepliedAction>;
  messageAd?: Maybe<Ad>;
  messageId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  text?: Maybe<TextMessage>;
  timestamp?: Maybe<Scalars['Date']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  video?: Maybe<VideoMessage>;
};

export type MessageFeed = {
  __typename?: 'MessageFeed';
  cursor: Scalars['String']['output'];
  messages: Array<Maybe<Message>>;
};

export type MessageInput = {
  chatId?: InputMaybe<Scalars['Int']['input']>;
  from_customer: Scalars['Boolean']['input'];
  messageId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  timestamp: Scalars['Date']['input'];
  type: Scalars['String']['input'];
};

export type MpesaSetting = {
  __typename?: 'MpesaSetting';
  account_reference: Scalars['String']['output'];
  business_shortcode: Scalars['String']['output'];
  callback_url?: Maybe<Scalars['String']['output']>;
  consumer_key: Scalars['String']['output'];
  consumer_secret: Scalars['String']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  pass_key: Scalars['String']['output'];
  store?: Maybe<Store>;
  transaction_desc: Scalars['String']['output'];
};

export type MpesaSettingInput = {
  account_reference?: InputMaybe<Scalars['String']['input']>;
  business_shortcode?: InputMaybe<Scalars['String']['input']>;
  callback_url?: InputMaybe<Scalars['String']['input']>;
  consumer_key?: InputMaybe<Scalars['String']['input']>;
  consumer_secret?: InputMaybe<Scalars['String']['input']>;
  pass_key?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  transaction_desc?: InputMaybe<Scalars['String']['input']>;
};

export enum OccupationType {
  Employed = 'employed',
  SelfEmployed = 'self_employed',
  Student = 'student'
}

export type Order = {
  __typename?: 'Order';
  address: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  customerOrder?: Maybe<Customer>;
  id: Scalars['Int']['output'];
  isPaid: Scalars['Boolean']['output'];
  orderID?: Maybe<Scalars['String']['output']>;
  orderItems: Array<Maybe<OrderItem>>;
  phone: Scalars['String']['output'];
  status: Scalars['String']['output'];
  storeOrder?: Maybe<Store>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type OrderCheckoutInput = {
  address: Scalars['String']['input'];
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  phone_number: Scalars['String']['input'];
};

export type OrderInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  orderItems?: InputMaybe<Array<InputMaybe<OrderItemInput>>>;
  phone_number: Scalars['String']['input'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['Int']['output'];
  order?: Maybe<Order>;
  orderProduct: Product;
  price: Scalars['Decimal']['output'];
  productId?: Maybe<Scalars['Int']['output']>;
  quantity: Scalars['Int']['output'];
};

export type OrderItemInput = {
  price: Scalars['Decimal']['input'];
  productId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

export type ParticipantsInput = {
  customer: CustomerInput;
  mer_username: Scalars['String']['input'];
};

export type Product = {
  __typename?: 'Product';
  brand?: Maybe<Brand>;
  category: Category;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  images: Array<Maybe<Image>>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
  prodCombinations?: Maybe<Array<Maybe<ProductCombination>>>;
  prodVariations?: Maybe<Array<Maybe<ProductVariation>>>;
  stockCode?: Maybe<Scalars['String']['output']>;
  store: Store;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ProductCombInput = {
  availableStock?: InputMaybe<Scalars['Int']['input']>;
  combinationString?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  productVariants?: InputMaybe<Array<InputMaybe<ProductVariationInput>>>;
  sku?: InputMaybe<Scalars['String']['input']>;
  variantImage?: InputMaybe<ProductImageInput>;
};

export type ProductCombination = {
  __typename?: 'ProductCombination';
  availableStock?: Maybe<Scalars['Int']['output']>;
  combinationString?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Decimal']['output']>;
  prodCombination?: Maybe<Product>;
  productVariants?: Maybe<Array<Maybe<ProductVariationOption>>>;
  sku?: Maybe<Scalars['String']['output']>;
  variantImage?: Maybe<ProductImage>;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  link?: Maybe<Scalars['String']['output']>;
};

export type ProductImageInput = {
  link: Scalars['String']['input'];
  storeId: Scalars['Int']['input'];
};

export type ProductInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  brandId: Scalars['Int']['input'];
  categoryId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<InputMaybe<ImageInput>>>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  prodCombinations?: InputMaybe<Array<InputMaybe<ProductCombInput>>>;
  prodVariations?: InputMaybe<Array<InputMaybe<ProductVariationInput>>>;
  stockCode?: InputMaybe<Scalars['String']['input']>;
  storeId: Scalars['Int']['input'];
};

export type ProductVarOptionInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ProductVariation = {
  __typename?: 'ProductVariation';
  name?: Maybe<Scalars['String']['output']>;
  prodVarOptions?: Maybe<Array<Maybe<ProductVariationOption>>>;
  prodVariation?: Maybe<Product>;
};

export type ProductVariationInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  prodVarOptions?: InputMaybe<Array<InputMaybe<ProductVarOptionInput>>>;
};

export type ProductVariationOption = {
  __typename?: 'ProductVariationOption';
  prodVarOption?: Maybe<ProductVariation>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Promotion = {
  __typename?: 'Promotion';
  active?: Maybe<Scalars['Boolean']['output']>;
  coupon?: Maybe<Coupon>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountType?: Maybe<DiscountType>;
  discountValue?: Maybe<Scalars['Decimal']['output']>;
  endDate?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name: PromotionType;
  startDate?: Maybe<Scalars['Date']['output']>;
  store?: Maybe<Store>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type PromotionCustomer = {
  __typename?: 'PromotionCustomer';
  createdAt?: Maybe<Scalars['Date']['output']>;
  customerPromotions?: Maybe<Array<Maybe<Customer>>>;
  id?: Maybe<Scalars['Int']['output']>;
  product?: Maybe<Array<Maybe<Product>>>;
  redemptionDate?: Maybe<Scalars['Date']['output']>;
  reedemed?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type PromotionProduct = {
  __typename?: 'PromotionProduct';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  productPromotions?: Maybe<Array<Maybe<Product>>>;
  promotionProducts?: Maybe<Array<Maybe<Promotion>>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export enum PromotionType {
  Bogo = 'bogo',
  Bundle = 'bundle',
  CashBack = 'cash_back',
  Competition = 'competition',
  Coupon = 'coupon',
  Discount = 'discount',
  Donation = 'donation',
  FlashSale = 'flash_sale',
  FreeGifts = 'free_gifts',
  FreeShipping = 'free_shipping',
  FreeTrial = 'free_trial',
  GiveAway = 'give_away',
  Loyalty = 'loyalty',
  MemberReferral = 'member_referral',
  Subscription = 'subscription',
  TieredDiscount = 'tiered_discount',
  UpsellSpecial = 'upsell_special'
}

export type Purchase = {
  __typename?: 'Purchase';
  createdAt?: Maybe<Scalars['Date']['output']>;
  customer?: Maybe<Customer>;
  id?: Maybe<Scalars['Int']['output']>;
  pointsEarned?: Maybe<Scalars['Int']['output']>;
  purchaseDate?: Maybe<Scalars['Date']['output']>;
  totalAmount?: Maybe<Scalars['Decimal']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type Redemption = {
  __typename?: 'Redemption';
  createdAt?: Maybe<Scalars['Date']['output']>;
  customer?: Maybe<Customer>;
  id?: Maybe<Scalars['Int']['output']>;
  pointsUsed?: Maybe<Scalars['Int']['output']>;
  redemptionDate?: Maybe<Scalars['Date']['output']>;
  reward?: Maybe<Reward>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type RedemptionInput = {
  customerId?: InputMaybe<Scalars['Int']['input']>;
  pointsUsed?: InputMaybe<Scalars['Int']['input']>;
  redemptionDate?: InputMaybe<Scalars['Date']['input']>;
  rewardId?: InputMaybe<Scalars['Int']['input']>;
};

export type ReqNotification = {
  __typename?: 'ReqNotification';
  notification: Scalars['String']['output'];
};

export type Response = {
  __typename?: 'Response';
  response?: Maybe<Scalars['String']['output']>;
};

export type ReturnedChat = {
  __typename?: 'ReturnedChat';
  conversations?: Maybe<Array<Maybe<Conversation>>>;
  customer?: Maybe<Customer>;
  messages?: Maybe<Array<Maybe<Message>>>;
};

export type Reward = {
  __typename?: 'Reward';
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  pointsRequired?: Maybe<Scalars['Int']['output']>;
  rewardName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type RewardInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  pointsRequired?: InputMaybe<Scalars['Int']['input']>;
  rewardName?: InputMaybe<Scalars['String']['input']>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  addBillboard?: Maybe<Billboard>;
  addBrand?: Maybe<Brand>;
  addBulkTemplateTask?: Maybe<ScheduleTask>;
  addButtonRepliedMessage?: Maybe<Message>;
  addCategory?: Maybe<Category>;
  addChat?: Maybe<Chat>;
  addCoupon?: Maybe<Promotion>;
  addCustomer?: Maybe<Customer>;
  addDiscount?: Maybe<Promotion>;
  addDocumentMessage?: Maybe<Message>;
  addImage?: Maybe<Image>;
  addImageMessage?: Maybe<Message>;
  addInteractiveButtonMessage?: Maybe<Message>;
  addInteractiveListMessage?: Maybe<Message>;
  addInteractiveTemplateMessage?: Maybe<Message>;
  addListRepliedMessage?: Maybe<Message>;
  addMpesa?: Maybe<MpesaSetting>;
  addOrder?: Maybe<Order>;
  addProduct?: Maybe<Product>;
  addProductVariations?: Maybe<Product>;
  addSetting?: Maybe<Setting>;
  addStore?: Maybe<Store>;
  addStripe?: Maybe<StripeSetting>;
  addTemplateMesBulk?: Maybe<Message>;
  addTemplateRepliedMessage?: Maybe<Message>;
  addTextMessage?: Maybe<Message>;
  addVideoMessage?: Maybe<Message>;
  deleteBillboard?: Maybe<Response>;
  deleteBrand?: Maybe<Response>;
  deleteCategory?: Maybe<Response>;
  deleteCoupon?: Maybe<Scalars['String']['output']>;
  deleteDiscount?: Maybe<Scalars['String']['output']>;
  deleteImage?: Maybe<Response>;
  deleteMpesa?: Maybe<Response>;
  deleteProduct?: Maybe<Response>;
  deleteStore?: Maybe<Response>;
  deleteStripe?: Maybe<Response>;
  loginMerchant?: Maybe<Auth>;
  logoutMerchant?: Maybe<Response>;
  signupMerchant?: Maybe<Auth>;
  updateBillboard?: Maybe<Billboard>;
  updateBrand?: Maybe<Brand>;
  updateBulkTemplateTask?: Maybe<Response>;
  updateCategory?: Maybe<Category>;
  updateChatStatus?: Maybe<Message>;
  updateCoupon?: Maybe<Promotion>;
  updateCustomer?: Maybe<Customer>;
  updateDiscount?: Maybe<Promotion>;
  updateMessageStatus?: Maybe<Message>;
  updateMpesa?: Maybe<MpesaSetting>;
  updateOrderCheckout?: Maybe<Order>;
  updateProduct?: Maybe<Product>;
  updateProductVariation?: Maybe<Product>;
  updateStore?: Maybe<Store>;
  updateStripe?: Maybe<StripeSetting>;
};


export type RootMutationAddBillboardArgs = {
  billboard: BillboardInput;
};


export type RootMutationAddBrandArgs = {
  brand: BrandInput;
};


export type RootMutationAddBulkTemplateTaskArgs = {
  schedule: ScheduleTaskInput;
};


export type RootMutationAddButtonRepliedMessageArgs = {
  contextMessage?: InputMaybe<ContextMessageInput>;
  message: ButtonRepliedInput;
  participants?: InputMaybe<ParticipantsInput>;
};


export type RootMutationAddCategoryArgs = {
  category: CategoryInput;
};


export type RootMutationAddChatArgs = {
  chat: ChatInput;
};


export type RootMutationAddCouponArgs = {
  promotion?: InputMaybe<CouponPromInput>;
};


export type RootMutationAddCustomerArgs = {
  customer: CustomerInput;
};


export type RootMutationAddDiscountArgs = {
  discount?: InputMaybe<DiscountPromInput>;
};


export type RootMutationAddDocumentMessageArgs = {
  contextMessage?: InputMaybe<ContextMessageInput>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
  message: DocumentMessageInput;
  participants?: InputMaybe<ParticipantsInput>;
  template?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationAddImageArgs = {
  image: ImageInput;
};


export type RootMutationAddImageMessageArgs = {
  contextMessage?: InputMaybe<ContextMessageInput>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
  message: ImageMessageInput;
  participants?: InputMaybe<ParticipantsInput>;
  template?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationAddInteractiveButtonMessageArgs = {
  contextMessage?: InputMaybe<ContextMessageInput>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
  message: InteractiveMessageInput;
  participants?: InputMaybe<ParticipantsInput>;
  template?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationAddInteractiveListMessageArgs = {
  contextMessage?: InputMaybe<ContextMessageInput>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
  message: InteractiveMessageInput;
  participants?: InputMaybe<ParticipantsInput>;
  template?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationAddInteractiveTemplateMessageArgs = {
  contextMessage?: InputMaybe<ContextMessageInput>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
  message?: InputMaybe<InteractiveMessageInput>;
  participants?: InputMaybe<ParticipantsInput>;
  template?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationAddListRepliedMessageArgs = {
  contextMessage?: InputMaybe<ContextMessageInput>;
  message: ListRepliedInput;
  participants?: InputMaybe<ParticipantsInput>;
};


export type RootMutationAddMpesaArgs = {
  mpesa: MpesaSettingInput;
};


export type RootMutationAddOrderArgs = {
  order: OrderInput;
  storeId: Scalars['Int']['input'];
};


export type RootMutationAddProductArgs = {
  product: ProductInput;
};


export type RootMutationAddProductVariationsArgs = {
  product?: InputMaybe<ProductInput>;
};


export type RootMutationAddSettingArgs = {
  setting: SettingInput;
};


export type RootMutationAddStoreArgs = {
  store: StoreInput;
};


export type RootMutationAddStripeArgs = {
  stripe: StripeSettingInput;
};


export type RootMutationAddTemplateMesBulkArgs = {
  message: InteractiveMessageInput;
  selectedCustomers: Scalars['String']['input'];
  template?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationAddTemplateRepliedMessageArgs = {
  contextMessage?: InputMaybe<ContextMessageInput>;
  message: TemplateRepliedInput;
  participants?: InputMaybe<ParticipantsInput>;
};


export type RootMutationAddTextMessageArgs = {
  contextMessage?: InputMaybe<ContextMessageInput>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
  message: TextMessageInput;
  participants?: InputMaybe<ParticipantsInput>;
  template?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationAddVideoMessageArgs = {
  contextMessage?: InputMaybe<ContextMessageInput>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
  message: VideoMessageInput;
  participants?: InputMaybe<ParticipantsInput>;
  template?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationDeleteBillboardArgs = {
  billboardId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteBrandArgs = {
  brandId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteCategoryArgs = {
  categoryId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteCouponArgs = {
  promotionId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteDiscountArgs = {
  promotionId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteImageArgs = {
  imageId: Scalars['Int']['input'];
  productId: Scalars['Int']['input'];
};


export type RootMutationDeleteMpesaArgs = {
  mpesaId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteProductArgs = {
  productId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteStoreArgs = {
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteStripeArgs = {
  storeId: Scalars['Int']['input'];
  stripeId: Scalars['Int']['input'];
};


export type RootMutationLoginMerchantArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type RootMutationSignupMerchantArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
  whatsapp_phone_number: Scalars['String']['input'];
};


export type RootMutationUpdateBillboardArgs = {
  billboardId: Scalars['Int']['input'];
  payload: BillboardInput;
};


export type RootMutationUpdateBrandArgs = {
  brandId: Scalars['Int']['input'];
  payload: BrandInput;
};


export type RootMutationUpdateBulkTemplateTaskArgs = {
  merchantId: Scalars['Int']['input'];
  taskId: Scalars['Int']['input'];
};


export type RootMutationUpdateCategoryArgs = {
  categoryId: Scalars['Int']['input'];
  payload: CategoryInput;
};


export type RootMutationUpdateChatStatusArgs = {
  participants?: InputMaybe<ParticipantsInput>;
  payload: ChatStatus;
};


export type RootMutationUpdateCouponArgs = {
  payload?: InputMaybe<CouponPromInput>;
  promotionId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootMutationUpdateCustomerArgs = {
  customerId: Scalars['Int']['input'];
  payload: CustomerInput;
};


export type RootMutationUpdateDiscountArgs = {
  payload?: InputMaybe<DiscountPromInput>;
  promotionId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootMutationUpdateMessageStatusArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  messageId?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationUpdateMpesaArgs = {
  mpesaId: Scalars['Int']['input'];
  payload: MpesaSettingInput;
};


export type RootMutationUpdateOrderCheckoutArgs = {
  orderId: Scalars['Int']['input'];
  payload: OrderCheckoutInput;
  storeId: Scalars['Int']['input'];
};


export type RootMutationUpdateProductArgs = {
  payload: ProductInput;
  productId: Scalars['Int']['input'];
};


export type RootMutationUpdateProductVariationArgs = {
  payload: ProductInput;
  productId: Scalars['Int']['input'];
};


export type RootMutationUpdateStoreArgs = {
  payload: StoreInput;
  storeId: Scalars['Int']['input'];
};


export type RootMutationUpdateStripeArgs = {
  payload: StripeSettingInput;
  stripeId: Scalars['Int']['input'];
};

export type RootQuery = {
  __typename?: 'RootQuery';
  ads?: Maybe<Array<Maybe<Ad>>>;
  allProducts?: Maybe<Array<Maybe<Store>>>;
  billboard: Billboard;
  billboards?: Maybe<Array<Maybe<Billboard>>>;
  brand?: Maybe<Brand>;
  brands?: Maybe<Array<Maybe<Brand>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  category: Category;
  chat?: Maybe<ReturnedChat>;
  chats?: Maybe<Array<Maybe<Chat>>>;
  currentMerchant?: Maybe<Merchant>;
  customer?: Maybe<Customer>;
  customer360?: Maybe<Customer>;
  customerChatSearch?: Maybe<CusChatSearch>;
  customerSearch?: Maybe<Array<Maybe<Customer>>>;
  customers?: Maybe<Array<Maybe<Customer>>>;
  customersSearch?: Maybe<Array<Maybe<Customer>>>;
  lastMessage?: Maybe<Message>;
  mpesa?: Maybe<MpesaSetting>;
  orders: Array<Maybe<Order>>;
  product: Product;
  productSearch?: Maybe<Array<Maybe<Product>>>;
  products?: Maybe<Array<Maybe<Product>>>;
  productsIds: Array<Maybe<Product>>;
  productsWithVariants?: Maybe<Array<Maybe<Product>>>;
  promotions?: Maybe<Array<Maybe<Promotion>>>;
  sales?: Maybe<Array<Maybe<Sale>>>;
  setting?: Maybe<Setting>;
  store?: Maybe<Store>;
  stores?: Maybe<Array<Maybe<Store>>>;
  stripe?: Maybe<StripeSetting>;
  tempMarketResponse?: Maybe<AdTemplate>;
  templateSchedules?: Maybe<Array<Maybe<ScheduleTask>>>;
};


export type RootQueryBillboardArgs = {
  billboardId: Scalars['Int']['input'];
};


export type RootQueryBillboardsArgs = {
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryBrandArgs = {
  brandId: Scalars['Int']['input'];
};


export type RootQueryBrandsArgs = {
  storeId: Scalars['Int']['input'];
};


export type RootQueryCategoriesArgs = {
  storeId: Scalars['Int']['input'];
};


export type RootQueryCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};


export type RootQueryChatArgs = {
  chatId: Scalars['Int']['input'];
};


export type RootQueryCustomerArgs = {
  customerId: Scalars['Int']['input'];
};


export type RootQueryCustomer360Args = {
  customerId: Scalars['Int']['input'];
};


export type RootQueryCustomerChatSearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};


export type RootQueryCustomerSearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};


export type RootQueryCustomersSearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};


export type RootQueryLastMessageArgs = {
  chatId: Scalars['Int']['input'];
};


export type RootQueryMpesaArgs = {
  storeId: Scalars['Int']['input'];
};


export type RootQueryOrdersArgs = {
  storeId: Scalars['Int']['input'];
};


export type RootQueryProductArgs = {
  productId: Scalars['Int']['input'];
};


export type RootQueryProductSearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  storeId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};


export type RootQueryProductsArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  storeId: Scalars['Int']['input'];
};


export type RootQueryProductsIdsArgs = {
  productIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryProductsWithVariantsArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  storeId: Scalars['Int']['input'];
  variantId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryPromotionsArgs = {
  storeId: Scalars['Int']['input'];
};


export type RootQuerySalesArgs = {
  storeId: Scalars['Int']['input'];
};


export type RootQuerySettingArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};


export type RootQueryStoreArgs = {
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryStripeArgs = {
  storeId: Scalars['Int']['input'];
};


export type RootQueryTempMarketResponseArgs = {
  adTemplateId: Scalars['Int']['input'];
};

export type RootSubscription = {
  __typename?: 'RootSubscription';
  chatAdded?: Maybe<Chat>;
  messageAdded?: Maybe<ChatUpdated>;
};


export type RootSubscriptionChatAddedArgs = {
  merchantId: Scalars['Int']['input'];
};


export type RootSubscriptionMessageAddedArgs = {
  chatId: Scalars['Int']['input'];
};

export type Sale = {
  __typename?: 'Sale';
  createdAt?: Maybe<Scalars['Date']['output']>;
  customerSales?: Maybe<Customer>;
  id?: Maybe<Scalars['Int']['output']>;
  saleDate?: Maybe<Scalars['Date']['output']>;
  saleDetails?: Maybe<Array<Maybe<SaleDetail>>>;
  salePromotions?: Maybe<Promotion>;
  totalAmount?: Maybe<Scalars['Decimal']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type SaleDetail = {
  __typename?: 'SaleDetail';
  discount?: Maybe<Scalars['Decimal']['output']>;
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Int']['output']>;
  sales?: Maybe<Sale>;
  unitPrice?: Maybe<Scalars['Decimal']['output']>;
};

export type ScheduleTask = {
  __typename?: 'ScheduleTask';
  bulkTempTask?: Maybe<BulkTemplateTask>;
  id?: Maybe<Scalars['Int']['output']>;
  merchantsTasks?: Maybe<Merchant>;
  timestamp?: Maybe<Scalars['Date']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ScheduleTaskInput = {
  bulkTempTask?: InputMaybe<TemplateTaskInput>;
  status: Scalars['String']['input'];
  timestamp: Scalars['Date']['input'];
  type: Scalars['String']['input'];
};

export type Setting = {
  __typename?: 'Setting';
  access_token: Scalars['String']['output'];
  api_version: Scalars['String']['output'];
  app_id: Scalars['String']['output'];
  app_secret: Scalars['String']['output'];
  business_account_id: Scalars['String']['output'];
  callBack_url: Scalars['String']['output'];
  phone_number?: Maybe<Scalars['String']['output']>;
  phone_number_id: Scalars['String']['output'];
  webhook_verification_token: Scalars['String']['output'];
};

export type SettingInput = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  api_version?: InputMaybe<Scalars['String']['input']>;
  app_id?: InputMaybe<Scalars['String']['input']>;
  app_secret?: InputMaybe<Scalars['String']['input']>;
  business_account_id?: InputMaybe<Scalars['String']['input']>;
  callBack_url?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  phone_number_id?: InputMaybe<Scalars['String']['input']>;
  webhook_verification_token?: InputMaybe<Scalars['String']['input']>;
};

export type Store = {
  __typename?: 'Store';
  billboards?: Maybe<Array<Maybe<Billboard>>>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  merchant?: Maybe<Merchant>;
  mpesa?: Maybe<MpesaSetting>;
  name: Scalars['String']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
  updatedAt: Scalars['Date']['output'];
};

export type StoreInput = {
  name: Scalars['String']['input'];
};

export type StripeSetting = {
  __typename?: 'StripeSetting';
  api_key: Scalars['String']['output'];
  callback_url: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  storeId?: Maybe<Store>;
  webhook_secret: Scalars['String']['output'];
};

export type StripeSettingInput = {
  api_key?: InputMaybe<Scalars['String']['input']>;
  callback_url?: InputMaybe<Scalars['String']['input']>;
  storeId: Scalars['Int']['input'];
  webhook_secret?: InputMaybe<Scalars['String']['input']>;
};

export type TemplateRepliedAction = {
  __typename?: 'TemplateRepliedAction';
  id?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Message>;
  payload?: Maybe<Scalars['String']['output']>;
  tempReply?: Maybe<InteractiveTemplate>;
  text?: Maybe<Scalars['String']['output']>;
};

export type TemplateRepliedActionInput = {
  interactiveTemplateId?: InputMaybe<Scalars['Int']['input']>;
  messageId?: InputMaybe<Scalars['Int']['input']>;
  payload?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
};

export type TemplateRepliedInput = {
  mesTempReply?: InputMaybe<TemplateRepliedActionInput>;
  message: MessageInput;
};

export type TemplateReplyAction = {
  __typename?: 'TemplateReplyAction';
  id: Scalars['Int']['output'];
  template: InteractiveTemplate;
  text: Scalars['String']['output'];
};

export type TemplateReplyActionInput = {
  text: Scalars['String']['input'];
};

export type TemplateTaskInput = {
  customers?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<Scalars['String']['input']>;
};

export type TextHeader = {
  __typename?: 'TextHeader';
  body?: Maybe<Scalars['String']['output']>;
};

export type TextHeaderInput = {
  body: Scalars['String']['input'];
};

export type TextInput = {
  body: Scalars['String']['input'];
};

export type TextMessage = {
  __typename?: 'TextMessage';
  body: Scalars['String']['output'];
  id?: Maybe<Scalars['Int']['output']>;
};

export type TextMessageInput = {
  message: MessageInput;
  text: TextInput;
};

export type VideoHeader = {
  __typename?: 'VideoHeader';
  link?: Maybe<Scalars['String']['output']>;
};

export type VideoHeaderInput = {
  link: Scalars['String']['input'];
};

export type VideoInput = {
  caption?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  sha256?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  videoId?: InputMaybe<Scalars['String']['input']>;
};

export type VideoMessage = {
  __typename?: 'VideoMessage';
  caption?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  message: Message;
  mimeType?: Maybe<Scalars['String']['output']>;
  sha256?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  videoId?: Maybe<Scalars['String']['output']>;
};

export type VideoMessageInput = {
  message: MessageInput;
  video?: InputMaybe<VideoInput>;
};

export type AddBillboardMutationVariables = Exact<{
  billboard: BillboardInput;
}>;


export type AddBillboardMutation = { __typename?: 'RootMutation', addBillboard?: { __typename: 'Billboard', id: number, label: string, imageUrl?: string | null, store?: { __typename: 'Store', id: number } | null } | null };

export type AddBrandMutationVariables = Exact<{
  brand: BrandInput;
}>;


export type AddBrandMutation = { __typename?: 'RootMutation', addBrand?: { __typename: 'Brand', name: string, joinDate?: any | null, description?: string | null, phoneNumber?: string | null, industry?: string | null, loc_name?: string | null, loc_address?: string | null, loc_latitude?: string | null, loc_longitude?: string | null, loc_url?: string | null, storeId?: number | null } | null };

export type AddTemplateCampaignMutationVariables = Exact<{
  selectedCustomers: Scalars['String']['input'];
  template?: InputMaybe<Scalars['String']['input']>;
  message: InteractiveMessageInput;
}>;


export type AddTemplateCampaignMutation = { __typename?: 'RootMutation', addTemplateMesBulk?: { __typename: 'Message', id: number } | null };

export type AddBulkTemplateTaskMutationVariables = Exact<{
  schedule: ScheduleTaskInput;
}>;


export type AddBulkTemplateTaskMutation = { __typename?: 'RootMutation', addBulkTemplateTask?: { __typename?: 'ScheduleTask', id?: number | null, type?: string | null, timestamp?: any | null, bulkTempTask?: { __typename?: 'BulkTemplateTask', id?: number | null, customers?: string | null, message?: string | null, template?: string | null } | null } | null };

export type AddButtonRepliedMessageMutationVariables = Exact<{
  message: ButtonRepliedInput;
  participants?: InputMaybe<ParticipantsInput>;
  contextMessage?: InputMaybe<ContextMessageInput>;
}>;


export type AddButtonRepliedMessageMutation = { __typename?: 'RootMutation', addButtonRepliedMessage?: { __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, timestamp?: any | null, createdAt?: any | null, messageId?: string | null, mesBtnReply?: { __typename: 'ButtonRepliedAction', id?: number | null, buttonReply?: { __typename: 'InteractiveButton', id: number, header?: string | null, btnImageHead?: { __typename: 'ImageHeader', link: string } | null, product?: { __typename: 'Product', name: string, store: { __typename: 'Store', name: string, id: number } } | null, buttons?: Array<{ __typename: 'ButtonReplyAction', buttonId: string, title: string } | null> | null } | null } | null, chat?: { __typename: 'Chat', id: number } | null } | null };

export type AddCategoryMutationVariables = Exact<{
  category: CategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'RootMutation', addCategory?: { __typename: 'Category', id: number, name: string, store: { __typename: 'Store', id: number }, billboard: { __typename: 'Billboard', id: number } } | null };

export type AddCouponMutationVariables = Exact<{
  promotion: CouponPromInput;
}>;


export type AddCouponMutation = { __typename?: 'RootMutation', addCoupon?: { __typename: 'Promotion', id?: number | null, name: PromotionType, description?: string | null, discountType?: DiscountType | null, coupon?: { __typename: 'Coupon', id?: number | null, validFrom?: any | null, validTo?: any | null, discount?: any | null, active?: boolean | null, createdAt?: any | null, updatedAt?: any | null } | null } | null };

export type AddCustomerMutationVariables = Exact<{
  customer: CustomerInput;
}>;


export type AddCustomerMutation = { __typename?: 'RootMutation', addCustomer?: { __typename: 'Customer', id: number, whatsapp_name?: string | null, first_name?: string | null, last_name?: string | null, phone_number?: string | null } | null };

export type AddDiscountMutationVariables = Exact<{
  discount: DiscountPromInput;
}>;


export type AddDiscountMutation = { __typename?: 'RootMutation', addDiscount?: { __typename: 'Promotion', id?: number | null, name: PromotionType, startDate?: any | null, endDate?: any | null, description?: string | null, discountType?: DiscountType | null, active?: boolean | null, discountValue?: any | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type AddDocumentMessageMutationVariables = Exact<{
  message: DocumentMessageInput;
  template?: InputMaybe<Scalars['String']['input']>;
  participants?: InputMaybe<ParticipantsInput>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddDocumentMessageMutation = { __typename?: 'RootMutation', addDocumentMessage?: { __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, timestamp?: any | null, createdAt?: any | null, messageId?: string | null, document?: { __typename: 'DocumentMessage', url?: string | null, sha256?: string | null, filename?: string | null, mimeType?: string | null, documentId?: string | null, caption?: string | null } | null, chat?: { __typename: 'Chat', id: number } | null } | null };

export type AddImageMessageMutationVariables = Exact<{
  message: ImageMessageInput;
  template?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddImageMessageMutation = { __typename?: 'RootMutation', addImageMessage?: { __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, timestamp?: any | null, createdAt?: any | null, image?: { __typename: 'ImageMessage', url?: string | null, caption?: string | null } | null, chat?: { __typename: 'Chat', id: number } | null } | null };

export type AddInteractiveButtonMessageMutationVariables = Exact<{
  message: InteractiveMessageInput;
  template?: InputMaybe<Scalars['String']['input']>;
  participants?: InputMaybe<ParticipantsInput>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddInteractiveButtonMessageMutation = { __typename?: 'RootMutation', addInteractiveButtonMessage?: { __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, timestamp?: any | null, createdAt?: any | null, messageId?: string | null, interactive?: { __typename: 'InteractiveMessage', id: number, type: string, button?: { __typename: 'InteractiveButton', id: number, header?: string | null, body?: string | null, footer?: string | null, action?: string | null, btnImageHead?: { __typename: 'ImageHeader', link: string } | null, btnTextHead?: { __typename: 'TextHeader', body?: string | null } | null, buttons?: Array<{ __typename: 'ButtonReplyAction', buttonId: string, title: string } | null> | null, product?: { __typename: 'Product', id: number, name: string, store: { __typename: 'Store', id: number, name: string } } | null } | null } | null, chat?: { __typename: 'Chat', id: number } | null } | null };

export type AddInteractiveListMessageMutationVariables = Exact<{
  message: InteractiveMessageInput;
  template?: InputMaybe<Scalars['String']['input']>;
  participants?: InputMaybe<ParticipantsInput>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddInteractiveListMessageMutation = { __typename?: 'RootMutation', addInteractiveListMessage?: { __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, timestamp?: any | null, createdAt?: any | null, messageId?: string | null, interactive?: { __typename: 'InteractiveMessage', id: number, type: string, list?: { __typename: 'InteractiveList', id: number, header?: string | null, body?: string | null, button?: string | null, listTextHead?: { __typename: 'TextHeader', body?: string | null } | null, sections?: Array<{ __typename: 'ListSection', title?: string | null, rows?: Array<{ __typename: 'ListRowButton', id: number, buttonId?: string | null, title?: string | null, description?: string | null, product?: { __typename: 'Product', id: number, name: string, store: { __typename: 'Store', id: number, name: string } } | null } | null> | null } | null> | null } | null } | null, chat?: { __typename: 'Chat', id: number } | null } | null };

export type AddInteractiveTemplateMessageMutationVariables = Exact<{
  message: InteractiveMessageInput;
  template?: InputMaybe<Scalars['String']['input']>;
  participants?: InputMaybe<ParticipantsInput>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddInteractiveTemplateMessageMutation = { __typename?: 'RootMutation', addInteractiveTemplateMessage?: { __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, timestamp?: any | null, createdAt?: any | null, messageId?: string | null, interactive?: { __typename: 'InteractiveMessage', id: number, type: string, template?: { __typename: 'InteractiveTemplate', id: number, header?: string | null, body?: string | null, action?: string | null, tempImageHead?: { __typename: 'ImageHeader', link: string } | null, tempProduct?: { __typename: 'Product', name: string, store: { __typename: 'Store', name: string, id: number } } | null, buttons?: Array<{ __typename: 'TemplateReplyAction', text: string, id: number } | null> | null } | null } | null, chat?: { __typename: 'Chat', id: number } | null } | null };

export type AddMpesaMutationVariables = Exact<{
  mpesa: MpesaSettingInput;
}>;


export type AddMpesaMutation = { __typename?: 'RootMutation', addMpesa?: { __typename?: 'MpesaSetting', id?: number | null, consumer_key: string, consumer_secret: string, pass_key: string, business_shortcode: string, account_reference: string, transaction_desc: string } | null };

export type AddOrderMutationVariables = Exact<{
  order: OrderInput;
  storeId: Scalars['Int']['input'];
}>;


export type AddOrderMutation = { __typename?: 'RootMutation', addOrder?: { __typename?: 'Order', id: number, isPaid: boolean, phone: string, orderItems: Array<{ __typename?: 'OrderItem', id: number, orderProduct: { __typename?: 'Product', name: string } } | null> } | null };

export type AddProductMutationVariables = Exact<{
  product: ProductInput;
}>;


export type AddProductMutation = { __typename?: 'RootMutation', addProduct?: { __typename: 'Product', id: number, name: string, price: any, isArchived?: boolean | null, isFeatured?: boolean | null, store: { __typename: 'Store', id: number, name: string }, category: { __typename: 'Category', id: number, name: string } } | null };

export type AddProdVariationMutationVariables = Exact<{
  product?: InputMaybe<ProductInput>;
}>;


export type AddProdVariationMutation = { __typename?: 'RootMutation', addProductVariations?: { __typename?: 'Product', id: number, name: string, price: any, isArchived?: boolean | null, isFeatured?: boolean | null, description?: string | null, stockCode?: string | null, brand?: { __typename?: 'Brand', id: number, name: string } | null, prodVariations?: Array<{ __typename?: 'ProductVariation', name?: string | null, prodVarOptions?: Array<{ __typename?: 'ProductVariationOption', value?: string | null } | null> | null } | null> | null, prodCombinations?: Array<{ __typename?: 'ProductCombination', price?: any | null, sku?: string | null, combinationString?: string | null, availableStock?: number | null, variantImage?: { __typename?: 'ProductImage', link?: string | null } | null } | null> | null } | null };

export type AddSettingMutationVariables = Exact<{
  setting: SettingInput;
}>;


export type AddSettingMutation = { __typename?: 'RootMutation', addSetting?: { __typename: 'Setting', callBack_url: string, access_token: string, app_id: string, app_secret: string, phone_number_id: string, business_account_id: string, api_version: string, webhook_verification_token: string, phone_number?: string | null } | null };

export type AddStoreMutationVariables = Exact<{
  store: StoreInput;
}>;


export type AddStoreMutation = { __typename?: 'RootMutation', addStore?: { __typename: 'Store', id: number, name: string, createdAt: any, updatedAt: any } | null };

export type AddStripeMutationVariables = Exact<{
  stripe: StripeSettingInput;
}>;


export type AddStripeMutation = { __typename?: 'RootMutation', addStripe?: { __typename?: 'StripeSetting', id: number, callback_url: string, webhook_secret: string, api_key: string } | null };

export type AddTextMessageMutationVariables = Exact<{
  message: TextMessageInput;
  participants?: InputMaybe<ParticipantsInput>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
  template?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddTextMessageMutation = { __typename?: 'RootMutation', addTextMessage?: { __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, hasContext?: boolean | null, timestamp?: any | null, createdAt?: any | null, text?: { __typename: 'TextMessage', body: string } | null, chat?: { __typename: 'Chat', id: number } | null } | null };

export type AddVideoMessageMutationVariables = Exact<{
  message: VideoMessageInput;
  template?: InputMaybe<Scalars['String']['input']>;
  participants?: InputMaybe<ParticipantsInput>;
  customerId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddVideoMessageMutation = { __typename?: 'RootMutation', addVideoMessage?: { __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, timestamp?: any | null, createdAt?: any | null, messageId?: string | null, video?: { __typename: 'VideoMessage', url?: string | null, sha256?: string | null, mimeType?: string | null, videoId?: string | null, caption?: string | null } | null, chat?: { __typename: 'Chat', id: number } | null } | null };

export type CustomerChatSearchQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
}>;


export type CustomerChatSearchQuery = { __typename?: 'RootQuery', customerChatSearch?: { __typename?: 'CusChatSearch', customers?: Array<{ __typename: 'Customer', id: number, first_name?: string | null, last_name?: string | null, phone_number?: string | null } | null> | null, chats?: Array<{ __typename: 'Chat', id: number, customer: { __typename: 'Customer', id: number, first_name?: string | null, last_name?: string | null, phone_number?: string | null }, lastMessage?: { __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, timestamp?: any | null, createdAt?: any | null, text?: { __typename?: 'TextMessage', body: string } | null } | null } | null> | null } | null };

export type CustomerSearchQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
}>;


export type CustomerSearchQuery = { __typename?: 'RootQuery', customerSearch?: Array<{ __typename?: 'Customer', id: number, first_name?: string | null, last_name?: string | null, customerSegment?: string | null, incomeCategory?: string | null, phone_number?: string | null, age?: number | null, gender?: string | null } | null> | null };

export type CustomersSearchQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
}>;


export type CustomersSearchQuery = { __typename?: 'RootQuery', customersSearch?: Array<{ __typename: 'Customer', id: number, first_name?: string | null, last_name?: string | null, phone_number?: string | null } | null> | null };

export type DeleteBillboardMutationVariables = Exact<{
  billboardId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
}>;


export type DeleteBillboardMutation = { __typename?: 'RootMutation', deleteBillboard?: { __typename?: 'Response', response?: string | null } | null };

export type DeleteBrandMutationVariables = Exact<{
  storeId: Scalars['Int']['input'];
  brandId: Scalars['Int']['input'];
}>;


export type DeleteBrandMutation = { __typename?: 'RootMutation', deleteBrand?: { __typename?: 'Response', response?: string | null } | null };

export type DeleteCategoryMutationVariables = Exact<{
  categoryId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'RootMutation', deleteCategory?: { __typename?: 'Response', response?: string | null } | null };

export type DeleteCouponMutationVariables = Exact<{
  promotionId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
}>;


export type DeleteCouponMutation = { __typename?: 'RootMutation', deleteCoupon?: string | null };

export type DeleteDiscountMutationVariables = Exact<{
  promotionId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
}>;


export type DeleteDiscountMutation = { __typename?: 'RootMutation', deleteDiscount?: string | null };

export type DeleteMpesaMutationVariables = Exact<{
  mpesaId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
}>;


export type DeleteMpesaMutation = { __typename?: 'RootMutation', deleteMpesa?: { __typename?: 'Response', response?: string | null } | null };

export type DeleteProductMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'RootMutation', deleteProduct?: { __typename?: 'Response', response?: string | null } | null };

export type DeleteStoreMutationVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type DeleteStoreMutation = { __typename?: 'RootMutation', deleteStore?: { __typename?: 'Response', response?: string | null } | null };

export type DeleteStripeMutationVariables = Exact<{
  stripeId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
}>;


export type DeleteStripeMutation = { __typename?: 'RootMutation', deleteStripe?: { __typename?: 'Response', response?: string | null } | null };

export type GetAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdsQuery = { __typename?: 'RootQuery', ads?: Array<{ __typename: 'Ad', id: number, read?: number | null, delivered?: number | null, sent?: number | null, failed?: number | null, response?: number | null, updatedAt?: any | null, adTemplate: { __typename: 'AdTemplate', id: number, name: string } } | null> | null };

export type GetCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomersQuery = { __typename?: 'RootQuery', customers?: Array<{ __typename?: 'Customer', id: number, whatsapp_name?: string | null, phone_number?: string | null, first_name?: string | null, last_name?: string | null, age?: number | null, gender?: string | null, incomeCategory?: string | null, customerSegment?: string | null, occupation?: string | null, joinDate?: any | null, lastPromoted?: any | null, status?: string | null, createdAt?: any | null, customerLoyalty?: { __typename?: 'Loyalty', pointsBalance?: number | null } | null } | null> | null };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'RootQuery', allProducts?: Array<{ __typename: 'Store', id: number, name: string, products?: Array<{ __typename: 'Product', id: number, name: string, price: any } | null> | null } | null> | null };

export type GetAllStoresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStoresQuery = { __typename?: 'RootQuery', stores?: Array<{ __typename: 'Store', id: number, name: string } | null> | null };

export type GetBillboardQueryVariables = Exact<{
  billboardId: Scalars['Int']['input'];
}>;


export type GetBillboardQuery = { __typename?: 'RootQuery', billboard: { __typename: 'Billboard', id: number, label: string, imageUrl?: string | null, store?: { __typename: 'Store', id: number } | null } };

export type GetBillboardsQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetBillboardsQuery = { __typename?: 'RootQuery', billboards?: Array<{ __typename: 'Billboard', id: number, label: string, updatedAt: any } | null> | null };

export type GetBrandQueryVariables = Exact<{
  brandId: Scalars['Int']['input'];
}>;


export type GetBrandQuery = { __typename?: 'RootQuery', brand?: { __typename: 'Brand', id: number, name: string, joinDate?: any | null, description?: string | null, phoneNumber?: string | null, industry?: string | null, loc_name?: string | null, loc_address?: string | null, loc_latitude?: string | null, loc_longitude?: string | null, loc_url?: string | null, storeId?: number | null } | null };

export type GetBrandsQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetBrandsQuery = { __typename?: 'RootQuery', brands?: Array<{ __typename: 'Brand', id: number, name: string, joinDate?: any | null, description?: string | null, phoneNumber?: string | null, industry?: string | null, loc_name?: string | null, loc_address?: string | null, loc_latitude?: string | null, loc_longitude?: string | null, loc_url?: string | null, storeId?: number | null } | null> | null };

export type GetCategoriesQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetCategoriesQuery = { __typename?: 'RootQuery', categories?: Array<{ __typename: 'Category', id: number, name: string, updatedAt: any, billboard: { __typename: 'Billboard', id: number, label: string } } | null> | null };

export type GetCategoryQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'RootQuery', category: { __typename: 'Category', id: number, name: string, billboard: { __typename: 'Billboard', id: number, label: string, imageUrl?: string | null } } };

export type GetChatQueryVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type GetChatQuery = { __typename?: 'RootQuery', chat?: { __typename?: 'ReturnedChat', conversations?: Array<{ __typename?: 'Conversation', id: number, category?: string | null, status?: string | null, pricingModel?: string | null, expiryDate?: any | null } | null> | null, messages?: Array<{ __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, timestamp?: any | null, messageId?: string | null, status?: string | null, isAd?: boolean | null, hasContext?: boolean | null, createdAt?: any | null, context?: { __typename: 'Message', id: number, type?: string | null, messageId?: string | null, text?: { __typename: 'TextMessage', body: string } | null, video?: { __typename: 'VideoMessage', caption?: string | null, url?: string | null, mimeType?: string | null } | null, image?: { __typename: 'ImageMessage', caption?: string | null, url?: string | null } | null, document?: { __typename: 'DocumentMessage', url?: string | null, caption?: string | null, filename?: string | null } | null, interactive?: { __typename: 'InteractiveMessage', type: string, button?: { __typename: 'InteractiveButton', body?: string | null, product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number } } | null } | null, template?: { __typename: 'InteractiveTemplate', id: number, body?: string | null, tempProduct?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null } | null } | null, text?: { __typename: 'TextMessage', body: string } | null, image?: { __typename: 'ImageMessage', caption?: string | null, url?: string | null } | null, video?: { __typename: 'VideoMessage', caption?: string | null, url?: string | null, mimeType?: string | null } | null, document?: { __typename: 'DocumentMessage', url?: string | null, caption?: string | null, filename?: string | null, mimeType?: string | null } | null, interactive?: { __typename: 'InteractiveMessage', id: number, type: string, button?: { __typename: 'InteractiveButton', id: number, header?: string | null, body?: string | null, footer?: string | null, action?: string | null, btnImageHead?: { __typename: 'ImageHeader', link: string } | null, btnTextHead?: { __typename: 'TextHeader', body?: string | null } | null, buttons?: Array<{ __typename: 'ButtonReplyAction', buttonId: string, title: string } | null> | null, product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null, template?: { __typename: 'InteractiveTemplate', id: number, header?: string | null, body?: string | null, action?: string | null, tempImageHead?: { __typename: 'ImageHeader', link: string } | null, tempTextHead?: { __typename: 'TextHeader', body?: string | null } | null, buttons?: Array<{ __typename: 'TemplateReplyAction', text: string } | null> | null, tempProduct?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null, list?: { __typename: 'InteractiveList', id: number, header?: string | null, body?: string | null, button?: string | null, footer?: string | null, listTextHead?: { __typename: 'TextHeader', body?: string | null } | null, sections?: Array<{ __typename: 'ListSection', title?: string | null, rows?: Array<{ __typename: 'ListRowButton', id: number, buttonId?: string | null, title?: string | null, description?: string | null, product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null> | null } | null> | null } | null } | null, mesListReply?: { __typename: 'ListRepliedAction', id?: number | null, buttonId?: string | null, title?: string | null, description?: string | null, listReply?: { __typename: 'ListRowButton', id: number, product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename?: 'Store', id: number, name: string } } | null } | null } | null, mesBtnReply?: { __typename: 'ButtonRepliedAction', id?: number | null, title?: string | null, buttonId?: string | null, buttonReply?: { __typename: 'InteractiveButton', product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null } | null, mesTempReply?: { __typename: 'TemplateRepliedAction', id?: number | null, text?: string | null, tempReply?: { __typename: 'InteractiveTemplate', tempProduct?: { __typename: 'Product', name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null } | null, messageAd?: { __typename: 'Ad', id: number, read?: number | null, delivered?: number | null, failed?: number | null, sent?: number | null, response?: number | null } | null } | null> | null } | null };

export type GetConversationQueryVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type GetConversationQuery = { __typename?: 'RootQuery', chat?: { __typename?: 'ReturnedChat', conversations?: Array<{ __typename?: 'Conversation', id: number, category?: string | null, status?: string | null, pricingModel?: string | null, expiryDate?: any | null } | null> | null } | null };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'RootQuery', chats?: Array<{ __typename: 'Chat', id: number, status?: string | null, customer: { __typename: 'Customer', id: number, whatsapp_name?: string | null, phone_number?: string | null, first_name?: string | null, last_name?: string | null } } | null> | null };

export type GetCusInChatInfoQueryVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type GetCusInChatInfoQuery = { __typename?: 'RootQuery', chat?: { __typename?: 'ReturnedChat', customer?: { __typename: 'Customer', id: number, first_name?: string | null, last_name?: string | null, phone_number?: string | null } | null } | null };

export type GetCustomerQueryVariables = Exact<{
  customerId: Scalars['Int']['input'];
}>;


export type GetCustomerQuery = { __typename?: 'RootQuery', customer?: { __typename?: 'Customer', id: number, whatsapp_name?: string | null, phone_number?: string | null, first_name?: string | null, last_name?: string | null, age?: number | null, gender?: string | null, incomeCategory?: string | null, customerSegment?: string | null, occupation?: string | null, joinDate?: any | null, lastPromoted?: any | null, status?: string | null, createdAt?: any | null, customerLoyalty?: { __typename?: 'Loyalty', pointsBalance?: number | null } | null } | null };

export type GetCustomer360QueryVariables = Exact<{
  customerId: Scalars['Int']['input'];
}>;


export type GetCustomer360Query = { __typename?: 'RootQuery', customer360?: { __typename: 'Customer', id: number, whatsapp_name?: string | null, first_name?: string | null, last_name?: string | null, phone_number?: string | null, createdAt?: any | null, customerOrder?: Array<{ __typename: 'Order', orderID?: string | null, id: number, isPaid: boolean, phone: string, address: string, status: string, updatedAt?: any | null, orderItems: Array<{ __typename?: 'OrderItem', id: number, price: any, quantity: number, orderProduct: { __typename?: 'Product', id: number, name: string } } | null>, storeOrder?: { __typename: 'Store', id: number, name: string } | null } | null> | null } | null };

export type GetCustomerInfoQueryVariables = Exact<{
  customerId: Scalars['Int']['input'];
}>;


export type GetCustomerInfoQuery = { __typename?: 'RootQuery', customer?: { __typename: 'Customer', id: number, whatsapp_name?: string | null, first_name?: string | null, last_name?: string | null, phone_number?: string | null, createdAt?: any | null } | null };

export type LastMessageQueryVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type LastMessageQuery = { __typename?: 'RootQuery', lastMessage?: { __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, timestamp?: any | null, createdAt?: any | null, status?: string | null, text?: { __typename: 'TextMessage', body: string } | null, image?: { __typename: 'ImageMessage', caption?: string | null } | null, document?: { __typename: 'DocumentMessage', filename?: string | null } | null, video?: { __typename: 'VideoMessage', caption?: string | null } | null, interactive?: { __typename: 'InteractiveMessage', type: string, button?: { __typename: 'InteractiveButton', body?: string | null, footer?: string | null } | null, list?: { __typename: 'InteractiveList', body?: string | null, button?: string | null, footer?: string | null } | null, template?: { __typename: 'InteractiveTemplate', body?: string | null } | null } | null, mesListReply?: { __typename: 'ListRepliedAction', title?: string | null, description?: string | null, listReply?: { __typename: 'ListRowButton', product?: { __typename: 'Product', name: string, price: any } | null } | null } | null, mesBtnReply?: { __typename: 'ButtonRepliedAction', title?: string | null, buttonReply?: { __typename: 'InteractiveButton', product?: { __typename?: 'Product', name: string, price: any } | null } | null } | null, mesTempReply?: { __typename: 'TemplateRepliedAction', text?: string | null, tempReply?: { __typename: 'InteractiveTemplate', tempProduct?: { __typename: 'Product', name: string, price: any } | null } | null } | null } | null };

export type GetCurrentMerchantQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentMerchantQuery = { __typename?: 'RootQuery', currentMerchant?: { __typename: 'Merchant', id?: number | null, business_name?: string | null, username: string } | null };

export type GetMpesaQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetMpesaQuery = { __typename?: 'RootQuery', mpesa?: { __typename?: 'MpesaSetting', id?: number | null, consumer_key: string, consumer_secret: string, pass_key: string, business_shortcode: string, account_reference: string, transaction_desc: string, callback_url?: string | null } | null };

export type GetOrdersQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetOrdersQuery = { __typename?: 'RootQuery', orders: Array<{ __typename?: 'Order', id: number, phone: string, isPaid: boolean, address: string, orderID?: string | null, createdAt?: any | null, customerOrder?: { __typename?: 'Customer', first_name?: string | null, last_name?: string | null } | null, orderItems: Array<{ __typename?: 'OrderItem', id: number, price: any, quantity: number, orderProduct: { __typename?: 'Product', id: number, name: string, brand?: { __typename?: 'Brand', id: number, name: string } | null, category: { __typename?: 'Category', name: string } } } | null> } | null> };

export type GetProductQueryVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type GetProductQuery = { __typename?: 'RootQuery', product: { __typename: 'Product', id: number, name: string, price: any, isArchived?: boolean | null, isFeatured?: boolean | null, stockCode?: string | null, description?: string | null, brand?: { __typename?: 'Brand', id: number, name: string } | null, images: Array<{ __typename: 'Image', id: number, url: string } | null>, store: { __typename: 'Store', id: number, name: string }, category: { __typename: 'Category', id: number, name: string }, prodVariations?: Array<{ __typename?: 'ProductVariation', name?: string | null, prodVarOptions?: Array<{ __typename?: 'ProductVariationOption', value?: string | null } | null> | null } | null> | null, prodCombinations?: Array<{ __typename?: 'ProductCombination', price?: any | null, sku?: string | null, combinationString?: string | null, availableStock?: number | null, variantImage?: { __typename?: 'ProductImage', link?: string | null } | null } | null> | null } };

export type GetProductsQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
  categoryId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductsQuery = { __typename?: 'RootQuery', products?: Array<{ __typename: 'Product', id: number, name: string, price: any, isArchived?: boolean | null, isFeatured?: boolean | null, updatedAt?: any | null, description?: string | null, stockCode?: string | null, brand?: { __typename?: 'Brand', id: number, name: string } | null, images: Array<{ __typename: 'Image', id: number, url: string } | null>, store: { __typename: 'Store', id: number, name: string }, category: { __typename: 'Category', id: number, name: string } } | null> | null };

export type GetProductsOfIdsQueryVariables = Exact<{
  productsIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductsOfIdsQuery = { __typename?: 'RootQuery', productsIds: Array<{ __typename?: 'Product', id: number, name: string, price: any } | null> };

export type GetProductsOnlyQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetProductsOnlyQuery = { __typename?: 'RootQuery', products?: Array<{ __typename: 'Product', id: number, name: string, price: any, isFeatured?: boolean | null, updatedAt?: any | null } | null> | null };

export type GetPromotionsQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetPromotionsQuery = { __typename?: 'RootQuery', promotions?: Array<{ __typename: 'Promotion', id?: number | null, name: PromotionType, startDate?: any | null, endDate?: any | null, description?: string | null, discountType?: DiscountType | null, active?: boolean | null, discountValue?: any | null, createdAt?: any | null, coupon?: { __typename: 'Coupon', id?: number | null, code?: string | null, validFrom?: any | null, validTo?: any | null, discount?: any | null, active?: boolean | null, createdAt?: any | null } | null } | null> | null };

export type GetSettingQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetSettingQuery = { __typename?: 'RootQuery', setting?: { __typename: 'Setting', callBack_url: string, app_id: string, phone_number_id: string, business_account_id: string, access_token: string, app_secret: string, api_version: string, webhook_verification_token: string, phone_number?: string | null } | null };

export type GetStoreQueryVariables = Exact<{
  storeId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetStoreQuery = { __typename?: 'RootQuery', store?: { __typename: 'Store', id: number, name: string } | null };

export type GetStripeQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetStripeQuery = { __typename?: 'RootQuery', stripe?: { __typename?: 'StripeSetting', id: number, api_key: string, webhook_secret: string, callback_url: string } | null };

export type GetTempMarketResponseQueryVariables = Exact<{
  adTemplateId: Scalars['Int']['input'];
}>;


export type GetTempMarketResponseQuery = { __typename?: 'RootQuery', tempMarketResponse?: { __typename?: 'AdTemplate', id: number, name: string, leads?: number | null, adTempProduct?: { __typename?: 'Product', id: number, name: string, price: any, images: Array<{ __typename?: 'Image', id: number, url: string } | null>, store: { __typename?: 'Store', id: number, name: string } } | null, adTempMessage?: { __typename?: 'Message', id: number, interactive?: { __typename?: 'InteractiveMessage', template?: { __typename?: 'InteractiveTemplate', buttons?: Array<{ __typename?: 'TemplateReplyAction', text: string } | null> | null } | null } | null } | null, adTempResponses?: Array<{ __typename?: 'MarketingResponse', id: number, cusTempLead?: { __typename?: 'Customer', id: number, phone_number?: string | null, first_name?: string | null, last_name?: string | null } | null, mesTempLead?: { __typename?: 'Message', id: number, createdAt?: any | null, chat?: { __typename?: 'Chat', id: number } | null, mesTempReply?: { __typename?: 'TemplateRepliedAction', text?: string | null } | null } | null } | null> | null } | null };

export type LoginMerchantMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMerchantMutation = { __typename?: 'RootMutation', loginMerchant?: { __typename: 'Auth', token?: string | null, merchant?: { __typename: 'Merchant', id?: number | null } | null } | null };

export type ProductSearchQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
  storeId: Scalars['Int']['input'];
}>;


export type ProductSearchQuery = { __typename?: 'RootQuery', productSearch?: Array<{ __typename?: 'Product', id: number, name: string, description?: string | null, price: any, category: { __typename?: 'Category', name: string }, images: Array<{ __typename?: 'Image', url: string } | null> } | null> | null };

export type SignupMerchantMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  whatsapp_phone_number: Scalars['String']['input'];
}>;


export type SignupMerchantMutation = { __typename?: 'RootMutation', signupMerchant?: { __typename: 'Auth', token?: string | null, merchant?: { __typename: 'Merchant', id?: number | null } | null } | null };

export type ChatAddedSubscriptionVariables = Exact<{
  merchantId: Scalars['Int']['input'];
}>;


export type ChatAddedSubscription = { __typename?: 'RootSubscription', chatAdded?: { __typename?: 'Chat', id: number, customer: { __typename?: 'Customer', id: number, first_name?: string | null, last_name?: string | null, phone_number?: string | null, whatsapp_name?: string | null }, messages: Array<{ __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, timestamp?: any | null, messageId?: string | null, status?: string | null, isAd?: boolean | null, hasContext?: boolean | null, createdAt?: any | null, context?: { __typename: 'Message', id: number, type?: string | null, messageId?: string | null, text?: { __typename: 'TextMessage', body: string } | null, video?: { __typename: 'VideoMessage', caption?: string | null, url?: string | null, mimeType?: string | null } | null, image?: { __typename: 'ImageMessage', caption?: string | null, url?: string | null } | null, document?: { __typename: 'DocumentMessage', url?: string | null, caption?: string | null, filename?: string | null } | null, interactive?: { __typename: 'InteractiveMessage', type: string, button?: { __typename: 'InteractiveButton', body?: string | null, product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number } } | null } | null, template?: { __typename: 'InteractiveTemplate', id: number, body?: string | null, tempProduct?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null } | null } | null, text?: { __typename: 'TextMessage', body: string } | null, image?: { __typename: 'ImageMessage', caption?: string | null, url?: string | null } | null, video?: { __typename: 'VideoMessage', caption?: string | null, url?: string | null, mimeType?: string | null } | null, document?: { __typename: 'DocumentMessage', url?: string | null, caption?: string | null, filename?: string | null, mimeType?: string | null } | null, interactive?: { __typename: 'InteractiveMessage', id: number, type: string, button?: { __typename: 'InteractiveButton', id: number, header?: string | null, body?: string | null, footer?: string | null, action?: string | null, btnImageHead?: { __typename: 'ImageHeader', link: string } | null, btnTextHead?: { __typename: 'TextHeader', body?: string | null } | null, buttons?: Array<{ __typename: 'ButtonReplyAction', buttonId: string, title: string } | null> | null, product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null, template?: { __typename: 'InteractiveTemplate', id: number, header?: string | null, body?: string | null, action?: string | null, tempImageHead?: { __typename: 'ImageHeader', link: string } | null, tempTextHead?: { __typename: 'TextHeader', body?: string | null } | null, buttons?: Array<{ __typename: 'TemplateReplyAction', text: string } | null> | null, tempProduct?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null, list?: { __typename: 'InteractiveList', id: number, header?: string | null, body?: string | null, button?: string | null, footer?: string | null, listTextHead?: { __typename: 'TextHeader', body?: string | null } | null, sections?: Array<{ __typename: 'ListSection', title?: string | null, rows?: Array<{ __typename: 'ListRowButton', id: number, buttonId?: string | null, title?: string | null, description?: string | null, product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null> | null } | null> | null } | null } | null, mesListReply?: { __typename: 'ListRepliedAction', id?: number | null, buttonId?: string | null, title?: string | null, description?: string | null, listReply?: { __typename: 'ListRowButton', id: number, product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename?: 'Store', id: number, name: string } } | null } | null } | null, mesBtnReply?: { __typename: 'ButtonRepliedAction', id?: number | null, title?: string | null, buttonId?: string | null, buttonReply?: { __typename: 'InteractiveButton', product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null } | null, mesTempReply?: { __typename: 'TemplateRepliedAction', id?: number | null, text?: string | null, tempReply?: { __typename: 'InteractiveTemplate', tempProduct?: { __typename: 'Product', name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null } | null, messageAd?: { __typename: 'Ad', id: number, read?: number | null, delivered?: number | null, failed?: number | null, sent?: number | null } | null } | null> } | null };

export type MessageAddedSubscriptionVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type MessageAddedSubscription = { __typename?: 'RootSubscription', messageAdded?: { __typename?: 'ChatUpdated', message?: { __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, timestamp?: any | null, messageId?: string | null, status?: string | null, isAd?: boolean | null, hasContext?: boolean | null, createdAt?: any | null, context?: { __typename: 'Message', id: number, type?: string | null, messageId?: string | null, text?: { __typename: 'TextMessage', body: string } | null, video?: { __typename: 'VideoMessage', caption?: string | null, url?: string | null, mimeType?: string | null } | null, image?: { __typename: 'ImageMessage', caption?: string | null, url?: string | null } | null, document?: { __typename: 'DocumentMessage', url?: string | null, caption?: string | null, filename?: string | null } | null, interactive?: { __typename: 'InteractiveMessage', type: string, button?: { __typename: 'InteractiveButton', body?: string | null, product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number } } | null } | null, template?: { __typename: 'InteractiveTemplate', id: number, body?: string | null, tempProduct?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null } | null } | null, text?: { __typename: 'TextMessage', body: string } | null, image?: { __typename: 'ImageMessage', caption?: string | null, url?: string | null } | null, video?: { __typename: 'VideoMessage', caption?: string | null, url?: string | null, mimeType?: string | null } | null, document?: { __typename: 'DocumentMessage', url?: string | null, caption?: string | null, filename?: string | null, mimeType?: string | null } | null, interactive?: { __typename: 'InteractiveMessage', id: number, type: string, button?: { __typename: 'InteractiveButton', id: number, header?: string | null, body?: string | null, footer?: string | null, action?: string | null, btnImageHead?: { __typename: 'ImageHeader', link: string } | null, btnTextHead?: { __typename: 'TextHeader', body?: string | null } | null, buttons?: Array<{ __typename: 'ButtonReplyAction', buttonId: string, title: string } | null> | null, product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null, template?: { __typename: 'InteractiveTemplate', id: number, header?: string | null, body?: string | null, action?: string | null, tempImageHead?: { __typename: 'ImageHeader', link: string } | null, tempTextHead?: { __typename: 'TextHeader', body?: string | null } | null, buttons?: Array<{ __typename: 'TemplateReplyAction', text: string } | null> | null, tempProduct?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null, list?: { __typename: 'InteractiveList', id: number, header?: string | null, body?: string | null, button?: string | null, footer?: string | null, listTextHead?: { __typename: 'TextHeader', body?: string | null } | null, sections?: Array<{ __typename: 'ListSection', title?: string | null, rows?: Array<{ __typename: 'ListRowButton', id: number, buttonId?: string | null, title?: string | null, description?: string | null, product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null> | null } | null> | null } | null } | null, mesListReply?: { __typename: 'ListRepliedAction', id?: number | null, buttonId?: string | null, title?: string | null, description?: string | null, listReply?: { __typename: 'ListRowButton', id: number, product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename?: 'Store', id: number, name: string } } | null } | null } | null, mesBtnReply?: { __typename: 'ButtonRepliedAction', id?: number | null, title?: string | null, buttonId?: string | null, buttonReply?: { __typename: 'InteractiveButton', product?: { __typename: 'Product', id: number, name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null } | null, mesTempReply?: { __typename: 'TemplateRepliedAction', id?: number | null, text?: string | null, tempReply?: { __typename: 'InteractiveTemplate', tempProduct?: { __typename: 'Product', name: string, price: any, store: { __typename: 'Store', id: number, name: string } } | null } | null } | null, messageAd?: { __typename: 'Ad', id: number, read?: number | null, delivered?: number | null, failed?: number | null, sent?: number | null } | null } | null } | null };

export type UpdateBillboardMutationVariables = Exact<{
  billboardId: Scalars['Int']['input'];
  payload: BillboardInput;
}>;


export type UpdateBillboardMutation = { __typename?: 'RootMutation', updateBillboard?: { __typename: 'Billboard', id: number, label: string, imageUrl?: string | null, store?: { __typename: 'Store', id: number } | null } | null };

export type UpdateBrandMutationVariables = Exact<{
  payload: BrandInput;
  brandId: Scalars['Int']['input'];
}>;


export type UpdateBrandMutation = { __typename?: 'RootMutation', updateBrand?: { __typename: 'Brand', id: number, name: string, joinDate?: any | null, description?: string | null, phoneNumber?: string | null, industry?: string | null, loc_name?: string | null, loc_address?: string | null, loc_latitude?: string | null, loc_longitude?: string | null, loc_url?: string | null, storeId?: number | null } | null };

export type UpdateCategoryMutationVariables = Exact<{
  categoryId: Scalars['Int']['input'];
  payload: CategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'RootMutation', updateCategory?: { __typename: 'Category', id: number, name: string, billboard: { __typename: 'Billboard', id: number }, store: { __typename: 'Store', id: number } } | null };

export type UpdateCouponMutationVariables = Exact<{
  promotionId: Scalars['Int']['input'];
  payload?: InputMaybe<CouponPromInput>;
}>;


export type UpdateCouponMutation = { __typename?: 'RootMutation', updateCoupon?: { __typename: 'Promotion', id?: number | null, name: PromotionType, description?: string | null, discountType?: DiscountType | null, coupon?: { __typename: 'Coupon', id?: number | null, validFrom?: any | null, validTo?: any | null, discount?: any | null, active?: boolean | null, createdAt?: any | null, updatedAt?: any | null } | null } | null };

export type UpdateCustomerMutationVariables = Exact<{
  customerId: Scalars['Int']['input'];
  payload: CustomerInput;
}>;


export type UpdateCustomerMutation = { __typename?: 'RootMutation', updateCustomer?: { __typename: 'Customer', id: number, whatsapp_name?: string | null, first_name?: string | null, last_name?: string | null, phone_number?: string | null } | null };

export type UpdateDiscountMutationVariables = Exact<{
  promotionId: Scalars['Int']['input'];
  payload?: InputMaybe<DiscountPromInput>;
}>;


export type UpdateDiscountMutation = { __typename?: 'RootMutation', updateDiscount?: { __typename: 'Promotion', id?: number | null, name: PromotionType, startDate?: any | null, endDate?: any | null, description?: string | null, discountType?: DiscountType | null, active?: boolean | null, discountValue?: any | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type UpdateMessageStatusMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  messageId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateMessageStatusMutation = { __typename?: 'RootMutation', updateMessageStatus?: { __typename: 'Message', id: number, from_customer?: boolean | null, type?: string | null, timestamp?: any | null, status?: string | null, messageId?: string | null, createdAt?: any | null, text?: { __typename: 'TextMessage', body: string } | null, image?: { __typename: 'ImageMessage', caption?: string | null, url?: string | null } | null } | null };

export type UpdateMpesaMutationVariables = Exact<{
  mpesaId: Scalars['Int']['input'];
  payload: MpesaSettingInput;
}>;


export type UpdateMpesaMutation = { __typename?: 'RootMutation', updateMpesa?: { __typename?: 'MpesaSetting', id?: number | null, consumer_key: string, consumer_secret: string, pass_key: string, business_shortcode: string, account_reference: string, transaction_desc: string } | null };

export type UpdateOrderCheckoutMutationVariables = Exact<{
  orderId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
  payload: OrderCheckoutInput;
}>;


export type UpdateOrderCheckoutMutation = { __typename?: 'RootMutation', updateOrderCheckout?: { __typename?: 'Order', id: number, isPaid: boolean, phone: string, storeOrder?: { __typename?: 'Store', id: number, name: string } | null, customerOrder?: { __typename?: 'Customer', id: number, phone_number?: string | null } | null, orderItems: Array<{ __typename?: 'OrderItem', id: number, productId?: number | null, quantity: number } | null> } | null };

export type UpdateProductMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
  payload: ProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'RootMutation', updateProduct?: { __typename: 'Product', id: number, name: string, price: any, isArchived?: boolean | null, isFeatured?: boolean | null, brand?: { __typename?: 'Brand', id: number, name: string } | null, store: { __typename: 'Store', id: number, name: string }, category: { __typename: 'Category', id: number, name: string } } | null };

export type UpdateStoreMutationVariables = Exact<{
  storeId: Scalars['Int']['input'];
  payload: StoreInput;
}>;


export type UpdateStoreMutation = { __typename?: 'RootMutation', updateStore?: { __typename: 'Store', id: number, name: string } | null };

export type UpdateStripeMutationVariables = Exact<{
  stripeId: Scalars['Int']['input'];
  payload: StripeSettingInput;
}>;


export type UpdateStripeMutation = { __typename?: 'RootMutation', updateStripe?: { __typename?: 'StripeSetting', id: number, api_key: string, callback_url: string, webhook_secret: string } | null };


export const AddBillboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addBillboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"billboard"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BillboardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBillboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"billboard"},"value":{"kind":"Variable","name":{"kind":"Name","value":"billboard"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddBillboardMutation, AddBillboardMutationVariables>;
export const AddBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brand"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BrandInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"brand"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brand"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"joinDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"industry"}},{"kind":"Field","name":{"kind":"Name","value":"loc_name"}},{"kind":"Field","name":{"kind":"Name","value":"loc_address"}},{"kind":"Field","name":{"kind":"Name","value":"loc_latitude"}},{"kind":"Field","name":{"kind":"Name","value":"loc_longitude"}},{"kind":"Field","name":{"kind":"Name","value":"loc_url"}},{"kind":"Field","name":{"kind":"Name","value":"storeId"}}]}}]}}]} as unknown as DocumentNode<AddBrandMutation, AddBrandMutationVariables>;
export const AddTemplateCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTemplateCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"selectedCustomers"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"template"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InteractiveMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTemplateMesBulk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"template"},"value":{"kind":"Variable","name":{"kind":"Name","value":"template"}}},{"kind":"Argument","name":{"kind":"Name","value":"selectedCustomers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"selectedCustomers"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<AddTemplateCampaignMutation, AddTemplateCampaignMutationVariables>;
export const AddBulkTemplateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addBulkTemplateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"schedule"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBulkTemplateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"schedule"},"value":{"kind":"Variable","name":{"kind":"Name","value":"schedule"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"bulkTempTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customers"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"template"}}]}}]}}]}}]} as unknown as DocumentNode<AddBulkTemplateTaskMutation, AddBulkTemplateTaskMutationVariables>;
export const AddButtonRepliedMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddButtonRepliedMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ButtonRepliedInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participants"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ParticipantsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contextMessage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContextMessageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addButtonRepliedMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"participants"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participants"}}},{"kind":"Argument","name":{"kind":"Name","value":"contextMessage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contextMessage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"mesBtnReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buttonReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"btnImageHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"buttons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddButtonRepliedMessageMutation, AddButtonRepliedMessageMutationVariables>;
export const AddCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"billboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddCategoryMutation, AddCategoryMutationVariables>;
export const AddCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"promotion"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CouponPromInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"promotion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"promotion"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"coupon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"validFrom"}},{"kind":"Field","name":{"kind":"Name","value":"validTo"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<AddCouponMutation, AddCouponMutationVariables>;
export const AddCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customer"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp_name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<AddCustomerMutation, AddCustomerMutationVariables>;
export const AddDiscountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddDiscount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DiscountPromInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addDiscount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"discount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AddDiscountMutation, AddDiscountMutationVariables>;
export const AddDocumentMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddDocumentMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentMessageInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"template"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participants"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ParticipantsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addDocumentMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"template"},"value":{"kind":"Variable","name":{"kind":"Name","value":"template"}}},{"kind":"Argument","name":{"kind":"Name","value":"participants"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participants"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"sha256"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddDocumentMessageMutation, AddDocumentMessageMutationVariables>;
export const AddImageMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddImageMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImageMessageInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"template"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addImageMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"template"},"value":{"kind":"Variable","name":{"kind":"Name","value":"template"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddImageMessageMutation, AddImageMessageMutationVariables>;
export const AddInteractiveButtonMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddInteractiveButtonMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InteractiveMessageInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"template"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participants"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ParticipantsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addInteractiveButtonMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"template"},"value":{"kind":"Variable","name":{"kind":"Name","value":"template"}}},{"kind":"Argument","name":{"kind":"Name","value":"participants"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participants"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"interactive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"button"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"btnImageHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"btnTextHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"footer"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"buttons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddInteractiveButtonMessageMutation, AddInteractiveButtonMessageMutationVariables>;
export const AddInteractiveListMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddInteractiveListMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InteractiveMessageInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"template"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participants"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ParticipantsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addInteractiveListMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"template"},"value":{"kind":"Variable","name":{"kind":"Name","value":"template"}}},{"kind":"Argument","name":{"kind":"Name","value":"participants"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participants"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"interactive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"listTextHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"button"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddInteractiveListMessageMutation, AddInteractiveListMessageMutationVariables>;
export const AddInteractiveTemplateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddInteractiveTemplateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InteractiveMessageInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"template"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participants"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ParticipantsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addInteractiveTemplateMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"template"},"value":{"kind":"Variable","name":{"kind":"Name","value":"template"}}},{"kind":"Argument","name":{"kind":"Name","value":"participants"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participants"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"interactive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"tempImageHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"tempProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"buttons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddInteractiveTemplateMessageMutation, AddInteractiveTemplateMessageMutationVariables>;
export const AddMpesaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMpesa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mpesa"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MpesaSettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMpesa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mpesa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mpesa"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"consumer_key"}},{"kind":"Field","name":{"kind":"Name","value":"consumer_secret"}},{"kind":"Field","name":{"kind":"Name","value":"pass_key"}},{"kind":"Field","name":{"kind":"Name","value":"business_shortcode"}},{"kind":"Field","name":{"kind":"Name","value":"account_reference"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_desc"}}]}}]}}]} as unknown as DocumentNode<AddMpesaMutation, AddMpesaMutationVariables>;
export const AddOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPaid"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"orderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddOrderMutation, AddOrderMutationVariables>;
export const AddProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"product"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isArchived"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AddProductMutation, AddProductMutationVariables>;
export const AddProdVariationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddProdVariation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addProductVariations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"product"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isArchived"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"stockCode"}},{"kind":"Field","name":{"kind":"Name","value":"prodVariations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prodVarOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"prodCombinations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"combinationString"}},{"kind":"Field","name":{"kind":"Name","value":"availableStock"}},{"kind":"Field","name":{"kind":"Name","value":"variantImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddProdVariationMutation, AddProdVariationMutationVariables>;
export const AddSettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addSetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"setting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setting"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"callBack_url"}},{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"app_id"}},{"kind":"Field","name":{"kind":"Name","value":"app_secret"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number_id"}},{"kind":"Field","name":{"kind":"Name","value":"business_account_id"}},{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"api_version"}},{"kind":"Field","name":{"kind":"Name","value":"webhook_verification_token"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}}]}}]}}]} as unknown as DocumentNode<AddSettingMutation, AddSettingMutationVariables>;
export const AddStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"store"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StoreInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addStore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"store"},"value":{"kind":"Variable","name":{"kind":"Name","value":"store"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AddStoreMutation, AddStoreMutationVariables>;
export const AddStripeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddStripe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stripe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StripeSettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addStripe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stripe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stripe"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"callback_url"}},{"kind":"Field","name":{"kind":"Name","value":"webhook_secret"}},{"kind":"Field","name":{"kind":"Name","value":"api_key"}}]}}]}}]} as unknown as DocumentNode<AddStripeMutation, AddStripeMutationVariables>;
export const AddTextMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTextMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessageInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participants"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ParticipantsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"template"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTextMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"participants"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participants"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"template"},"value":{"kind":"Variable","name":{"kind":"Name","value":"template"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hasContext"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddTextMessageMutation, AddTextMessageMutationVariables>;
export const AddVideoMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddVideoMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoMessageInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"template"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participants"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ParticipantsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addVideoMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"template"},"value":{"kind":"Variable","name":{"kind":"Name","value":"template"}}},{"kind":"Argument","name":{"kind":"Name","value":"participants"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participants"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"sha256"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"videoId"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddVideoMessageMutation, AddVideoMessageMutationVariables>;
export const CustomerChatSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerChatSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerChatSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CustomerChatSearchQuery, CustomerChatSearchQueryVariables>;
export const CustomerSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"customerSegment"}},{"kind":"Field","name":{"kind":"Name","value":"incomeCategory"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]}}]} as unknown as DocumentNode<CustomerSearchQuery, CustomerSearchQueryVariables>;
export const CustomersSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomersSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customersSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}}]}}]}}]} as unknown as DocumentNode<CustomersSearchQuery, CustomersSearchQueryVariables>;
export const DeleteBillboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBillboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"billboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBillboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"billboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"billboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteBillboardMutation, DeleteBillboardMutationVariables>;
export const DeleteBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brandId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"brandId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brandId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteBrandMutation, DeleteBrandMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const DeleteCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"promotionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"promotionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"promotionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}]}]}}]} as unknown as DocumentNode<DeleteCouponMutation, DeleteCouponMutationVariables>;
export const DeleteDiscountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDiscount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"promotionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDiscount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"promotionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"promotionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}]}]}}]} as unknown as DocumentNode<DeleteDiscountMutation, DeleteDiscountMutationVariables>;
export const DeleteMpesaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMpesa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mpesaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMpesa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mpesaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mpesaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteMpesaMutation, DeleteMpesaMutationVariables>;
export const DeleteProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteProductMutation, DeleteProductMutationVariables>;
export const DeleteStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteStoreMutation, DeleteStoreMutationVariables>;
export const DeleteStripeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStripe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stripeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStripe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stripeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stripeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteStripeMutation, DeleteStripeMutationVariables>;
export const GetAdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"delivered"}},{"kind":"Field","name":{"kind":"Name","value":"sent"}},{"kind":"Field","name":{"kind":"Name","value":"failed"}},{"kind":"Field","name":{"kind":"Name","value":"response"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"adTemplate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAdsQuery, GetAdsQueryVariables>;
export const GetCustomersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"incomeCategory"}},{"kind":"Field","name":{"kind":"Name","value":"customerSegment"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"joinDate"}},{"kind":"Field","name":{"kind":"Name","value":"lastPromoted"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"customerLoyalty"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pointsBalance"}}]}}]}}]}}]} as unknown as DocumentNode<GetCustomersQuery, GetCustomersQueryVariables>;
export const GetAllProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllProductsQuery, GetAllProductsQueryVariables>;
export const GetAllStoresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllStores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllStoresQuery, GetAllStoresQueryVariables>;
export const GetBillboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBillboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"billboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"billboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"billboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"billboardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetBillboardQuery, GetBillboardQueryVariables>;
export const GetBillboardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBillboards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"billboards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetBillboardsQuery, GetBillboardsQueryVariables>;
export const GetBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brandId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"brandId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brandId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"joinDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"industry"}},{"kind":"Field","name":{"kind":"Name","value":"loc_name"}},{"kind":"Field","name":{"kind":"Name","value":"loc_address"}},{"kind":"Field","name":{"kind":"Name","value":"loc_latitude"}},{"kind":"Field","name":{"kind":"Name","value":"loc_longitude"}},{"kind":"Field","name":{"kind":"Name","value":"loc_url"}},{"kind":"Field","name":{"kind":"Name","value":"storeId"}}]}}]}}]} as unknown as DocumentNode<GetBrandQuery, GetBrandQueryVariables>;
export const GetBrandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBrands"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brands"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"joinDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"industry"}},{"kind":"Field","name":{"kind":"Name","value":"loc_name"}},{"kind":"Field","name":{"kind":"Name","value":"loc_address"}},{"kind":"Field","name":{"kind":"Name","value":"loc_latitude"}},{"kind":"Field","name":{"kind":"Name","value":"loc_longitude"}},{"kind":"Field","name":{"kind":"Name","value":"loc_url"}},{"kind":"Field","name":{"kind":"Name","value":"storeId"}}]}}]}}]} as unknown as DocumentNode<GetBrandsQuery, GetBrandsQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"billboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"billboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"pricingModel"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isAd"}},{"kind":"Field","name":{"kind":"Name","value":"hasContext"}},{"kind":"Field","name":{"kind":"Name","value":"context"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interactive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"button"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"tempProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interactive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"button"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"btnImageHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"btnTextHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"footer"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"buttons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"tempImageHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempTextHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"buttons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"listTextHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"button"}},{"kind":"Field","name":{"kind":"Name","value":"footer"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesListReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"listReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesBtnReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"buttonReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesTempReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"tempReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"tempProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"messageAd"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"delivered"}},{"kind":"Field","name":{"kind":"Name","value":"failed"}},{"kind":"Field","name":{"kind":"Name","value":"sent"}},{"kind":"Field","name":{"kind":"Name","value":"response"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetChatQuery, GetChatQueryVariables>;
export const GetConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"pricingModel"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDate"}}]}}]}}]}}]} as unknown as DocumentNode<GetConversationQuery, GetConversationQueryVariables>;
export const GetChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetChatsQuery, GetChatsQueryVariables>;
export const GetCusInChatInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCusInChatInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}}]}}]}}]}}]} as unknown as DocumentNode<GetCusInChatInfoQuery, GetCusInChatInfoQueryVariables>;
export const GetCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"incomeCategory"}},{"kind":"Field","name":{"kind":"Name","value":"customerSegment"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"joinDate"}},{"kind":"Field","name":{"kind":"Name","value":"lastPromoted"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"customerLoyalty"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pointsBalance"}}]}}]}}]}}]} as unknown as DocumentNode<GetCustomerQuery, GetCustomerQueryVariables>;
export const GetCustomer360Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomer360"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer360"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp_name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"customerOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"orderID"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPaid"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"orderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"orderProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"storeOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<GetCustomer360Query, GetCustomer360QueryVariables>;
export const GetCustomerInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomerInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp_name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<GetCustomerInfoQuery, GetCustomerInfoQueryVariables>;
export const LastMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LastMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interactive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"button"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"footer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"button"}},{"kind":"Field","name":{"kind":"Name","value":"footer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesListReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"listReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesBtnReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"buttonReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesTempReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"tempReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"tempProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LastMessageQuery, LastMessageQueryVariables>;
export const GetCurrentMerchantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentMerchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentMerchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"business_name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<GetCurrentMerchantQuery, GetCurrentMerchantQueryVariables>;
export const GetMpesaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMpesa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mpesa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"consumer_key"}},{"kind":"Field","name":{"kind":"Name","value":"consumer_secret"}},{"kind":"Field","name":{"kind":"Name","value":"pass_key"}},{"kind":"Field","name":{"kind":"Name","value":"business_shortcode"}},{"kind":"Field","name":{"kind":"Name","value":"account_reference"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_desc"}},{"kind":"Field","name":{"kind":"Name","value":"callback_url"}}]}}]}}]} as unknown as DocumentNode<GetMpesaQuery, GetMpesaQueryVariables>;
export const GetOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isPaid"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"orderID"}},{"kind":"Field","name":{"kind":"Name","value":"customerOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"orderProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isArchived"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"stockCode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prodVariations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prodVarOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"prodCombinations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"combinationString"}},{"kind":"Field","name":{"kind":"Name","value":"availableStock"}},{"kind":"Field","name":{"kind":"Name","value":"variantImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isArchived"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"stockCode"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductsOfIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductsOfIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productsIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productsIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productsIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<GetProductsOfIdsQuery, GetProductsOfIdsQueryVariables>;
export const GetProductsOnlyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductsOnly"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetProductsOnlyQuery, GetProductsOnlyQueryVariables>;
export const GetPromotionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPromotions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"promotions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"coupon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"validFrom"}},{"kind":"Field","name":{"kind":"Name","value":"validTo"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetPromotionsQuery, GetPromotionsQueryVariables>;
export const GetSettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"callBack_url"}},{"kind":"Field","name":{"kind":"Name","value":"app_id"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number_id"}},{"kind":"Field","name":{"kind":"Name","value":"business_account_id"}},{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"app_secret"}},{"kind":"Field","name":{"kind":"Name","value":"api_version"}},{"kind":"Field","name":{"kind":"Name","value":"webhook_verification_token"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}}]}}]}}]} as unknown as DocumentNode<GetSettingQuery, GetSettingQueryVariables>;
export const GetStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"store"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetStoreQuery, GetStoreQueryVariables>;
export const GetStripeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStripe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stripe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"api_key"}},{"kind":"Field","name":{"kind":"Name","value":"webhook_secret"}},{"kind":"Field","name":{"kind":"Name","value":"callback_url"}}]}}]}}]} as unknown as DocumentNode<GetStripeQuery, GetStripeQueryVariables>;
export const GetTempMarketResponseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTempMarketResponse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"adTemplateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tempMarketResponse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"adTemplateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"adTemplateId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"leads"}},{"kind":"Field","name":{"kind":"Name","value":"adTempProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"adTempMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"interactive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buttons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"adTempResponses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cusTempLead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesTempLead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesTempReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetTempMarketResponseQuery, GetTempMarketResponseQueryVariables>;
export const LoginMerchantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"loginMerchant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginMerchant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"merchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMerchantMutation, LoginMerchantMutationVariables>;
export const ProductSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<ProductSearchQuery, ProductSearchQueryVariables>;
export const SignupMerchantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signupMerchant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"whatsapp_phone_number"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupMerchant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"whatsapp_phone_number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whatsapp_phone_number"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"merchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<SignupMerchantMutation, SignupMerchantMutationVariables>;
export const ChatAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"chatAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"merchantId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"merchantId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"merchantId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isAd"}},{"kind":"Field","name":{"kind":"Name","value":"hasContext"}},{"kind":"Field","name":{"kind":"Name","value":"context"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interactive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"button"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"tempProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interactive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"button"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"btnImageHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"btnTextHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"footer"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"buttons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"tempImageHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempTextHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"buttons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"listTextHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"button"}},{"kind":"Field","name":{"kind":"Name","value":"footer"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesListReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"listReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesBtnReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"buttonReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesTempReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"tempReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"tempProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"messageAd"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"delivered"}},{"kind":"Field","name":{"kind":"Name","value":"failed"}},{"kind":"Field","name":{"kind":"Name","value":"sent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<ChatAddedSubscription, ChatAddedSubscriptionVariables>;
export const MessageAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"messageAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isAd"}},{"kind":"Field","name":{"kind":"Name","value":"hasContext"}},{"kind":"Field","name":{"kind":"Name","value":"context"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interactive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"button"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"tempProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interactive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"button"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"btnImageHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"btnTextHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"footer"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"buttons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"tempImageHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempTextHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"buttons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tempProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"listTextHead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"button"}},{"kind":"Field","name":{"kind":"Name","value":"footer"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesListReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"listReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesBtnReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"buttonId"}},{"kind":"Field","name":{"kind":"Name","value":"buttonReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mesTempReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"tempReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"tempProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"messageAd"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"delivered"}},{"kind":"Field","name":{"kind":"Name","value":"failed"}},{"kind":"Field","name":{"kind":"Name","value":"sent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<MessageAddedSubscription, MessageAddedSubscriptionVariables>;
export const UpdateBillboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBillboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"billboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BillboardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBillboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"billboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"billboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBillboardMutation, UpdateBillboardMutationVariables>;
export const UpdateBrandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBrand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BrandInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brandId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBrand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}},{"kind":"Argument","name":{"kind":"Name","value":"brandId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brandId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"joinDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"industry"}},{"kind":"Field","name":{"kind":"Name","value":"loc_name"}},{"kind":"Field","name":{"kind":"Name","value":"loc_address"}},{"kind":"Field","name":{"kind":"Name","value":"loc_latitude"}},{"kind":"Field","name":{"kind":"Name","value":"loc_longitude"}},{"kind":"Field","name":{"kind":"Name","value":"loc_url"}},{"kind":"Field","name":{"kind":"Name","value":"storeId"}}]}}]}}]} as unknown as DocumentNode<UpdateBrandMutation, UpdateBrandMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"billboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const UpdateCouponDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCoupon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"promotionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CouponPromInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCoupon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"promotionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"promotionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"coupon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"validFrom"}},{"kind":"Field","name":{"kind":"Name","value":"validTo"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCouponMutation, UpdateCouponMutationVariables>;
export const UpdateCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp_name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const UpdateDiscountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDiscount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"promotionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DiscountPromInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDiscount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"promotionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"promotionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateDiscountMutation, UpdateDiscountMutationVariables>;
export const UpdateMessageStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMessageStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMessageStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateMessageStatusMutation, UpdateMessageStatusMutationVariables>;
export const UpdateMpesaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMpesa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mpesaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MpesaSettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMpesa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mpesaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mpesaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"consumer_key"}},{"kind":"Field","name":{"kind":"Name","value":"consumer_secret"}},{"kind":"Field","name":{"kind":"Name","value":"pass_key"}},{"kind":"Field","name":{"kind":"Name","value":"business_shortcode"}},{"kind":"Field","name":{"kind":"Name","value":"account_reference"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_desc"}}]}}]}}]} as unknown as DocumentNode<UpdateMpesaMutation, UpdateMpesaMutationVariables>;
export const UpdateOrderCheckoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrderCheckout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderCheckoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrderCheckout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPaid"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"storeOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateOrderCheckoutMutation, UpdateOrderCheckoutMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isArchived"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const UpdateStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StoreInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateStoreMutation, UpdateStoreMutationVariables>;
export const UpdateStripeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStripe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stripeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StripeSettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStripe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stripeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stripeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"api_key"}},{"kind":"Field","name":{"kind":"Name","value":"callback_url"}},{"kind":"Field","name":{"kind":"Name","value":"webhook_secret"}}]}}]}}]} as unknown as DocumentNode<UpdateStripeMutation, UpdateStripeMutationVariables>;