namespace Types {
  export interface FlightTable {
    id: string; // flight number
    from: string; // TODO: change to Site type
    via: string; // TODO: change to Site type
    to: string; // TODO: change to Site type
    ETD: Date; // change to Date type
    ATD: Date; // change to Date type
    ETA: Date; // change to Date type
    ATA: Date; // change to Date type
    delay: string;
    Code: string; // change to some enum type
  }

  export interface Flight {
    id: number;
    flightNumber: string;
    from: Heliport;
    via: Site[];
    to: Heliport;
    etd: Date;
    rotorStart: Date;
    atd: Date;
    eta: Date;
    rotorStop: Date;
    ata: Date;
    blockTime: number;
    flightTime: number;
    delay: boolean;
    delayMin: number;
    delayCode: DelayCode;
    delayDesc: string;
    pax: number;
    paxTax: number;
    cargoPP: number;
    hoistCycles: number;
    notes: string;
    dailyReport: Report;
    dailyUpdate?: Update;
  }

  export type DelayCode = {
    code: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J";
  };
}
