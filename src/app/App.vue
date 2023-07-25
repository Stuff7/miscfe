<script setup lang="ts">
import TestPreview, { type TestStats } from "@app/components/TestPreview.vue";
import * as tests from "@app/tests";
import { computed, reactive } from "vue";

const testStats = reactive({} as Record<keyof typeof tests, TestStats>);
const totalTests = Object.values(tests).reduce((sum, { testCases }) => sum + testCases.length, 0);
const totalStats = computed(() => Object.values(testStats).reduce((total, stats) => {
  for (const stat in stats) {
    total[stat as keyof TestStats] += stats[stat as keyof TestStats];
  }
  return total;
}, { passed: 0, failed: 0, running: 0 }));
</script>

<template>
  <main :class="$style.App">
    <nav :class="$style.nav">
      <h1>Tests</h1>
      <p :class="$style.stat">
        <strong>Total:</strong>{{ totalTests }}
      </p>
      <p
        v-for="stat, statName in totalStats"
        :key="statName"
        :class="$style.stat"
      >
        <strong :class="{ [$style[statName]]: true }">{{ statName }}:</strong>{{ stat }}
      </p>
    </nav>
    <article :class="$style.output">
      <test-preview
        v-for="test, title in tests"
        :key="title"
        v-model:stats="testStats[title]"
        :title="title"
        :test-cases="test.testCases"
        :after-each="(test as typeof tests.storage).afterEach"
      />
    </article>
  </main>
</template>

<style module lang="scss">
  .App {
    display: grid;
    grid-template-rows: auto 1fr;
    color: var(--color-text-1);
    min-height: 100vh;

    .nav {
      display: flex;
      gap: var(--spacing-nm-100);
      align-items: center;

      & > * {
        flex: 0;
      }

      & > :first-child {
        flex: 1;
      }
      background: var(--color-background-2);
      border-bottom: 1px solid var(--color-background-3);
      padding: var(--spacing-nm-100) var(--spacing-nm-200);
    }

    .stat {
      display: flex;
      gap: var(--spacing-nm-100);
    }

    .passed {
      color: var(--color-accent);
    }

    .failed {
      color: var(--color-error);
    }

    .running {
      color: var(--color-text-3);
    }

    .output {
      background: var(--color-background-1);
      padding: var(--spacing-nm-100);
    }
  }
</style>
