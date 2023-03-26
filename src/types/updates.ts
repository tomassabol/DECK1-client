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
    id: string;
    date: string;
    flight: boolean;
    reason: string;
    maintenance: boolean;
    plannedMaintenance: boolean;
    unplannedMaintenance: boolean;
    baseAndEquipment: boolean;
  }
}
