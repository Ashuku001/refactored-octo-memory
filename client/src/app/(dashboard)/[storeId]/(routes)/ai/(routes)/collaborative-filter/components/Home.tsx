import { Banner } from "../../components/Banner";
import { ModelInsights } from "../../components/ModelInsights";

export const Home = () => {
  return (
  <div className="h-full flex flex-col space-y-2">
    <Banner
      heading={"Collaborative based recommendation modelling"}
      className="h-[80vh] md:h-[60vh] lg:h-[40vh] px-5 md:px-5 lg:px-20 "
    >
      <div className="">
          <p>
            Collaborative-based recommendation filter is used to process and analyze customers&apos; information and recommend products a customer is likely to purchase. 
          </p>
          <p>
            Collaborative filtering algorithms use a customer&apos;s purchase history and ratings to find similar customers and then suggest items that the other customer liked. For example to find a new restaurant you can ask your friends for suggestions.
          </p>
          <p>
            There are two types of collaborative filters; <b>User-to-User</b> and <b>Item-to-Item</b> filtering.
          </p>
        </div>
      </Banner>
      <ModelInsights name={""}/>
  </div>);
};
