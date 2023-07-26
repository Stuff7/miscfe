export function parseDuration(durationMs: number): Duration {
  const round = durationMs < 0 ? Math.ceil : Math.floor;
  const milliseconds = round(durationMs % 1000);
  const seconds = round(durationMs / 1000);
  const minutes = round(seconds / 60);
  const hours = round(minutes / 60);
  const days = round(hours / 24);

  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
    milliseconds,
  };
}

export function durationDisplay(duration: Duration | number): string {
  const d = typeof duration === "number" ? parseDuration(duration) : duration;

  return Object.entries(d).reduce((values, [unit, time]) => {
    if (time || unit === "milliseconds") {
      values.push(`${time}${unitDisplay[unit as keyof Duration][time === 1 ? 0 : 1]}`);
    }
    return values;
  }, [] as string[]).join(", ");
}

const unitDisplay: Record<keyof Duration, [singular: string, plural: string]> = {
  days: ["day", "days"],
  hours: ["h", "h"],
  minutes: ["m", "m"],
  seconds: ["s", "s"],
  milliseconds: ["ms", "ms"],
};

export type Duration = {
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number,
}

export const MILLIS_AS = {
  seconds: 1e3,
  minutes: 60e3,
  hours: 60e3 * 60,
  days: 60e3 * 60 * 24,
};

export const DAY = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};
