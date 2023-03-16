namespace Types {
    export type Update = {
        flightNumber: string;
        date: Date;
        flight: boolean;
        reason: NoFlightReason | null;
        maintenance: boolean;
        baseAndEquipment: boolean;
    };
    export enum NoFlightReason {
        A = "Weather",
        B = "Maintenance",
        C = "Other",
    }
}
