namespace Types {
    export interface Flight {
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
}
