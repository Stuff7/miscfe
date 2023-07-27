import { expect, it } from "@app/test";
import { parseDuration, type Duration, durationDisplay } from "@lib/time";

export const testCases = [
  it("Handles 0 milliseconds", () => {
    const input = 0;
    const result = parseDuration(input);
    const expected: Duration = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    };
    return expect(result).toEqual(expected);
  }),

  it("Handles milliseconds less than a second", () => {
    const input = 999;
    const result = parseDuration(input);
    const expected: Duration = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 999,
    };
    return expect(result).toEqual(expected);
  }),

  it("Handles 1 second", () => {
    const input = 1000;
    const result = parseDuration(input);
    const expected: Duration = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1,
      milliseconds: 0,
    };
    return expect(result).toEqual(expected);
  }),

  it("Handles 1 minute", () => {
    const input = 60 * 1000;
    const result = parseDuration(input);
    const expected: Duration = {
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 0,
      milliseconds: 0,
    };
    return expect(result).toEqual(expected);
  }),

  it("Handles 1 hour", () => {
    const input = 60 * 60 * 1000;
    const result = parseDuration(input);
    const expected: Duration = {
      days: 0,
      hours: 1,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    };
    return expect(result).toEqual(expected);
  }),

  it("Handles 1 day", () => {
    const input = 24 * 60 * 60 * 1000;
    const result = parseDuration(input);
    const expected: Duration = {
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    };
    return expect(result).toEqual(expected);
  }),

  it("Handles mixed duration", () => {
    const input = 4 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000 + 37 * 60 * 1000 + 25 * 1000 + 123;
    const result = parseDuration(input);
    const expected: Duration = {
      days: 4,
      hours: 5,
      minutes: 37,
      seconds: 25,
      milliseconds: 123,
    };
    return expect(result).toEqual(expected);
  }),

  it("Handles milliseconds equal to one second", () => {
    const input = 1000;
    const result = parseDuration(input);
    const expected: Duration = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1,
      milliseconds: 0,
    };
    return expect(result).toEqual(expected);
  }),

  it("Handles milliseconds equal to one minute", () => {
    const input = 60 * 1000;
    const result = parseDuration(input);
    const expected: Duration = {
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 0,
      milliseconds: 0,
    };
    return expect(result).toEqual(expected);
  }),

  it("Handles milliseconds equal to one hour", () => {
    const input = 60 * 60 * 1000;
    const result = parseDuration(input);
    const expected: Duration = {
      days: 0,
      hours: 1,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    };
    return expect(result).toEqual(expected);
  }),

  it("Handles milliseconds equal to one day", () => {
    const input = 24 * 60 * 60 * 1000;
    const result = parseDuration(input);
    const expected: Duration = {
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    };
    return expect(result).toEqual(expected);
  }),

  it("Handles milliseconds greater than one day", () => {
    const input = 3 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 45 * 60 * 1000 + 37 * 1000 + 555;
    const result = parseDuration(input);
    const expected: Duration = {
      days: 3,
      hours: 12,
      minutes: 45,
      seconds: 37,
      milliseconds: 555,
    };
    return expect(result).toEqual(expected);
  }),

  it("Handles milliseconds less than 1 millisecond", () => {
    const input = 0.1234;
    const result = parseDuration(input);
    const expected: Duration = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    };
    return expect(result).toEqual(expected);
  }),

  it("Handles negative duration", () => {
    const input = -1234567;
    const result = parseDuration(input);
    const expected: Duration = {
      days: -0,
      hours: -0,
      minutes: -20,
      seconds: -34,
      milliseconds: -567,
    };
    return expect(result).toEqual(expected);
  }),

  // Test cases for valid input (Duration objects)
  it("Returns correct duration string for Duration object", () => {
    const durationObj = createDuration(2, 3, 15, 30, 500);
    return expect(durationDisplay(durationObj)).toBe("2 days, 3h, 15m, 30s, 500ms");
  }),

  it("Returns correct duration string for Duration object with zero values", () => {
    const durationObj = createDuration(0, 0, 0, 0, 0);
    return expect(durationDisplay(durationObj)).toBe("0ms");
  }),

  it("Returns correct duration string for Duration object with single unit", () => {
    const durationObj = createDuration(0, 0, 0, 0, 500);
    return expect(durationDisplay(durationObj)).toBe("500ms");
  }),

  it("Returns correct duration string for Duration object with only higher units", () => {
    const durationObj = createDuration(5, 0, 0, 0, 0);
    return expect(durationDisplay(durationObj)).toBe("5 days");
  }),

  // Test cases for valid input (milliseconds)
  it("Returns correct duration string for positive milliseconds", () => {
    const milliseconds = 123456789;
    return expect(durationDisplay(milliseconds)).toBe("1 day, 10h, 17m, 36s, 789ms");
  }),

  it("Returns correct duration string for zero milliseconds", () => {
    const milliseconds = 0;
    return expect(durationDisplay(milliseconds)).toBe("0ms");
  }),

  it("Returns correct duration string for negative milliseconds", () => {
    const milliseconds = -123456789;
    return expect(durationDisplay(milliseconds)).toBe("-1 day, -10h, -17m, -36s, -789ms");
  }),

  // Test cases for invalid input
  it("Throws 'Invalid type passed' error for undefined input", () => {
    // @ts-expect-error: Testing errors
    return expect(() => durationDisplay(undefined)).toThrow("Invalid type passed");
  }),

  it("Throws 'Invalid type passed' error for null input", () => {
    // @ts-expect-error: Testing errors
    return expect(() => durationDisplay(null)).toThrow("Invalid type passed");
  }),

  it("Throws 'Invalid type passed' error for non-number and non-object input", () => {
    // @ts-expect-error: Testing errors
    return expect(() => durationDisplay("invalid")).toThrow("Invalid type passed");
  }),
];

function createDuration(days: number, hours: number, minutes: number, seconds: number, milliseconds: number) {
  return { days, hours, minutes, seconds, milliseconds };
}
