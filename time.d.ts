export declare function parseDuration(durationMs: number): Duration;
export declare function durationDisplay(duration: Duration | number): string;
export type Duration = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
};
export declare const MILLIS_AS: {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
};
export declare const DAY: {
    sunday: number;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
};
