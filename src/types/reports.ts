namespace Types {
  export interface Report {
    id: number;
    date: Date;
    helicopter: Helicopter;
    pilot: Pilot;
    hoistOperator: HoistOperator;
  }

  export interface CreateReport {
    helicopter: Helicopter | null;
    pilot: Pilot | null;
    hoistOperator: HoistOperator | null;
  }
}
