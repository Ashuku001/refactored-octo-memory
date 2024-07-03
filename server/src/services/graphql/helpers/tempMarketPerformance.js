const { getAd } = require("./getModels");

const tempMarketPerformance = async ({
  Ad,
  merchantId,
  adId,
  MarketingResponse,
  response,
}) => {
  const ad = await getAd(Ad, merchantId, adId);

  console.log("updating marketing id".bgBlue, ad);
  if (ad) {
    const result = await Ad.update(
      {
        ...ad,
        response: ad[`${"response"}`] !== null ? (ad[`${"response"}`] += 1) : 1,
      },
      {
        where: {
          id: ad.id,
        },
        silent: false,
      }
    );

    updateResponseTemplate({
      MarketingResponse,
      response: { ...response, adTemplateId: ad.templateId },
    });
  }
};

const updateResponseTemplate = async ({ MarketingResponse, response }) => {
  await MarketingResponse.create({
    ...response,
  });
};

module.exports = {
  tempMarketPerformance: tempMarketPerformance,
};
