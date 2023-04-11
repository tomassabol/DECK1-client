import axios from "axios";
import gql from "graphql-tag";

const axiosConfig = {
  baseURL: "https://api.deck1.sk",
};

export default {
  getFlight: async (id: string) => {
    const promise = axios.post(axiosConfig.baseURL, {
      query: `
        query {
          sites {
            id
            name
          }
          heliports {
            id
            name
          }
          flight(id: ${id}) {
            ata
            atd
            blockTime
            cargoPP
            delay
            delayCode
            delayDesc
            delayMin
            eta
            etd
            flightNumber
            flightTime
            hoistCycles
            id
            notes
            pax
            paxTax
            rotorStart
            rotorStop
            to {
              name
              id
            }
            via {
              id
              name
            }
            from {
              id
              name
            }
          }
        }
      `,
    });
    return promise;
  },
};
