import axios from "axios";
import gql from "graphql-tag";

const axiosConfig = {
  baseURL: "https://api.deck1.sk",
};

export default {
  getSites: async () => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        query {
          sites {
            id
            name
          }
        }
      `,
    });
    return promise;
  },
  createSite: async (name: string) => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        mutation {
          createSite(data: { name: "${name}" }) {
            id
          }
        }
      `,
    });
    return promise;
  },
};
