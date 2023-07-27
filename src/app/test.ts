import { deepCompare } from "@lib/object";
import { parseDuration, type Duration } from "@lib/time";
import { reactive } from "vue";

export default function useTestRunner<T, U>(
  testCases: TestCase<T, U>[],
  cleanup?: () => void,
): [TestRecord<T, U>, () => void] {
  const tests = reactive<TestRecord<T, U>>({});

  const runTests = () => testCases.forEach(([testDescription, assertion]) => {
    tests[testDescription] = { duration: parseDuration(0), status: "running" };
    const test = tests[testDescription];
    const start = performance.now();
    try {
      test.assertion = assertion();
      test.status = test.assertion.success ? "passed" : "failed";
    } catch (e) {
      test.status = "error";
      console.error("Error running test:", testDescription, "\n", e);
      test.errorMessage = `${e}`;
    }
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

export function expect<T>(received: T) {
  let negate = false;

  const methods = {
    toBe<U>(expected: T | U): Assertion<T, U> {
      const success = received === expected;
      return {
        success: negate ? !success : success,
        check: "equality",
        negate,
        received,
        expected,
      };
    },
    toEqual<U>(expected: T | U): Assertion<T, U> {
      const success = deepCompare(received as Record<string, unknown>, expected as Record<string, unknown>);
      return {
        success: negate ? !success : success,
        check: "equality",
        negate,
        received,
        expected,
      };
    },
    toThrow<E extends Error | ErrorConstructor | string>(expected?: E): Assertion<unknown, typeof expected> {
      const assertion: Assertion<unknown, typeof expected> = {
        success: false,
        check: "throws",
        negate,
        received,
        expected,
      };

      const assert = (e: unknown) => {
        const success = (
          !expected ||
          (expected instanceof Function && e instanceof expected) ||
          ((expected instanceof Error || typeof expected === "string") &&
            e instanceof Error && String(e).includes(String(expected))) ||
          e === expected
        );
        assertion.received = e;
        if (expected instanceof Function) {
          assertion.expected = expected.name;
        }
        assertion.success = negate ? !success : success;
        return assertion;
      };

      if (typeof received !== "function") {
        return assert(received);
      }

      try {
        assertion.received = received();
        assertion.success = negate ? !assertion.success : assertion.success;
        return assertion;
      } catch(e) {
        return assert(e);
      }
    },
  };

  return new Proxy(methods as typeof methods & { not: typeof methods }, {
    get(target, prop) {
      negate = prop === "not";
      return prop in target ? target[prop as keyof typeof target] : target;
    },
  });
}

export type Assertion<T, U> = {
  check: "equality" | "throws",
  negate: boolean,
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
