import axios from "axios";
interface DataResponse {
  access_token: string;
}
interface GetAccessTokenProps {
  consumer_key: string;
  consumer_secret: string;
};
export async function getAccessToken({ consumer_key, consumer_secret }: GetAccessTokenProps) {
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth =
    "Basic " +
    Buffer.from(`${consumer_key}:${consumer_secret}`).toString("base64");

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: auth,
        },
      });
     
      const dataresponse = response.data;
      console.log("ACCESS TOKEN",dataresponse);
      const accessToken: DataResponse = dataresponse.access_token;
      return accessToken;
    } catch (error) {
      throw error;
    }
}
