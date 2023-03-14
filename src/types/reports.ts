namespace Types {
    export interface Report {
        id: string;
        acModel: string;
        acRegistration: string;
        date: Date;
        pilot: string;
        hoistOperator: string;
        dailyUpdate: boolean;
    }
}
