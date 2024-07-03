# Whatsapp business API

## Throughput

For each registered busines phone number cloud API supports up to 80 mps by default and up to 1000 mps by request.

If you are planning a campaign requires increased through put you upgrade to 1000mps for specific phone number by opening a [Direct Support](https://business.facebook.com/direct-support) ticket with the following selections:

- Question Topic: Cloud API issues
- Request type: Request to upgrade to high throughput tier

## Webhooks

The webhook server should be able to withstand 3x the capacity of outgoing message traffic and 1x the capacity of expected incoming message traffic. e.g., if sending 1000 mps with a 30% expected response rate, your servers should be able to process up to 3000 message status webhooks plus an additional 300 incoming message webhooks.

Test your webhook server to handle concurrent requests with the following latency standard:

Median latency not to exceed 250ms

less than 1% latency exceeds 1s

## Media messages

[upload your media assets](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#upload-media) to whatsapp servers and use the returned media IDs in media messages instead of hosting the assets on your own servers using and using media asset URLs. If you must host the assets on your own server we recommend that you use [media caching](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages#media-http-caching).

## Getting throughput level

Use the [WhatsApp Business Phone Number](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account-to-number-current-status/) endpoint to get a phone number's current throughput level:

### Reading

Get fields and edges on a whatspapp business phone number

#### requirements

Access tokens user of system user

permissions whatsapp_business_management and whatsapp_business_messaging

#### Request syntax

Get/<PHONE_NUMBER_ID>

##### example request 

```
curl GET \
'https://graph.facebook.com/v18.0/106853218861309' \
-H 'Authorization: Bearer EAAJi...'
```

##### example response 

```
{
   "code_verification_status" : "VERIFIED",
   "display_phone_number" : "+1 555-555-5555",
   "id" : "106853218861309",
   "quality_rating" : "GREEN",
   "verified_name" : "Jaspers Market"
}
```

##### parameters 

Does not require parameters

#### fields

### Creating

Make a POST request to phone_numbers edge 

- [`/{whats_app_business_account_id}/phone_numbers`](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/phone_numbers/)

  When posting to this edge, a [WhatsAppBusinessPhoneNumber](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account-to-number-current-status/) will be created.

### Updating

You can update a [WhatsAppBusinessPhoneNumber](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account-to-number-current-status/) by making a POST request to [`/{whats_app_business_phone_number_id}`](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account-to-number-current-status/).

### Deleting

You can't perform this operation on this endpoint.

## Available metrics (Analytics)

You can use the `analytics` and `conversation_analytics` fields to get metrics about messages and conversations associated with your WhatsApp Business Account (WABA).For example, you can get the number of messages sent and delivered, conversation and cost data, and the number of times each of its templates have been sent.

Only metrics for business phone numbers and templates associated with your whatsapp business app at the tie of the request will be included in the response

### Getting the data

use the  [WhatsApp Business Account](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account)  endpoint to get analytics.

#### Query syntax

```
GET /<WHATSAPP_BUSINESS_ACCOUNT_ID>
  ?fields=<FIELDS>.<FILTERING_PARAMATER>
```

#### Query string parameters

<FIELDS> value can be e.g analytics

- [`conversation_analytics`](https://developers.facebook.com/docs/whatsapp/business-management-api/analytics#conversation-analytics)
- [`analytics`](https://developers.facebook.com/docs/whatsapp/business-management-api/analytics#analytics-2)
- [`template_analytics`](https://developers.facebook.com/docs/whatsapp/business-management-api/analytics#template-analytics)

<FILTERING_PARAMETERS> metric filtering parameters append additional filtering parameters using dots. e.g .start(1543543200).end(1544148000).granularity(DAY)

For possible values, see:

- [Analytics Parameters](https://developers.facebook.com/docs/whatsapp/business-management-api/analytics#analytics-parameters)
- [Conversation Analytics Parameters](https://developers.facebook.com/docs/whatsapp/business-management-api/analytics#conversation-analytics-parameters)
- [Template Analytics Parameters](https://developers.facebook.com/docs/whatsapp/business-management-api/analytics#template-analytics-parameters)

##### Analytics

Provides the number and type of messages sent and delivered by the phone numbers associated with a specific WABA. When calling `/{whatsapp-business-account-ID}?fields=analytics.{filtering-parameters}`, you can attach the following parameters.

###### Analytics parameters 

start, end, granularity, phone_numbers, product_types, country_codes

#### Example

**Scenario** You need to get the number of messages sent and delivered by all phone numbers associated with your WABA

**Solution** [Assemble the URL you want to call](https://developers.facebook.com/docs/whatsapp/business-management-api/analytics#getting-the-data) and include the following filtering parameters: `start`, `end`, `granularity`. Then, make a `GET` request to that URL:

```curl
curl -i -X GET \ 
"https://graph.facebook.com/v18.0/{whatsapp-business-account-ID}
      ?fields=analytics
      .start(1543543200)
      .end(1544148000)
      .granularity(DAY)
      &access_token={access-token}"
```

A successful response returns an analytics object with the data you have requested:

```
{"analytics": {"phone_numbers": [...], "country_codes": [...], "granularity": "Day", "data_points": [{"start": 12345, "end": 1234, "sent" 1233, "delivered": 1874}]}}
```

##### Conversation  Analytics

The `conversation_analytics` field provides cost and [conversation](https://developers.facebook.com/docs/whatsapp/pricing#conversations) information for a specific WABA. When calling `/{whatsapp-business-account-ID}?fields=conversation_analytics.{filtering-parameters}`, you can attach the following parameters.

###### conversation analytics parameters

start, end, granularity (HALF_HOUR, DAILY, MONTHLY), phone_numbers, metric_types(COST, CONVERSATION), conversation_categories(AUTHENTICATION, MARKETING, SERVICE, UTILITY), conversation_types(FREE_ENTRY, FREE_TIER, REGULAR), conversation_directions(BUSINESS_INITIATED, USER_INITIATED), dimensions(CONVERSATION_CATEGORY, CONVERSATION_DIRECTION, CONVERSATION_TYPE, COUNTRY, PHONE)

##### Template Analytics

provides the number of message templates sent, delivered and read as well as the number of times a marketing message template button was clicked. Button clicks data are available for URL buttons and Quick reply buttons

###### Confirming template analytics

To confirm via API send the following request: POST /<WHATSAPP_BUSINESS_ACCOUNT_ID>?is_enabled_for_insights=true. Once confirmed we will begin capturing template analytics for the whatsapp business account. Once confirmed, template analytics cannot be disabled. Upon success the API will respond with your whatsapp business account ID

###### Template analytics parameters

start, end, granularity,template_ids,metric_types(CLICKED, DELIVERED, SENT, READ)

# Get started for BSPs

## Prepare and plan

### Plan onboarding and migration

use Embedded signup then think about which client you want to migrate to the cloud API first.

As you create your plan remember to design your system for two scenarios: onboarding new customers and migrating current customers from On-premises to cloud-API. For the migration scenario include plans to backup your current on-premise instance and migrate those numbers to the cloud API.

### Plan Communication With Clients

First, you need to decide whether to notify existing clients about migration. Then, you should determine if you need to create or update any documentation to support the Cloud API setup.

### Make Pricing Decisions

Since the hosting costs for the Cloud API are covered by Meta, you should decide if you would like to update your prices accordingly.

## Set up Assets

To use the cloud API BSPs need to have the following

**Business Manage**r: save the business manage ID

**WhatsApp business Account (WABA)**:

**Meta App** as BSP your app must go through App Review and request Advanced access to the following permissions:

-  [`whatsapp_business_management`](https://developers.facebook.com/docs/permissions/reference/whatsapp_business_management) — Used to manage phone numbers, message templates, registration, business profile under a WhatsApp Business Account. To get this permission, your app must go through [App Review](https://developers.facebook.com/docs/app-review).
- `whatsapp_business_messaging` — Used to send/receive messages from WhatsApp users, upload/download media under a WhatsApp Business Account. To get this permission, your app must go through [App Review](https://developers.facebook.com/docs/app-review).
- `business_management`  

[See a sample App Review submission here](https://developers.facebook.com/docs/app-review/resources/sample-submissions/whatsapp-business-api).  

As a BSP, you can also feel free to use the same Meta app across different clients and WABAs. But be aware that each app can only have one webhook endpoint and each app needs to go through App Review.

**System user**

**Business Phone number**: For BSPs and Direct Businesses: If you wish to use your own number, then you should [add a phone number](https://www.facebook.com/business/help/456220311516626) in WhatsApp Manager and verify it with the verify endpoint via [Graph API](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/phone-numbers#verify).  

**Consumer phone number**: This is a phone number that is currently using the consumer whatsapp app. This number will be receiving the messages sent by your business phone number

## Sign contracts

### Accepting terms of service 

To access the whatsapp business messaging cloud API you need to first accept the whatsapp business platform terms of service on behalf of your business. To do so, navigate to [WhatsApp Manager](https://business.facebook.com/wa/manage/insights) and accept the terms of service in the informational banner.

NOTE: You as a developer need to accept the terms of service. If you are a Business Solution Provider, you do not need your customers to accept.

# Configure the webhook product

Once your endpoint or sample app is ready, use your app's [App Dashboard](https://developers.facebook.com/apps/) to add and configure the Webhooks product. You can also do this programmatically by using the [`/{app-id}/subscriptions` endpoint](https://developers.facebook.com/docs/graph-api/reference/application/subscriptions) for all Webhooks except [Instagram](https://developers.facebook.com/docs/instagram-api/guides/webhooks).

## Webhooks for whatsApp business accounts

1. [Set up your endpoint and configure the Webhooks](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-whatsapp#setup). These are the same steps that you use to set up Webhooks for Facebook Pages.
2. [Subscribe your app under your WhatsApp business account.](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-whatsapp#subscribe) You must subscribe an app owned by your business —apps shared with your business cannot receive webhook notifications.
3. If you are working as a Solution Partner, make sure your app has completed [App Review](https://developers.facebook.com/docs/app-review) and requested the `whatsapp_business_management` permission.

`GET`, `POST`, and `DELETE` calls to `/{whats-app-business-account-id}/subscribed_apps` are now subject to [Business Use Case Rate Limits](https://developers.facebook.com/docs/graph-api/overview/rate-limiting/#wa-biz-api).

### Set up your endpoint and webhooks

Available subscription fields: account_alerts, account_review_update, account_update, business_capability_update, message_template_quality_update, message_template_status_update, messages, phone_number_name_update, phone_number_quality_update, security, template_category_update

### Subscribe your app

#### create a subscription

##### Request

To subscribe your app to webhooks on a WABA, send a `POST` request to the [WABA > Subscribed Apps](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/subscribed_apps/) endpoint.

```
curl -X POST 'https://graph.facebook.com/<API_VERSION>/<WHATSAPP_BUSINESS_ACCOUNT_ID>/subscribed_apps' \
-H 'Authorization: Bearer <ACCESS_TOKEN>'
```

##### response

upon success:

```
{
  "success": "true"
}
```

#### Get subscribed apps

To get a list of apps subscribed to webhooks on a WABA, send a `GET` request to the [WABA > Subscribed Apps](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/subscribed_apps/) endpoint.

##### Request

```
curl 'https://graph.facebook.com/<API_VERSION>/<WHATSAPP_BUSINESS_ACCOUNT_ID>/subscribed_apps' \
-H 'Authorization: Bearer <ACCESS_TOKEN>'
```

##### Response

A successful response will list the subscribed apps:

```
{
  "data": [
    {
      "whatsapp_business_api_data": {
        "link": "<APP_1_URL>",
        "name": "<APP_1_NAME>",
        "id": "<APP_1_ID>"
      }
    },
    {
      "whatsapp_business_api_data": {
        "link": "<APP_2_URL>",
        "name": "<APP_2_NAME>",
        "id": "<APP_2_ID>"
      }
    },
    ...
  ]
}
```

# Build integrations

## Get system user access token

## Set up webhooks

## step 3: subscribe to your WABA

## step 4: Get phone number ID

to send message you have to register the phone number you want to use this is the business phone number. Before registration you need to find that phone number's ID through an API call. Save the phone number ID of the phone number you want to register [Read Phone Numbers](https://developers.facebook.com/docs/whatsapp/business-management-api/phone-numbers) for more 

**migration exception**: If you are migrating a phone number from the on-premises API to the cloud API there are extra steps to follow.  See [Migrate Between On-Premises and Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/migrate-between-on-premises-and-cloud-api) for the full process.

## Step 5: register phone number

With the phone number's ID you can register it. In the registration API call you perform two actions at the same time

1. register the phone
2. [Enable two-step verification](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/two-step-verification) by setting a 6-digit registration code —you must set this code on your end. Save and memorize this code as it can be requested later. **Setting up two-factor authentication is a requirement to use the Cloud API.**

#### Embedded signup users

A phone number must be registered up to 14 days after going through the Embedded signup flow. If a phone number is not registered during that window the phone must go through to the embedded signup flow again prior to registration

## step 6: Send a message to a consumer

### Get  Opt-in for WhatsApp

before opening marketing, utility and authentication conversations with customers outside the 24 hr window. Business can obtain opt-in in a multitude of ways both on and off whatsapp.

Opt-in methods such as via your website, interactive voice response (IVR) flows or in a WhatsApp thread are acceptable.

### Requirements

##### **Businesses must follow the below requirements when obtaining opt-in:**

- Businesses must clearly state that a person is opting in to receive messages from the business over WhatsApp
- Businesses must clearly state the business's name that a person is opting in to receive messages from
- Businesses must comply with applicable law

##### Opt-In Methods

As long as the opt-in method meets the above requirements, it will be policy compliant. The following are examples of supported opt-in methods:

- SMS
- Website
- In a WhatsApp thread
- By phone (using an interactive voice response (IVR) flow)
- In person or on paper (customers can sign a physical document to opt in)

We strongly recommend that businesses continue to optimize for the user experience when designing opt-in flows.

##### Helpful Tips

Businesses should continue to optimize for the user experience while obtaining opt-in. For example, businesses should:

- Users should expect the messages they receive. Set this expectation by:
  - Obtaining an opt-in that encompasses the different categories of messages that you will send (ex: order updates, relevant offers, product recommendations, etc.).
  - Obtaining separate opt-in by specific message category. This mitigates the risk that users will block your business because they receive unsolicited messages.
- Provide clear instructions for how people can opt out of receiving specific categories of messages, and honor these requests.
- Ensure your opt-in and opt-out flows are clear and intuitive for users.
- Clearly communicate the value of receiving this information on WhatsApp.
- Monitor your quality rating, especially when rolling out new opt-in methods.

See [Reference, Messages](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#examples) for examples.

# Migrate between on-premise and cloud API

## On-premise API to cloud API

### step 2: Backup On-premise Content

Before starting the backup make sure you are in single instance mode and not multi-connect.

Use the `/v1/settings/backup` and `/v1/settings/restore` endpoints to make it easier to move to different environments or servers and restore to a known working state https://developers.facebook.com/docs/whatsapp/on-premises/reference/settings/backup-and-restore

The WhatsApp Business API client supports backing up and restoring all necessary information including app settings and registration.

**Before starting.** You must use the admin account to access the backup to access the backup and restore settings

**Backing up:** 

#### Example

To back up, use the `/v1/settings/backup` endpoint with the `password` field.

```
POST /v1/settings/backup
{
    "password": "PASSWORD"
}
```

A successful response looks like this

```
{
    "settings": {
       "data": "ENCRYPTED_BACKUP_DATA"
    }
}
```

# Sell product and services in WhatsApp

## Upload inventory to meta

create a catalog https://business.facebook.com/commerce/?global_scope_id=119745557893663&business_id=119745557893663 then Just [connect the catalog to a WhatsApp Business Account](https://www.facebook.com/business/help/158662536425974) (WABA) and the business will be able to [share products with customers](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/sell-products-and-services/share-products).

If a business needs to create a catalog, there are two possibilities:

- Create a catalog using the [Commerce API](https://developers.facebook.com/docs/commerce-platform/catalog/get-started)
- Create a catalog using the [Meta Commerce Manager](https://business.facebook.com/commerce/).

You can only upload one catalog per WABA, but the same catalog can belong to multiple phone numbers.

### Commerce API

Before you start, please review these recommendations and guidelines:

- If you manage multiple catalogs for different businesses or want an agency to access your catalogs, you may need to set up [Business Manager](https://business.facebook.com/home/accounts?business_id=117943258886315).
- The `catalog_management` permission grants your app the ability to create, read, update, and delete business-owned product catalogs of which the user is an admin. This permission grants access to related endpoints. By default, your app may only have access to product catalogs that are owned by admins and developers of the app when in developer mode. See [Catalog Management Reference](https://developers.facebook.com/docs/facebook-login/permissions/#reference-catalog_management).
- For a commerce catalog, before buyers can purchase items from you, you'll need to upload your products information into a [catalog](https://developers.facebook.com/docs/commerce-platform/catalog/overview). Learn how to create a new ecommerce catalog using the [Commerce Manager](https://business.facebook.com/products/catalogs/new).
- The `business_management` permission is required to update your catalog.
- To use the [Catalog Batch API](https://developers.facebook.com/docs/marketing-api/businessmanager/assets#product_catalog), you need the appropriate [Marketing API Access Level](https://developers.facebook.com/docs/marketing-api/access#limits) and must accept the [Terms of Service](https://business.facebook.com/legal/product_catalog_terms/) by creating your first catalog through [Business Manager](https://business.facebook.com/). See [Catalog Reference](https://developers.facebook.com/docs/marketing-api/reference/product-catalog).

#### **Step 1**: Set up your catalog feed





# API REFERENCES

## Account migration

## Business Compliance

Use the `/PHONE_NUMBER_ID/whatsapp_business_profile` endpoint to retrieve and update your business profile

#### Reminders

- Solution Partners must authenticate themselves with an access token with the `whatsapp_business_management` permission.

### Get business profile

Withing the business profile request you can specify what you want to know from your business. You have the following options: about, address, description, email, messaging_product, profile_picture_url, vertical, websites

#### example

```
curl \ 
'https://graph.facebook.com/v18.0/FROM_PHONE_NUMBER_ID/whatsapp_business_profile?fields=about,address,description,email,profile_picture_url,websites,vertical' \
-H 'Authorization: Bearer ACCESS_TOKEN'
```

#### response 

```
{
  "data": [{
    "about": "ABOUT",
    "address": "ADDRESS",
    "description": "DESCRIPTION",
    "email": "EMAIL",
    "messaging_product": "whatsapp",
    "profile_picture_url": "https://URL",
    "websites": [
       "https://WEBSITE-1",
       "https://WEBSITE-2"
     ],
    "vertical": "INDUSTRY",
  }]
}
All
```

### Update Business Profile

To update your profile, make a `POST` call to `/PHONE_NUMBER_ID/whatsapp_business_profile`. In your request, you can include the parameters listed below.

#### parameters

about, address, address, description, email, messaging_product, profile_picture_url, vertical, websites

supported vertical 

- `UNDEFINED`
- `OTHER`
- `AUTO`
- `BEAUTY`
- `APPAREL`
- `EDU`
- `ENTERTAIN`
- `EVENT_PLAN`
- `FINANCE`
- `GROCERY`
- `GOVT`
- `HOTEL`
- `HEALTH`
- `NONPROFIT`
- `PROF_SERVICES`
- `RETAIL`
- `TRAVEL`
- `RESTAURANT`
- `NOT_A_BIZ`

#### example

```
curl -X POST \
  'https://graph.facebook.com/v18.0/PHONE_NUMBER_ID/whatsapp_business_profile' \
  -H 'Authorization: Bearer ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "messaging_product": "whatsapp",
    "about": "ABOUT",
    "address": "ADDRESS",
    "description": "DESCRIPTION",
    "vertical": "INDUSTRY",
    "email": "EMAIL",
    "websites": [
      "https://WEBSITE-1",
      "https://WEBSITE-2"
    ],
    "profile_picture_handle": "HANDLE_OF_PROFILE_PICTURE"
```

#### sample response

```
{
  "success": true
}
```

### Delete Business Profile

To delete your business profile, you must [delete your phone number](https://developers.facebook.com/docs/whatsapp/phone-numbers#delete-phone-number-from-a-business-account).

## Registration

### register phone

#### Reminders

- To use these endpoints, you need to authenticate yourself with a system user access token with the `**whatsapp_business_messaging**` permission.

- If you need to find your phone number ID, see [Get Phone Number ID](#c72d9c17-554d-4ae1-8f9e-b28a94010b28). this returns, throughput might be important

- ```
  
      "data": [
          {
              "verified_name": "Test Number",
              "code_verification_status": "NOT_VERIFIED",
              "display_phone_number": "+1 555-069-8966",
              "quality_rating": "GREEN",
              "platform_type": "CLOUD_API",
              "throughput": {
                  "level": "NOT_APPLICABLE"
              },
              "id": "135413972986748"
          }
      ],
      "paging": {
          "cursors": {
              "before": "QVFIUjJJNjhmSnVfd1p6TUhjQkpJRTRmdlRKN3lFSUlraEpGNGFoclJQSF9DN3NjQkxkUFpEdE01dlRFbjlFZAnFzTUMZD",
              "after": "QVFIUjJJNjhmSnVfd1p6TUhjQkpJRTRmdlRKN3lFSUlraEpGNGFoclJQSF9DN3NjQkxkUFpEdE01dlRFbjlFZAnFzTUMZD"
          }
      }
  }
  ```

  

## Media

You can use the following endpoints to upload, retrieve, or delete media:

| Endpoint                                  | Uses                                        |
| ----------------------------------------- | ------------------------------------------- |
| [POST /{phone-number-ID}/media](https://) | Upload media.                               |
| [GET /{media-ID}](https://)               | Retrieve the URL for a specific media item. |
| [DELETE /{media-ID}](https://)            | Delete a specific media item.               |
| [GET /{media-URL}](https://)              | Download media from a media URL.            |

#### Reminders

- To use these endpoints, you need to authenticate yourself with a system user access token with the `**whatsapp_business_messaging**` permission.
- If you need to find your phone number ID, see [Get Phone Number ID](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/phone-numbers).
- If you need to find your media URL, see [Retrieve Media URL](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#download-media).

#### Support Media Types

| Media      | Supported File Type(s)                                       | Size Limit |
| ---------- | ------------------------------------------------------------ | ---------- |
| `audio`    | `audio/aac``audio/mp4``audio/mpeg``audio/amr``audio/ogg` **Note**: only opus codecs, base audio/ogg is not supported | 16MB       |
| `document` | `text/plain``application/pdf``application/vnd.ms-powerpoint``application/msword``application/vnd.ms-excel``application/vnd.openxmlformats-officedocument.wordprocessingml.document``application/vnd.openxmlformats-officedocument.presentationml.presentation``application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` | 100MB      |
| `image`    | `image/jpeg``image/png`                                      | 5MB        |
| `sticker`  | `image/webp`                                                 | 100KB      |
| `video`    | `video/mp4``video/3sp` **Notes**:Only H.264 video codec and AAC audio codec is supported.We support videos with a single audio stream or no audio stream. | 16MB       |

#### Get Media ID

To complete some of the following API calls, you need to have a media ID. There are two ways to get this ID:

- **From the API call**: Once you have successfully uploaded media files to the API, the media ID is included in the response to your call.
- **From Webhooks**: When a business account receives a media message, it downloads the media and uploads it to the Cloud API automatically. That event triggers the Webhooks and sends you a notification that includes the media ID.

# Messages

check the postman collection

### Text object

#### Formatting in Text Messages

WhatsApp allows some formatting in messages. To format all or part of a message, use these formatting symbols:

| Formatting     | Symbol                | Example                    |
| -------------- | --------------------- | -------------------------- |
| **Bold**       | Asterisk (*)          | Your total is *$10.50*.    |
| *Italics*      | Underscore (_)        | Welcome to _WhatsApp_!     |
| Strike-through | Tilde (~)             | This is ~better~ best!     |
| `Code`         | Three backticks (```) | ```print 'Hello World';``` |

#### Performance

In this context, performance represents the number of messages that can be sent in any given second using the WhatsApp Business on-premises/reference client. The maximum achievable performance depends on a variety of factors, the most important factor being your client setup choice and whether a message is being sent to a new user or an existing user —encryption sessions setup take a little longer when messaging a new user.

| Client Setup            | Supported Text Messages Per Second |
| ----------------------- | ---------------------------------- |
| Single Shard            | 70                                 |
| Multi Shard (32 shards) | 250                                |