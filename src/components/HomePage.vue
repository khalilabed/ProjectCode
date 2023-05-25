<template >
  <div>
    <side-bar></side-bar>
    <div id="layoutSidenav_content">
      <main>
        <div class="container-fluid px-4">
          <h1 class="mt-4">الرئيسية</h1>
          <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">هيا قم بادارة مصروفاتك ...</li>
          </ol>
          <div class="row dd">
            <div class="col-xl-4 col-md-6">
              <div class="card text-white mb-4">
                <div class="card-body text-center fs-5 fw-bold">
                  اجمالي الراتب
                  <hr />
                </div>
                <p class="fs-3 fw-bold py-2 text-center">
                  {{ dataList.totalSalary }}
                </p>
                <div
                  class="card-footer d-flex align-items-center justify-content-between"
                >
                  <div class="small text-white py-3"></div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6">
              <div class="card text-white mb-4">
                <div class="card-body text-center fs-5 fw-bold">
                  الرصيد المتبقي
                  <hr />
                </div>
                <p class="fs-3 fw-bold py-2 text-center">
                  {{ dataList.remainingBalance }}
                </p>
                <div
                  class="card-footer d-flex align-items-center justify-content-between"
                >
                  <div class="small text-white py-3"></div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6">
              <div class="card text-white mb-4">
                <div class="card-body text-center fs-5 fw-bold">
                  الرصيد المنفق
                  <hr />
                </div>
                <p class="fs-3 fw-bold py-2 text-center">
                  {{ dataList.spentBalance }}
                </p>
                <div
                  class="card-footer d-flex align-items-center justify-content-between"
                >
                  <div class="small text-white py-3"></div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6">
              <div class="card bg-danger text-white mb-4">
                <div class="card-body text-center fs-5 fw-bold">
                  نسبة الصرف لهذا الشهر
                  <hr />
                </div>
                <p class="fs-3 fw-bold py-2 text-center">
                  <span>{{ dataList.expensePercentage }}</span>
                </p>
                <div
                  class="card-footer d-flex align-items-center justify-content-between"
                >
                  <div class="small text-white py-3"></div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6">
              <div class="card text-white mb-4">
                <div class="card-body text-center fw-bold fs-5">
                  نوع المصروفات
                  <hr />
                </div>
                <p class="fs-5 fw-bold text-center">
                  طعام , علاج , سكن
                  <br />
                  , مواصلات , تعليم , غير ذلك
                </p>
                <div
                  class="card-footer d-flex align-items-center justify-content-between"
                >
                  <div class="small text-white py-3"></div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6">
              <div class="card text-white mb-4">
                <div class="card-body text-center fs-5 fw-bold">
                  قائمة المصروفات
                  <hr />
                </div>
                <p class="fs-3 fw-bold py-2 text-center">
                  {{ dataList.totalExpense }}
                </p>
                <div
                  class="card-footer d-flex align-items-center justify-content-between"
                >
                  <div class="small text-white py-3"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="row">
              <div class="card mb-4">
                <div class="card-header">
                  <i class="fas fa-chart-pie me-1 fw-bold"></i>
                  متوسط المصورف الشهري => عرض متوسط حسابي
                </div>
                <div class="card-body">
                  <canvas
                    id="myChart"
                    style="width: 100%; max-width: 100%; height: 350px"
                  ></canvas>
                </div>
              </div>
            </div>
            <div class="card mb-4">
              <div class="card-header">
                <i class="fas fa-table me-1"></i>
                مجموع المصروفات الشهرية
              </div>
              <div class="card-body">
                <table class="table table-hover text-center">
                  <thead class="">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">نوع المصروف</th>
                      <th scope="col">قيمة الدفع</th>
                      <th scope="col">ملاحظات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="data in dataList.expenses" :key="data.id">
                      <td class="fw-bold">{{ data._id }}</td>
                      <td class="text-muted">{{ data.type }}</td>
                      <td>
                        {{ data.amount }}
                        <i class="fa-solid fa-dollar-sign text-muted"></i>
                      </td>
                      <td class="text-muted">{{ data.comments }}</td>
                    </tr>
                    <tr class="tt">
                      <td colspan="1" class="fw-bold">المجموع :</td>
                      <td colspan="3" class="fw-bold">
                        {{ dataList.spentBalance }}$
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer class="py-4 bg-light mt-auto">
        <div class="container-fluid px-4">
          <div class="d-flex align-items-center justify-content-center small">
            <div class="text-muted">Copyright &copy; Your Website 2022</div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
// import SideBar from '@/components/SideBar.vue'
import Chart from "chart.js/auto";
import SideBar from "./SideBar";
import axios from "axios";

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    this.fetchData();
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        data: [],
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
  methods: {
    fetchData() {
      axios
        .get("http://localhost:3000/expense/")
        .then((response) => {
          this.dataList = response.data;
          console.log(this.dataList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
