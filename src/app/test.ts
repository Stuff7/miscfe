import { parseDuration, type Duration } from "@lib/time";
import { reactive } from "vue";

export default function useTestRunner(testCases: TestCase[], cleanup?: () => void): [TestRecord, () => void] {
  const tests = reactive<TestRecord>({});

  const runTests = () => testCases.forEach(([testDescription, assertion], i) => {
    tests[testDescription] = { duration: parseDuration(0), status: "running" };
    const start = performance.now();
    setTimeout(() => {
      tests[testDescription].status = assertion() ? "passed" : "failed";
      tests[testDescription].duration = parseDuration(performance.now() - start);
    }, i * 600);
    cleanup?.();
  });
  runTests();

  return [tests, runTests];
}

export type TestRecord = Record<string, TestResult>;

export type TestResult = {
  status: TestResultStatus,
  duration: Duration,
}

export type TestResultStatus = "running" | "passed" | "failed";

export type TestCase = [string, () => boolean];

export function it(description: string, assertion: () => boolean): TestCase {
  return [description, assertion];
}

export function each<T>(items: T[], cb: (item: T) => TestCase[]): TestCase[] {
  return items.map((item) => cb(item as T)).flat();
}
