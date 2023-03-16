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

    function isReport(report: any): report is Report {
        return report as Report !== undefined;
    }
}
