const { Date, Decimal } = require("./helpers/helpers.js");

const typeDefinitions = `#graqhql
    scalar Date
    scalar Decimal
    # tell apollo server @auth can be used with queries, fields, and field definitions so that use it everywhere
    directive @auth on QUERY | FIELD_DEFINITION | FIELD

    type Merchant {
        id: Int
        business_name: String
        username: String!
        password: String
        email: String
        whatsapp_phone_number: String
        customers: [Customer]
        setting: Setting
        products: [Product]
        chats: [Chat]
        stores: [Store]
    }
    type Customer {
        id: Int!
        whatsapp_name: String
        phone_number: String!
        first_name: String
        last_name: String
        age: Int
        gender: String
        incomeCategory: String
        customerSegment: String
        occupation: String
        joinDate: Date
        lastPromoted: Date
        status: String

        createdAt: Date

        customerLoyalty: Loyalty
        merchant: Merchant
        customerOrder: [Order]
    }
    
    type Chat {
        id: Int!
        createdAt: Date
        merchant: Merchant!
        customer: Customer!
        messages: [Message]!
        lastMessage: Message
        conversations:[Conversation]
        status: String
    }

    type Conversation {
        id: Int!
        chat: Chat

        conversationId:String
        status: String
        pricingModel: String
        category: String
        expiryDate: Date
    }
    type Message {
        id: Int!
        chat: Chat
        type: String
        isAd: Boolean
        text: TextMessage
        image: ImageMessage
        video: VideoMessage
        document: DocumentMessage
        interactive: InteractiveMessage
        mesBtnReply: ButtonRepliedAction
        mesListReply: ListRepliedAction
        mesTempReply: TemplateRepliedAction
        messageAd: Ad
        hasContext: Boolean
        context: Message
        contexts: [Message]
        from_customer: Boolean
        messageId: String
        status: String
        timestamp: Date
        createdAt: Date
    }
    type TextMessage {
        id: Int
        body: String!
    }
    type ImageMessage{
        id: Int!
        imageId: String
        caption: String
        mimeType: String
        sha256: String
        url: String
        AWfileId: String
        AWbucketId: String
        message: Message!
    }
    type VideoMessage{
        id: Int!
        videoId: String
        caption: String
        mimeType: String
        sha256: String
        url: String
        message: Message!
    }
    type DocumentMessage{
        id: Int!
        documentId: String
        caption: String
        mimeType: String
        sha256: String
        filename: String
        url: String
        message: Message!
    }
    type InteractiveMessage {
        id: Int!
        message: Message!
        type: String!
        button: InteractiveButton
        list: InteractiveList
        template: InteractiveTemplate
    }
####################### INTERACTIVE BUTTON ############################################

    type InteractiveButton {
        id: Int!
        interactiveMessage: InteractiveMessage!
        header: String
        btnImageHead: ImageHeader
        btnTextHead: TextHeader
        body: String
        footer: String
        action: String  # action you want the user to take
        buttons: [ButtonReplyAction] # the actions the user can take
        product: Product
    }
    type ButtonReplyAction {
        id: Int!
        button: InteractiveButton!
        buttonId: String!
        title: String!
    }
    type ButtonRepliedAction {
        id: Int
        buttonId: String
        title: String

        message: Message
        buttonReply: InteractiveButton
    }
######################################INTERACTIVE LIST #################################
    type InteractiveList {
        id: Int!
        header: String
        body: String
        footer: String
        button: String # action you want the user to take a button to open the list to make order
        
        interactiveMessage: InteractiveMessage!
        sections: [ListSection]
        listReplys: ListRepliedAction
        listTextHead: TextHeader
    }
    type ListSection {
        title: String

        interactiveList: InteractiveList!
        rows: [ListRowButton]
    }
    type ListRowButton {
        id: Int!
        buttonId: String
        title: String
        description: String
        
        listSection: ListSection
        product: Product
    }
    
    type ListRepliedAction {
        id: Int
        buttonId: String
        title: String
        description: String

        message: Message
        listReply: ListRowButton
    }

###################################INTERACTIVE TEMPLATE##################################
    type InteractiveTemplate {
        id: Int!
        header: String
        body: String
        footer: String
        action: String  # action you want the user to take
        
        buttons: [TemplateReplyAction] # the actions the user can take
        interactiveMessage: InteractiveMessage!
        tempProduct: Product
        tempImageHead: ImageHeader
        tempTextHead: TextHeader
    }
    type TemplateReplyAction {
        id: Int!
        template: InteractiveTemplate!
        text: String!
    }
    type TemplateRepliedAction {
        id: Int
        text: String
        payload: String

        message: Message
        tempReply: InteractiveTemplate
    }

####################################################MESSAGE HEADERS##############################

    type ImageHeader {
        link: String!
    }
    type TextHeader {
        body: String
    }
    type DocumentHeader {
        link: String
        mimeType: String
        filename: String
    }
    type VideoHeader {
        link: String
    }

    type MessageFeed {
        cursor: String! # The place in the list where we left off
        messages: [Message]! # A chunk
    }
    type Setting {
        callBack_url: String!
        APP_ID:String!
        APP_SECRET:String!
        PHONE_NUMBER_ID:String!
        BUSINESS_ACCOUNT_ID:String!
        ACCESS_TOKEN:String!
        API_VERSION:String!
        WEBHOOK_VERIFICATION_TOKEN:String!
        RECIPIENT_PHONE_NUMBER:String
    }

    ###########################  STORE SCHEMA #############################
    type Store {
        id:  Int!
        name: String!
        merchant: Merchant
        billboards: [Billboard]
        products: [Product]
        mpesa: MpesaSetting
        createdAt: Date!
        updatedAt: Date!
    }
    type Brand {
        id: Int!
        name: String!
        joinDate: Date
        description: String!
        phoneNumber: String!
        industry: String!
        loc_name: String!
        loc_address: String!
        loc_latitude: String
        loc_longitude: String
        loc_url: String
        storeId: Int
    }
    type Billboard {
        id: Int!
        label: String!
        imageUrl: String
        store: Store
        categories: [Category]
        createdAt: Date!
        updatedAt: Date!
    }
    type Category {
        id: Int!
        name: String!
        store: Store!
        products: [Product]
        billboard: Billboard!
        updatedAt: Date!
    }

    ###########################  PRODUCT SCHEMA #############################
    type Product{
        id: Int!
        name: String!
        price: Decimal!
        isFeatured: Boolean
        isArchived: Boolean
        category: Category!
        store: Store!
        description: String
        brand: Brand
        stockCode: String
        images: [Image]!

        prodVariations: [ProductVariation]
        prodCombinations: [ProductCombination]

        updatedAt: Date
    }
    type ProductVariation {
        name: String

        prodVariation: Product
        prodVarOptions: [ProductVariationOption]
    }
    type ProductVariationOption {
        value: String
        prodVarOption: ProductVariation
    }
    type ProductCombination {
        price: Decimal,
        sku: String,
        availableStock: Int
        combinationString: String
        variantImage: ProductImage
        productVariants: [ProductVariationOption]

        prodCombination: Product,
    }
    
    type ProductImage {
        link: String
    }

    type Image {
        id: Int!
        url: String!
        productId: Int!
        storeId: Int!
    }

    ###########################  ORDERS SCHEMA #############################
    type Order {
        id: Int!
        orderID: String
        isPaid: Boolean!
        phone: String!
        status: String!
        address: String!
        storeOrder: Store
        customerOrder: Customer
        orderItems: [OrderItem]!
        createdAt: Date
        updatedAt: Date
    }
    type OrderItem {
        id: Int!
        price: Decimal!
        quantity: Int!
        productId: Int
        order: Order
        orderProduct: Product!
    }

    type CusChatSearch {
        chats: [Chat]
        customers: [Customer]
    }
    type ReturnedChat {
        messages: [Message]
        customer: Customer
        conversations: [Conversation]
    }

    ###################### Marketing ####################################
    type Ad {
        id: Int!
        merchantId: Int!
        adTemplate: AdTemplate!
        read: Int
        delivered: Int
        sent: Int
        failed: Int
        response: Int
        updatedAt: Date
    }
    type AdTemplate {
        id: Int!
        name: String!
        leads: Int
        merchant: Merchant!
        adTempProduct: Product
        adTempMessage: Message
        adTempResponses: [MarketingResponse]
    }
    type MarketingResponse {
        id: Int!
        cusTempLead: Customer
        mesTempLead: Message
        # prodTempLead: Product
        # adTempLead: AdTemplate
    }

    ##################Task scheduling#####################

    type ScheduleTask {
        id: Int
        merchantsTasks: Merchant
        type: String
        timestamp: Date
        bulkTempTask: BulkTemplateTask
    }

    type BulkTemplateTask {
        id: Int
        schedule: ScheduleTask
        message: String
        template: String
        customers: String
    }

    ##################### PROMOTION SCHEMA ###################################
    #################### Loyalty Program #################
    type Purchase {
        id: Int
        totalAmount: Decimal
        pointsEarned: Int
        purchaseDate: Date
        createdAt: Date
        updatedAt: Date

        customer: Customer
    }

    type Loyalty {
        id: Int
        pointsBalance: Int
        lastUpdated: Date
        createdAt: Date
        updatedAt: Date

        customer: Customer
    }

    type Reward {
        id: Int
        rewardName: String
        pointsRequired: Int
        description: String
        createdAt: Date
        updatedAt: Date
    }

    type Redemption {
        id: Int
        redemptionDate: Date
        pointsUsed: Int
        createdAt: Date
        updatedAt: Date
        
        reward: Reward
        customer: Customer
    }

    ################ PROMOTION #################
    enum PromotionType {
        coupon
        free_gifts
        discount
        free_shipping
        upsell_special
        member_referral
        free_trial
        give_away
        bogo
        loyalty
        bundle
        tiered_discount
        subscription
        flash_sale
        competition
        donation
        cash_back
    }

    enum DiscountType {
        percent
        fixed
    }

    type Promotion {
        id: Int
        name: PromotionType!
        startDate: Date
        endDate: Date
        description: String
        discountType: DiscountType
        active: Boolean
        discountValue: Decimal
        createdAt: Date
        updatedAt: Date

        coupon: Coupon
        store: Store
    }

    type PromotionProduct {
        id: Int
        createdAt: Date
        updatedAt: Date

        promotionProducts: [Promotion]
        productPromotions: [Product]
    }

    type PromotionCustomer {
        id: Int
        redemptionDate: Date
        reedemed: Boolean
        createdAt: Date,
        updatedAt: Date

        customerPromotions: [Customer]
        product: [Product]
    }

    type Sale {
        id: Int
        saleDate: Date
        totalAmount: Decimal
        createdAt: Date
        updatedAt: Date

        customerSales: Customer
        salePromotions: Promotion
        saleDetails: [SaleDetail]
    }

    type SaleDetail {
        unitPrice: Decimal,
        discount: Decimal,
        quantity: Int
        
        sales: Sale,
        product: Product,
    }


    ################## TYPES OF PROMOTIONS ##################
    type Coupon {
        id: Int
        code: String
        validFrom: Date
        validTo: Date
        discount: Decimal
        active: Boolean
        createdAt: Date
        updatedAt: Date
    }

    ################## TYPE PAYMENT ###############
    type MpesaSetting {
        id: Int
        consumer_key: String!
        consumer_secret: String!
        pass_key: String!
        business_shortcode: String!
        account_reference: String!
        transaction_desc: String!
        store: Store
        callback_url: String
    }

    ##########################################################################
    type RootQuery {
        customers: [Customer] @auth
        customer(customerId: Int!): Customer
        customer360(customerId: Int!): Customer
        chats: [Chat] @auth
        chat(chatId: Int!): ReturnedChat @auth
        lastMessage(chatId: Int!): Message @auth
        setting(username: String): Setting
        allProducts: [Store] @auth
        productSearch(page: Int, limit: Int, text: String!, storeId: Int!): [Product] @auth
        customerSearch(page: Int, limit: Int, text: String!): [Customer] @auth
        
        stores: [Store] @auth
        store(storeId: Int):Store @auth
        mpesa(storeId: Int!): MpesaSetting
        brand(brandId: Int!): Brand @auth
        brands(storeId: Int!): [Brand] @auth
        billboards(storeId: Int): [Billboard]
        billboard( billboardId: Int!):Billboard! 
        categories(storeId: Int!): [Category]
        category(categoryId: Int!): Category!
        products(storeId: Int!, categoryId: Int): [Product]
        productsIds( storeId: Int,productIds: [Int]): [Product]!
        productsWithVariants(storeId: Int!, categoryId: Int, variantId: Int): [Product]
        product(productId: Int!): Product!
        orders(storeId: Int!): [Order]!
        currentMerchant: Merchant @auth
        customersSearch(page: Int, limit: Int, text: String!): [Customer] @auth
        customerChatSearch(page: Int, limit: Int, text: String!): CusChatSearch @auth
        ads: [Ad] @auth
        tempMarketResponse(adTemplateId: Int!): AdTemplate @auth
        templateSchedules: [ScheduleTask]


        ################ PROMOTION ########
        promotions(storeId: Int!): [Promotion] @auth
        sales(storeId: Int!): [Sale] 
    }



    input ChatInput {
        merchant: Int
        customer: Int!
    }
    input ChatStatus {
        messageId: String
        status: String
    }

    input MessageInput{
        chatId: Int
        messageId: String
        status: String
        from_customer: Boolean!
        timestamp: Date!
        type: String!
    }

    input ContextMessageInput {
        messageId: String!
    }

    input TextInput{
        body: String!
    }
    input TextMessageInput{
        message: MessageInput!
        text: TextInput!
    }

    input ImageInput {
        caption: String
        mimeType: String
        sha256: String
        imageId: String

        url: String
        AWfileId: String
        AWbucketId: String
    }
    input ImageMessageInput{
        message: MessageInput!
        image: ImageInput
    }

    input DocumentInput {
        caption: String
        mimeType: String
        sha256: String
        filename: String
        documentId: String
        url: String
    }
    input DocumentMessageInput{
        message: MessageInput!
        document: DocumentInput
    }

    input VideoInput {
        caption: String
        mimeType: String
        sha256: String
        videoId: String

        url: String
    }
    input VideoMessageInput{
        message: MessageInput!
        video: VideoInput
    }
##############################MESSAGE HEADER INPUTS##########################33
    input ImageHeaderInput {
        link: String!
    }
    input VideoHeaderInput {
        link: String!
    }
    input TextHeaderInput {
        body: String!
    }
    input DocumentHeaderInput {
        link: String!
        filename: String
        mimeType: String
    }
###################################### BUTTON ###########################
    input ButtonReplyActionInput {
        buttonId: String!
        title: String!
    }
    input InteractiveButtonInput {
        header: String
        btnImageHead: ImageHeaderInput
        btnTextHead: TextHeaderInput
        body: String
        footer: String
        action: String
        productId: Int
        buttons: [ButtonReplyActionInput]
    }
#################################LIST INPUT##########################
    input ListRowButtonInput {
        buttonId: String!
        title: String!
        description: String!
        productId: Int
        interactiveListId: Int
    }
    input ListSectionInput {
        title: String
        rows: [ListRowButtonInput]
    }
    input InteractiveListInput {
        header: String
        listTextHead: TextHeaderInput
        body: String
        footer: String
        button: String
        sections: [ListSectionInput]
    }
########################TEMPLATE INPUT################################################
    input TemplateReplyActionInput {
        text: String!
    }
    input InteractiveTemplateInput {
        header: String
        tempTextHead: TextHeaderInput
        tempImageHead: ImageHeaderInput
        body: String
        footer: String
        action: String
        productId: Int
        buttons: [TemplateReplyActionInput]
    }
    input InteractiveInput {
        type: String!
        button: InteractiveButtonInput
        list: InteractiveListInput
        template: InteractiveTemplateInput
    }
    input InteractiveMessageInput {
        message: MessageInput!
        interactive: InteractiveInput
    }
     ############Reply to template message###########
    input TemplateRepliedActionInput {
        text: String!
        payload: String
        
        messageId: Int
        interactiveTemplateId: Int 
    }

    input TemplateRepliedInput {
        message: MessageInput!
        mesTempReply: TemplateRepliedActionInput
    }
 
############################################################3
    input ButtonRepliedActionInput {
        buttonId: String!
        title: String!
        
        messageId: Int
        interactiveButtonId: Int 
    }
    input ButtonRepliedInput {
        message: MessageInput!
        mesBtnReply: ButtonRepliedActionInput
    }
################################################
    input ListRepliedInput {
        message: MessageInput!
        mesListReply: ListRepliedActionInput
    }
    input ListRepliedActionInput {
        buttonId: String!
        title: String!
        description: String!
        messageId: Int
        listRowButtonId: Int 
    }

#####################################

    input ParticipantsInput{
        mer_username: String!
        customer: CustomerInput!
    }

    input SettingInput {
        callBack_url: String
        APP_ID:String
        APP_SECRET:String
        PHONE_NUMBER_ID:String
        BUSINESS_ACCOUNT_ID:String
        ACCESS_TOKEN:String
        API_VERSION:String
        WEBHOOK_VERIFICATION_TOKEN:String
        RECIPIENT_PHONE_NUMBER:String
    }
    input MerchantInput {
        business_name: String!
        username: String!
        password: String!
        email: String
        whatsapp_phone_number: String
    }
    type ReqNotification{
        notification: String!
    }
    type Auth {
        token: String
        merchant: Merchant
    }

    type Response {
        response: String
    }

    input StoreInput{
        name: String!
    }
    input BrandInput {
        name: String!
        joinDate: Date!
        description: String!
        phoneNumber: String
        industry: String!
        loc_name: String!
        loc_address: String!
        loc_latitude: String
        loc_longitude: String
        loc_url: String
        storeId: Int
    }

    input BillboardInput {
        label: String
        imageUrl: String
        storeId: Int!
    }
    input CategoryInput {
        name: String!
        billboardId: Int!
    }
    ################################## ADD A PRODUCT  #############
    input ProductInput{
        name: String!
        price: Decimal!
        description: String
        stockCode: String
        brand: String
        images: [ImageInput]
        isFeatured: Boolean
        isArchived: Boolean
        categoryId: Int!
        brandId: Int!
        storeId: Int!

        prodVariations: [ProductVariationInput]
        prodCombinations: [ProductCombInput]
    }
    input ProductVariationInput {
        name: String,
        prodVarOptions: [ProductVarOptionInput]
    }
    input ProductVarOptionInput {
        value: String
    }
    input ProductCombInput {
        price: Decimal
        sku: String
        availableStock: Int
        combinationString: String
        variantImage: ProductImageInput
        productVariants: [ProductVariationInput]
    }

    input ProductImageInput {
        link: String!
        storeId: Int!
    }

    input ImageInput {
        url: String!
        storeId: Int
        productId: Int
    }


    input OrderInput {
        customerId: Int
        isPaid: Boolean
        phone_number: String!
        address: String

        orderItems: [OrderItemInput]
    }
    input OrderCheckoutInput {
        isPaid: Boolean
        phone_number: String!
        address: String!
    }
    input OrderItemInput {
        productId: Int!
        price: Decimal!
        quantity: Int!
    }

    ###################### Scheduling task #####################
    input ScheduleTaskInput {
        type: String!
        status: String!
        timestamp: Date!
        bulkTempTask: TemplateTaskInput
    }
    input TemplateTaskInput {
        message: String
        template: String
        customers: String
    }

    ###################### SALES PROMOTION ######################
    input CouponInput {
        id: Int
        code: String!
        validFrom: Date!
        validTo: Date!
        discount: Decimal!
        active: Boolean
    }

    input CouponPromInput {
        name: String!
        storeId: Int!
        description: String
        discountType: DiscountType!
        discountValue: Decimal
        
        coupon: CouponInput!
    }

    input DiscountPromInput {
        storeId: Int!
        name: PromotionType!
        startDate: Date!
        endDate: Date!
        description: String
        discountType: DiscountType!
        discountValue: Decimal!
        active: Boolean!
    }

    ################### LOYALTY PROGRAM ######################
    
    
    input LoyaltyInput {
        customerId: Int
        pointsBalance: Int
        lastUpdated: Date
    }

    input RewardInput {
        rewardName: String
        pointsRequired: Int
        description: String
    }

    input RedemptionInput {
        customerId: Int
        rewardId: Int
        pointsUsed: Int
        redemptionDate: Date
    }

    ################# Customer #########################
    enum GenderType {
        male
        female
        not_sure
    }
    enum IncomeCategoryType {
        high
        low
        medium
    }
    enum CustomerSegmentType {
        cooperate
        small
        medium
        individual
    }
    enum OccupationType {
        student
        employed
        self_employed
    }

    enum CustomerStatus {
        high_rated
        low_rated
        new
        medium_rated
    }
    input CustomerInput {
        whatsapp_name: String
        phone_number: String!
        first_name: String
        last_name: String
        merchantId: Int
        age: Int
        gender: GenderType
        incomeCategory: IncomeCategoryType
        customerSegment: CustomerSegmentType
        occupation: OccupationType
        joinDate: Date
        lastPromoted: Date
        status: CustomerStatus

        customerLoyalty: LoyaltyInput
    }

    input MpesaSettingInput {
        consumer_key: String
        consumer_secret: String
        pass_key: String
        business_shortcode: String
        account_reference: String
        transaction_desc: String
        callback_url: String
        storeId: Int
    }
  

    type RootMutation {
        addCustomer (
            customer: CustomerInput!
        ): Customer @auth
        addChat (
            chat: ChatInput!
        ): Chat
        addTextMessage (
            message: TextMessageInput!
            template: String,
            participants: ParticipantsInput
            customerId: Int
            contextMessage: ContextMessageInput
        ): Message
        addTemplateMesBulk (
            message: InteractiveMessageInput!
            selectedCustomers: String!
            template: String
        ): Message
        addImageMessage (
            message: ImageMessageInput!
            template: String
            participants: ParticipantsInput
            customerId: Int
            contextMessage: ContextMessageInput
        ): Message
        addDocumentMessage (
            message: DocumentMessageInput!
            template: String
            participants: ParticipantsInput
            customerId: Int
            contextMessage: ContextMessageInput
        ): Message
        addVideoMessage (
            message: VideoMessageInput!
            template: String
            participants: ParticipantsInput
            customerId: Int
            contextMessage: ContextMessageInput
        ): Message
        addInteractiveButtonMessage (
            message: InteractiveMessageInput!
            template: String
            participants: ParticipantsInput
            customerId: Int
            contextMessage: ContextMessageInput
        ): Message
        addInteractiveTemplateMessage (
            message: InteractiveMessageInput,
            template: String
            participants: ParticipantsInput
            customerId: Int
            contextMessage: ContextMessageInput
        ): Message
        addInteractiveListMessage (
            message: InteractiveMessageInput!
            template: String
            participants: ParticipantsInput
            customerId: Int
            contextMessage: ContextMessageInput
        ): Message
        addButtonRepliedMessage (
            message: ButtonRepliedInput!
            participants: ParticipantsInput
            contextMessage: ContextMessageInput
        ): Message
        addTemplateRepliedMessage (
            message: TemplateRepliedInput!
            participants: ParticipantsInput
            contextMessage: ContextMessageInput
        ): Message
        addListRepliedMessage (
            message: ListRepliedInput!
            participants: ParticipantsInput
            contextMessage: ContextMessageInput
        ): Message
        addSetting (
            setting: SettingInput!
        ): Setting @auth
        addStore (
            store: StoreInput!
        ): Store @auth
        addBrand (
            brand: BrandInput!
        ): Brand @auth
        addBillboard (
            billboard: BillboardInput!
        ): Billboard @auth
        addCategory (
            category: CategoryInput!
        ): Category @ auth
        addMpesa (
            mpesa: MpesaSettingInput
        ): MpesaSetting @auth


        addProduct (
            product: ProductInput!
        ): Product @auth
        addProductVariations (
            product: ProductInput
        ): Product @auth

        addImage (
            image: ImageInput!
        ): Image @auth
        addOrder(
            order: OrderInput!
            storeId: Int!
        ): Order
        addBulkTemplateTask(
            schedule: ScheduleTaskInput!
        ): ScheduleTask @auth

        updateChatStatus (
            participants: ParticipantsInput
            payload: ChatStatus!
        ): Message
        updateMessageStatus(
            id: Int,
            messageId: String,
        ): Message @auth
        updateStore (
            storeId: Int!
            payload: StoreInput!
        ): Store @auth
        updateMpesa (
            mpesaId: Int!
            payload: MpesaSettingInput!
        ): MpesaSetting @auth
        updateBrand (
            brandId: Int!
            payload: BrandInput!
        ): Brand @auth
        updateBillboard (
            billboardId: Int!
            payload: BillboardInput!
        ): Billboard @auth
        updateCategory (
            categoryId: Int!
            payload: CategoryInput!
        ): Category @auth
        updateProduct (
            productId: Int!
            payload: ProductInput!
        ): Product @auth
        updateProductVariation (
            productId: Int!
            payload: ProductInput!
        ): Product @auth
        updateOrderCheckout (
            orderId: Int!
            storeId: Int!
            payload: OrderCheckoutInput!
        ): Order
        updateCustomer (
            customerId: Int!
            payload: CustomerInput!
        ): Customer @auth
        updateBulkTemplateTask(
            taskId: Int!
            merchantId: Int!
        ): Response

        deleteStore (
            storeId: Int!
        ): Response @auth
        deleteMpesa (
            storeId: Int!
            mpesaId: Int!
        ): Response @auth
        deleteBrand (
            brandId: Int!
            storeId: Int!
        ): Response @auth
        deleteBillboard (
            storeId: Int!
            billboardId: Int!
        ): Response @auth
        deleteCategory (
            categoryId: Int!
            storeId: Int!
        ): Response @auth
        deleteProduct(
            productId: Int!
            storeId: Int!
        ): Response @auth
        deleteImage(
            imageId: Int!
            productId: Int!
        ): Response @auth

        loginMerchant (
            username: String!
            password: String!
        ): Auth
        signupMerchant (
            username: String!
            password: String!
            whatsapp_phone_number: String!
            email: String
        ): Auth
        logoutMerchant: Response

        ######### Adding Promotion ###########
        #### Coupon
        addCoupon (
            promotion: CouponPromInput
        ): Promotion @auth
        updateCoupon(
            promotionId: Int
            payload: CouponPromInput
        ): Promotion @auth
        deleteCoupon(
            promotionId: Int!
            storeId: Int!
        ): String @auth

        #### Discount
        addDiscount (
            discount: DiscountPromInput
        ): Promotion @auth
        updateDiscount(
            promotionId: Int
            payload: DiscountPromInput
        ): Promotion @auth
        deleteDiscount(
            promotionId: Int!
            storeId: Int!
        ): String @auth
    } 

    type ChatUpdated { 
        message: Message
        chat: Chat 
    } 
   
    type RootSubscription {
        chatAdded(merchantId: Int!): Chat # when a new chat is created
        messageAdded(chatId: Int!): ChatUpdated  # the channel client to subscribe to messageAdded
    }

    schema { 
        query: RootQuery
        mutation: RootMutation
        subscription: RootSubscription
    }
`;

module.exports = [typeDefinitions];
