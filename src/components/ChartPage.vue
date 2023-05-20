<template>
<side-bar></side-bar>
  <div id="layoutSidenav_content">
    <main>
      <div class="container-fluid px-4">
        <h1 class="mt-4">متوسط الصرف </h1>
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item text-muted "> نسبة المصروف الشهري</li>
        </ol>
        <div class="card mb-4">
          <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header">
                  <i class="fas fa-chart-bar me-1"></i>
                  احصائية المصروف الشهري
                </div>
                <div class="card-body">
                  <canvas
                    id="myChart"
                    style="width: 100%; max-width: 100%; height: 350px"
                  ></canvas>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script>
import Chart from "chart.js/auto";
import SideBar from './SideBar';
export default {
  components: { SideBar },

  mounted() {
    console.log("khalil abed al al naebe");
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["تعليم", "سكن", "علاج", "طعام", "مواصلات", "غيرذلك"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    myChart;
    
  },
};

</script>
