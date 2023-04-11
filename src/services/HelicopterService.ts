import axios from "axios";
import gql from "graphql-tag";

const axiosConfig = {
  baseURL: "https://api.deck1.sk",
};

export default {
  getHelicopterPerModel: async (model: string) => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        query {
          helicoptersWhereModel(model: "${model}") {
            model
            id
            reg
          }
        }
      `,
    });
    return promise;
  },
};
