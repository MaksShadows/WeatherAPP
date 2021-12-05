<template>
  <div class="chart ma-3">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import ChartJsPluginDataLabels from "chartjs-plugin-datalabels";

export default {
  extends: Line,
  computed: {
    chartValues() {
      return this.$store.getters.getChartValues;
    },
    chartLabels() {
      return this.$store.getters.getChartLabels;
    },
  },
  mounted() {
    this.addPlugin(ChartJsPluginDataLabels);
    this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
          {
            data: this.chartValues,
            fill: false,
            pointBackgroundColor: "#fff",
            borderColor: "rgba(255,255,255,0.5)",
            borderWidth: 1,
            lineTension: 0,
          },
        ],
      },
      {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                suggestedMin: Math.min(...this.chartValues) - 2,
                suggestedMax: Math.max(...this.chartValues) + 2,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                offsetGridLines: true,
                color: "rgba(255,255,255,0.1)",
              },
              ticks: {
                fontColor: "#fff",
              },
            },
          ],
        },
        plugins: {
          datalabels: {
            color: "#fff",
            align: "end",
            font: {
              size: 12,
            },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
      }
    );
  },
};
</script>
<style lang="scss" scoped>
.chart {
  min-height: 150px;
}
</style>
