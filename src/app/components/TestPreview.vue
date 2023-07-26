<script lang="ts">
export type TestStats = { passed: number, failed: number, running: number };
</script>

<script setup lang="ts" generic="T, U, V extends TestCase<T, U>">
import useTestRunner, { type TestCase, type TestResultStatus } from "@app/test";
import { durationDisplay } from "@lib/time";
import DIcon, { type IconName } from "d-components/DIcon.vue";
import DTooltip from "d-components/DTooltip.vue";
import { computed } from "vue";

const props = defineProps<{
  title: string,
  testCases: V[],
  afterEach?: () => void,
  stats?: TestStats,
}>();
const emit = defineEmits<{ "update:stats": [stats: TestStats] }>();

const [tests, runTests] = useTestRunner(props.testCases, props.afterEach);

const iconMap: Record<TestResultStatus, IconName> = {
  running: "spinner",
  failed: "times",
  passed: "check",
  error: "exclamation-triangle",
};

const suiteStatus = computed<TestResultStatus>(() => {
  const [passed, failed, running] = Object.values(tests).reduce((count, result) => {
    if (result.status === "passed") {
      count[0]++;
    } else if (result.status === "failed") {
      count[1]++;
    } else {
      count[2]++;
    }
    return count;
  }, [0, 0, 0]);

  emit("update:stats", { passed, failed, running });
  return failed ? "failed" : running ? "running" : "passed";
});
</script>

<template>
  <section :class="$style.TestPreview">
    <header :class="{ [$style.header]: true, [$style[suiteStatus]]: true, }">
      <d-icon
        :name="iconMap[suiteStatus]"
        :class="{ [$style.spinning]: suiteStatus === 'running' }"
      />
      <h1>{{ title }}</h1>
      <button
        :class="$style.refresh"
        :disabled="suiteStatus === 'running'"
        @click="runTests"
      >
        <d-icon name="refresh" />
        <d-tooltip>Re-run tests</d-tooltip>
      </button>
    </header>
    <ul v-if="suiteStatus !== 'passed'">
      <li
        v-for="result, description of tests"
        :key="description"
        :class="{
          [$style.testCase]: true,
          [$style[result.status]]: true,
        }"
      >
        <d-icon
          :name="iconMap[result.status]"
          :class="{ [$style.spinning]: result.status === 'running' }"
        />
        <p>
          {{ description }}
        </p>
        <p v-if="result.status !== 'running'">
          {{ durationDisplay(result.duration) }}
        </p>
        <div
          v-if="result.errorMessage"
          :class="$style.output"
        >
          <pre :class="$style.error">{{ result.errorMessage }}</pre>
        </div>
        <div
          v-if="result.assertion && result.status === 'failed'"
          :class="$style.output"
        >
          <p>
            <strong>Expected: </strong>
            <b
              v-if="result.assertion.check === 'non-equality'"
              :class="$style.error"
            >NOT </b>
            <pre>{{ result.assertion.expected }}</pre>
          </p>
          <p>
            <strong>Received: </strong>
            <pre>{{ result.assertion.received }}</pre>
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style module lang="scss">
  .TestPreview {
    padding: var(--spacing-nm-100) var(--spacing-nm-200);

    .header {
      display: grid;
      grid-template-columns: 1rem 1fr auto;
      gap: var(--spacing-nm-100);
      align-items: center;
    }

    .refresh {
      background: none;
      color: var(--color-text-1);
      font-size: var(--p-nm-200);

      &:hover {
        color: var(--color-accent);
      }

      &:disabled {
        opacity: 0.7;
        pointer-events: none;
      }
    }

    .testCase {
      display: grid;
      grid-template-columns: 1rem 1fr auto;
      gap: var(--spacing-nm-100);
    }

    .output {
      color: var(--color-text-1);
      grid-column: 2;
      background: var(--color-background-0);
      padding: var(--spacing-nm-100);
      border-radius: var(--radius-nm-100);

      pre {
        display: inline;
      }
    }

    .spinning {
      animation: rotate 2s linear infinite;
    }

    .running {
      color: var(--color-vanilla);
    }

    .passed {
      color: var(--color-success);
    }

    .failed {
      color: var(--color-fail);
    }

    .error {
      color: var(--color-error);
    }
  }

  @keyframes rotate {
    from { transform: rotate(0); }
    to { transform: rotate(360deg); }
  }
</style>
