<template>
  <header>
    <span class="title">都道府県別の人口推移比較</span>
  </header>
  <div class="checkbox-container">
    <div v-for="pref in prefList" :key="pref.prefCode">
      <input
        type="checkbox"
        :name="pref.prefName"
        @input="handleInput($event, pref.prefCode)"
      />
      <span>{{ pref.prefName }}</span>
    </div>
  </div>

  <chart class="chart" :data="chartData" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { prefData } from "@/types/api";
import chart from "@/components/chart.vue";
import { usePrefStore } from "@/stores/counter";

const store = usePrefStore();

const prefList = computed<prefData[]>(() => store.$state.prefList);
const displayList = ref<number[]>([]);

const handleInput = async (e: Event, prefCode: number): Promise<void> => {
  if ((e.target as HTMLInputElement).checked) {
    await store.getPrefComposition(prefCode);
    displayList.value.push(prefCode);
  } else {
    const targetIndex = displayList.value.findIndex(
      (element: number) => element === prefCode
    );
    displayList.value.splice(targetIndex, 1);
  }
};

const chartData = computed(() => {
  return displayList.value.map((element) => {
    return {
      name: store.getPrefNameFromCode(element),
      data: store.$state.compData[element - 1]?.data[0].data.map(
        (ele: { year: number; value: number }) => ele.value
      ),
    };
  });
});

onMounted(() => {
  store.requestPrefList();
});
</script>

<style lang="scss">
header {
  color: white;
  height: 60px;
  background-color: rgba(56, 56, 223, 0.7);
  padding: 0 40px;

  display: flex;
  align-items: center;

  .title {
    font-size: 24px;
    font-weight: 600;
  }
}
.checkbox-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px 40px;
}

.chart {
  padding: 20px 40px 0;
}

@media screen and (max-width: 480px) {
  .checkbox-container {
    flex-direction: column;
    font-size: 20px;
  }

  .chart {
    padding: 40px 0;
  }
}
</style>
