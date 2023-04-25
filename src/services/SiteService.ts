import axios from "axios";
import gql from "graphql-tag";

const axiosConfig = {
  baseURL: "https://api.deck1.sk",
};

export default {
  getSite: async (id: number | string) => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        {
          site(id: ${id}) {
            id
            name
            locations {
              id
              name
              type
            }
          }
        }
      `,
    });
    return promise;
  },
};
