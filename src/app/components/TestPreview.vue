<script setup lang="ts">
import useTestRunner, { type TestCase, type TestResultStatus } from "@app/test";
import { durationDisplay } from "@lib/time";
import DIcon, { type IconName } from "d-components/DIcon.vue";
import DTooltip from "d-components/DTooltip.vue";
import { computed } from "vue";

const props = defineProps<{
  title: string,
  testCases: TestCase[],
  afterEach?: () => void,
  stats?: TestStats,
}>();
const emit = defineEmits<{ "update:stats": [stats: TestStats] }>();

export type TestStats = { passed: number, failed: number, running: number };

const [tests, runTests] = useTestRunner(props.testCases, props.afterEach);

const iconMap: Record<TestResultStatus, IconName> = {
  running: "spinner",
  failed: "times",
  passed: "check",
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
    <ul>
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
        <p>{{ description }}</p>
        <p v-if="result.status !== 'running'">
          {{ durationDisplay(result.duration) }}
        </p>
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

    .spinning {
      animation: rotate 2s linear infinite;
    }

    .running {
      color: var(--color-text-3);
    }

    .passed {
      color: var(--color-accent);
    }

    .failed {
      color: var(--color-error);
    }
  }

  @keyframes rotate {
    from { transform: rotate(0); }
    to { transform: rotate(360deg); }
  }
</style>
