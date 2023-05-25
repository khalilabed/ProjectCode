<template>
  <div>
    <side-bar></side-bar>
    <div id="layoutSidenav_content">
      <main>
        <div class="container-fluid px-4">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <h1 class="mt-4">قائمة المصروفات</h1>
              <p class="text-muted">قم بتسجيل مصروفاتك الشهرية ..</p>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-primary py-2"
                @click="exportToExcel"
              >
                طباعة Excel <i class="fa-solid fa-print"></i>
              </button>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-header">
              <i class="fas fa-table me-1"></i>
              عرض المصروفات الشهرية
            </div>
            <div class="card-body">
              <table class="table table-hover text-center" ref="myTable">
                <thead class="bg-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">التاريخ</th>
                    <th scope="col">الفئة</th>
                    <th scope="col">المبلغ المدفوع</th>
                    <th scope="col">ملاحظات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in data" :key="data.id">
                    <td class="fw-bold">{{ data._id }}</td>
                    <td class="text-muted">{{ data.createdAt }}</td>
                    <td class="text-muted">{{ data.type }}</td>
                    <td>
                      {{ data.amount }}
                      <i class="fa-solid fa-dollar-sign text-muted"></i>
                    </td>
                    <td class="text-muted">{{ data.comments }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <footer class="py-4 bg-light mt-auto">
        <div class="container-fluid px-4">
          <div class="d-flex align-items-center justify-content-between small">
            <div class="text-muted">Copyright &copy; Your Website 2022</div>
            <div></div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import SideBar from "./SideBar";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";
export default {
  components: {
    SideBar,
  },
  data() {
    return {
      data: [],
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
          this.data = response.data.expenses;
          console.log(response.data.expenses);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    exportToExcel() {
      const wb = XLSX.utils.table_to_book(this.$refs.myTable, {
        sheet: "Sheet JS",
      });
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
      saveAs(
        new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
        "table.xlsx"
      );
    },
  },
};
</script>
