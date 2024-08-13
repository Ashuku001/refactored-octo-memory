import axios from "axios";
interface DataResponse {
  access_token: string;
}
interface GetAccessTokenProps {
  consumer_key: string;
  consumer_secret: string;
};
export async function getAccessToken({ consumer_key, consumer_secret }: GetAccessTokenProps) {
  const url = process.env.MPESA_AUTH_TOKEN;
  const auth =
    "Basic " +
    Buffer.from(`${consumer_key}:${consumer_secret}`).toString("base64");

    try {
      const response = await axios.get(url!, {
        headers: {
          Authorization: auth,
        },
      });
     
      const dataresponse = response.data;
      const accessToken: DataResponse = dataresponse.access_token;
      return accessToken;
    } catch (error) {
      throw error;
    }
}
