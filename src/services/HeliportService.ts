import axios from "axios";
import gql from "graphql-tag";

const axiosConfig = {
  baseURL: "https://api.deck1.sk",
};

export default {
  getHeliports: async () => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        query {
          heliports {
            id
            name
          }
        }
      `,
    });
    return promise;
  },
};
