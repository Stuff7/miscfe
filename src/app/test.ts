import { deepCompare } from "@lib/object";
import { parseDuration, type Duration } from "@lib/time";
import { reactive } from "vue";

export default function useTestRunner<T, U>(
  testCases: TestCase<T, U>[],
  cleanup?: () => void,
): [TestRecord<T, U>, () => void] {
  const tests = reactive<TestRecord<T, U>>({});

  const runTests = () => testCases.forEach(([testDescription, assertion], i) => {
    tests[testDescription] = { duration: parseDuration(0), status: "running" };
    const test = tests[testDescription];
    const start = performance.now();
    setTimeout(() => {
      try {
        test.assertion = assertion();
        test.status = test.assertion.success ? "passed" : "failed";
      } catch (e) {
        test.status = "error";
        console.error("Error running test:", testDescription, "\n", e);
        test.errorMessage = `${e}`;
      }
    }, 500 * i);
    test.duration = parseDuration(performance.now() - start);
    cleanup?.();
  });
  runTests();

  return [tests, runTests];
}

export function it<T, U>(description: string, assertion: () => Assertion<T, U>): TestCase<T, U> {
  return [description, assertion];
}

export function each<I, T, U, V extends TestCase<T, U>>(items: I[], cb: (item: I) => V[]): V[] {
  return items.map((item) => cb(item as I)).flat();
}

export function expect<T>(thing: T) {
  let invert = false;

  const methods = {
    toBe<U>(expectedThing: T | U): Assertion<T, U> {
      const success = thing === expectedThing;
      return {
        success: invert ? !success : success,
        check: invert ? "non-equality" : "equality",
        received: thing,
        expected: expectedThing,
      };
    },
    toEqual<U>(expectedThing: T | U): Assertion<T, U> {
      const success = deepCompare(thing as Record<string, unknown>, expectedThing as Record<string, unknown>);
      return {
        success: invert ? !success : success,
        check: invert ? "non-equality" : "equality",
        received: thing,
        expected: expectedThing,
      };
    },
  };

  return new Proxy(methods as typeof methods & { not: typeof methods }, {
    get(target, prop) {
      invert = prop === "not";
      return prop in target ? target[prop as keyof typeof target] : target;
    },
  });
}

export type Assertion<T, U> = {
  check: "equality" | "non-equality",
  received: T,
  expected: T | U,
  success: boolean,
};

export type TestRecord<T, U> = Record<string, TestResult<T, U>>;

export type TestResult<T, U> = {
  assertion?: Assertion<T, U>,
  status: TestResultStatus,
  errorMessage?: string,
  duration: Duration,
}

export type TestResultStatus = "running" | "passed" | "failed" | "error";

export type TestCase<T, U> = [string, () => Assertion<T, U>];
