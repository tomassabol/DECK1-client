import axios from "axios";
import gql from "graphql-tag";

const axiosConfig = {
  baseURL: "https://api.deck1.sk",
};

export default {
  getDailyUpdates: async () => {
    const promise = await axios.post(
      axiosConfig.baseURL,
      {
        query: `
          {
            dailyUpdates {
              id
              flight {
                id
                flightNumber
                date
              }
              delay
            }
          }
        `,
      },
      axiosConfig
    );
    return promise;
  },

  getDailyUpdate: async (id: number | string) => {
    const promise = await axios.post(
      axiosConfig.baseURL,
      {
        query: `
          {
            dailyUpdate(id: ${id}) {
              id
              flight {
                id
                flightNumber
              }
              wasFlight
              delay
              delayCode
              delayTime
              delayDesc
              maintenance
              plannedMaintenance
              unplannedMaintenance
              otherMaintenance
              maintenanceNote
              baseAndEquipment
              note
            }
          }
        `,
      },
      axiosConfig
    );
    return promise;
  },

  createDailyUpdate: async (dailyUpdate: Types.CreateDailyUpdate) => {
    const promise = await axios.post(
      axiosConfig.baseURL,
      {
        query: `
          mutation {
            createDailyUpdate(
              input: {
                flightId: ${dailyUpdate.flightId}
                wasFlight: ${dailyUpdate.wasFlight}
                delay: ${dailyUpdate.delay}
                delayCode: "${dailyUpdate.delayCode}"
                delayTime: ${dailyUpdate.delayTime}
                delayDesc: "${dailyUpdate.delayDesc}"
                maintenance: ${dailyUpdate.maintenace}
                plannedMaintenance: ${dailyUpdate.plannedMaintenance}
                unplannedMaintenance: ${dailyUpdate.unplannedMaintenance}
                otherMaintenance: ${dailyUpdate.otherMaintenance}
                maintenanceNote: "${dailyUpdate.maintenanceNote ?? ""}"
                baseAndEquipment: ${dailyUpdate.baseAndEquipment}
                note: "${dailyUpdate.note ?? ""}"
              }
            ) {
              id
            }
          }
        `,
      },
      axiosConfig
    );
    return promise;
  },
};
