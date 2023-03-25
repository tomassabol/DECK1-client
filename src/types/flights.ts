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
    flightNumber: string;
    from: string;
    via: string;
    to: string;
    etd: string;
    rotorStart: string;
    atd: string;
    eta: string;
    rotorStop: string;
    ata: string;
    blockTime: string;
    flightTime: string;
    delay: boolean;
    delayReason: string;
    delayDescription: string;
    pax: number;
    paxTax: number;
    cargoPerPerson: number;
    hoistCycles: number;
  }
}
