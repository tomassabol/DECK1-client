import axios from "axios";
import gql from "graphql-tag";

const axiosConfig = {
  baseURL: "https://api.deck1.sk",
};

export default {
  getLocations: async () => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `{
          sites{
            id
            name
          }
          heliportsPerSite(siteId: 1) {
            id
            name
            type
          }
          viaPerSite(siteId: 1) {
            id
            name
            lat
            lng
            type
          }
        }
      `,
    });
    return promise;
  },
};
