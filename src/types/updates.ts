namespace Types {
  export interface UpdateSearch {
    id: string;
    date: Date;
    flight: boolean;
    reason: NoFlightReason | null;
    maintenance: boolean;
    baseAndEquipment: boolean;
  }
  export enum NoFlightReason {
    A = "Weather",
    B = "PAX late",
    C = "Crew",
    D = "Refueling",
    E = "ATC",
    F = "A/C late",
    G = "Technics",
    H = "Other",
  }
  export interface Update {
    id: number;
    flight: Flight;
    date: Date;
    wasFlight: boolean;
    delayReason: string;
    delayReasonDesc: string;
    maintenace: boolean;
    plannedMaintenance: boolean;
    unplannedMaintenance: boolean;
    otherMaintenance: boolean;
    maintenanceDesc: string;
    baseAndEquipment: boolean;
    note: string;
  }
}
