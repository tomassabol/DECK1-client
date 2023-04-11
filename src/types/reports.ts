namespace Types {
  export interface Report {
    id: number;
    date: Date | null;
    helicopter: Helicopter | null;
    pilot: Pilot | null;
    hoistOperator: HoistOperator | null;
  }

  export interface CreateReport {
    helicopter: Helicopter | null;
    pilot: Pilot | null;
    hoistOperator: HoistOperator | null;
  }
}
