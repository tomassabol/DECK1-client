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
