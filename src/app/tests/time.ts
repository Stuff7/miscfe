import { expect, it } from "@app/test";
import { parseDuration, type Duration } from "@lib/time";

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
];
