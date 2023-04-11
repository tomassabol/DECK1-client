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
  createHeliport: async (name: string) => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        mutation {
          createHeliport(data: { name: "${name}" }) {
            id
          }
        }
      `,
    });
    return promise;
  },
};
