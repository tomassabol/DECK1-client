import axios from "axios";
import gql from "graphql-tag";

const axiosConfig = {
  baseURL: "https://api.deck1.sk",
};

export default {
  getReports: async () => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        query {
          dailyReports {
            id
            date
          }
        }
      `,
    });
    return promise;
  },
  getReport: async (id: string) => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        {
          dailyReportsById(id: 1) {
            id
            date
            flights {
              id
              flightNumber
            }
          }
        }
      `,
    });
    return promise;
  },
  createReportFetchData: async () => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        query {
          helicopters {
            id
            model
            reg
          }
          pilots {
            id
            name
          }
          hoistOperators {
            name
            id
          }
        }
      `,
    });
    return promise;
  },
};
