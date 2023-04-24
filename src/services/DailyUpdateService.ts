import axios from "axios";
import gql from "graphql-tag";

const axiosConfig = {
  baseURL: "https://api.deck1.sk",
};

export default {
  getDailyUpdates: async () => {
    const promise = await axios.post(
      axiosConfig.baseURL,
      {
        query: `
          {
            dailyUpdates {
              id
              flight {
                id
                flightNumber
              }
              delay
            }
          }
        `,
      },
      axiosConfig
    );
    return promise;
  },
};
