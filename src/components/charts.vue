
// <script>
// import { line } from 'vue-chartjs'

// export default {
//   extends: line,
//   props: {
//     chartdata: {
//       type: Object,
//       default: null
//     },
//     options: {
//       type: Object,
//       default: null
//     }
//   },
//   mounted () {
//     this.renderChart(this.chartdata, this.options)
//   }
// }
// </script>

<script>
import { Doughnut  } from "vue-chartjs";

export default {
  extends: Doughnut ,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "GitHub Commits",
          backgroundColor: "#f87979",
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
        },
      ],
    });
  },
};
</script>

<style>
</style>