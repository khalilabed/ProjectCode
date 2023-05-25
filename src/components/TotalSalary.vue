<template>
  <div>
    <side-bar></side-bar>
    <div id="layoutSidenav_content">
      <div class="d-flex align-items-center justify-content-between pe-3">
        <div>
          <h1 class="mt-4 px-4">الراتب الاجمالي</h1>
          <p class="text-muted">هيا قم بادارة راتبك ...</p>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center flex-column">
        <form action="" class="size py-5">
          <div class="d-flex align-items-center justify-content-around">
            <label for="" class="fw-bold"> الراتب الاجمالي :</label>
            <input
              type="text"
              class="tops form-control padinp"
              placeholder="ادخل قيمة راتبك الشهرية"
              v-model="monthly_salary"
            />
            <button
              type="button"
              class="btn btn-primary padd-butt fw-bold me-3 mm ms-3 padinp"
              @click="save()"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
      <main>
        <div class="container-fluid px-4">
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
        <div class="container-fluid px-4 py-5">
          <div class="card mb-4">
            <div class="card-header">
              <i class="fas fa-table me-1"></i>
              الاجمالي الكلي
            </div>
            <div class="card-body rateb py-5">
              <div
                class="d-flex justify-content-around align-items-center text-center"
              >
                <div class="card text-white mb-3" style="max-width: 18rem">
                  <div class="card-header">الراتب الكلي</div>
                  <div class="card-body">
                    <!-- <h5 class="card-title">2000$</h5> -->
                    {{ dataList.totalSalary }}
                  </div>
                </div>
                <p><i class="fa-solid fa-minus fw-bold fa-2x"></i></p>
                <div class="card text-white mb-3" style="max-width: 18rem">
                  <div class="card-header">الراتب المنفق</div>
                  <div class="card-body">
                    <!-- <h5 class="card-title">{{ aa }} $</h5> -->
                    {{ dataList.spentBalance }}
                  </div>
                </div>
                <p><i class="fa-solid fa-equals fw-bold fa-2x"></i></p>
                <div class="card text-white mb-3" style="max-width: 18rem">
                  <div class="card-header">الراتب المتبقي</div>
                  <div class="card-body">
                    <!-- <h5 class="card-title">1000$</h5> -->
                    {{ dataList.remainingBalance }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import SideBar from "./SideBar";
import axios from "axios";

export default {
  components: { SideBar },
  data() {
    return {
      data: [],
      dataList: [],
      monthly_salary: null,
      total: [
        {
          text: "المجموع :",
          totelnum: "100",
        },
      ],
    };
  },
  mounted() {
    this.fetchData();
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

    save() {
      console.log(this.monthly_salary);
      axios
        .post("http://localhost:3000/expense/", {
          type: "نوع المصروف",
          amount: this.monthly_salary,
          comments: "ملاحظات",
        })
        .then((response) => {
          console.log(response);
          this.dataList.expenses.push(response.data); // إضافة البيانات الجديدة إلى this.dataList.expenses
          this.monthly_salary = null; // إعادة تفريغ حقل الإدخال
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  aa: ["1100"],
};
</script>