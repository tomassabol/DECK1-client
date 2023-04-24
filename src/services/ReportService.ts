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
  getReport: async (id: string) => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        query {
          dailyReport(id: ${id}) {
            date
            helicopter {
              model
              reg
            }
            hoistOperator {
              name
            }
            id
            pilot {
              name
            }
          }
          flightWhereDailyReportId(dailyReportId: ${id}) {
            id
            flightNumber
            from {
              name
            }
            to {
              name
            }
            etd
            atd
            ata
            eta
            delay
            delayCode
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
  createReport: async (data: Types.CreateReport, date: Date) => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
    mutation {
      createDailyReport(
        data: {
          date: "${date.toISOString()}"
          helicopterId: ${data.helicopter?.id}
          pilotId: ${data.pilot?.id}
          hoistOperatorId: ${data.hoistOperator?.id}
        }
      ) {
        id
      }
    }
  `,
    });
    return promise;
  },
};
