<template>
  <div id="chart-container" />
</template>

<script setup lang="ts">
import Highcharts from "highcharts";
import { onMounted, ref, watchEffect } from "vue";

const props = defineProps(["data"]);

const chart = ref<Highcharts.Chart | null>(null);
watchEffect((): void => {
  if (chart.value !== null) {
    chart.value = updateChart();
  }
});

const updateChart = (): Highcharts.Chart => {
  return Highcharts.chart({
    chart: {
      renderTo: "chart-container",
      type: "line",
    },
    title: {
      text: "都道府県別の人口推移 (1960年~2045年)",
    },

    yAxis: {
      title: {
        text: "総人口",
      },
    },

    xAxis: {
      categories: [
        "1960",
        "1965",
        "1970",
        "1975",
        "1980",
        "1985",
        "1990",
        "1995",
        "2000",
        "2005",
        "2010",
        "2015",
        "2020",
        "2025",
        "2030",
        "2035",
        "2040",
        "2045",
      ],
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    series: props.data,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });
};

onMounted(() => {
  chart.value = updateChart();
});
</script>
