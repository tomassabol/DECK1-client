import axios from "axios";
import gql from "graphql-tag";

const axiosConfig = {
  baseURL: "https://api.deck1.sk",
};

export default {
  getFlights: async () => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        query {
          flights {
            id
            eta
            etd
            flightNumber
            to {
              name
            }
            from {
              name
            }
            site {
              name
            }
            delay
          }
        }
      `,
    });
    return promise;
  },

  getFlightsPerDate: async (date: string) => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        query {
          flightsPerDay(date: "${date}") {
            id
            flightNumber
            from {
              id
              name
            }
            to {
              id
              name
            }
            etd
            eta
            site {
              id
              name
            }
            delay
          }
        }
      `,
    });
    return promise;
  },

  getFlight: async (id: number) => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        query {
          flightById(id: ${id}) {
            id
            ata
            atd
          blockTime
          cargoPP
          date
          delay
          delayCode
          delayNote
          delayTime
          editable
          eta
          etd
          flightNumber
          flightTime
          from {
            name
          }
          hoistCycles
          id
          note
          pax
          hoistOperator {
            name
          }
          paxTax
          pilot {
            name
          }
          rotorStart
          rotorStop
          site {
            name
            id
          }
          to {
            name
          }
          via {
            id
            name
          }
        }
      }`,
    });
    return promise;
  },

  getFlightDetails: async (siteId: number) => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        query {
          heliportsPerSite(siteId: ${siteId}) {
            id
            name
          }
          viaPerSite(siteId: ${siteId}) {
            id
            name
          }
        }`,
    });
    return promise;
  },
};
