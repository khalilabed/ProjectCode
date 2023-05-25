<template>
  <div>
    <side-bar></side-bar>
    <div id="layoutSidenav_content">
      <main>
        <div class="container-fluid px-4">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <h1 class="mt-4">تسجيل المصروفات</h1>
              <p class="text-muted">قم بتسجيل مصروفاتك الشهرية ..</p>
            </div>
          </div>
        </div>
        <div class="container px-4">
          <form @submit.prevent="submitForm">
            <div class="mb-3 d-flex justify-content-between align-items-center">
              <input
                type="date"
                class="form-control"
                id="exampleFormControlInput1"
                v-model="newRow.createdAt"
              />
              <label
                for="exampleFormControlInput1"
                class="form-label fw-bold fs-5"
                >: التاريخ</label
              >
            </div>

            <div class="mb-3 d-flex justify-content-between align-items-center">
              <select
                class="form-select text-muted"
                aria-label="Default select example"
                id="select"
                v-model="newRow.type"
              >
                <option selected>انواع فئات المصروفات</option>
                <option value="مواصلات">مواصلات</option>
                <option value="علاج">علاج</option>
                <option value="طعام">طعام</option>
                <option value="تعليم">تعليم</option>
                <option value="مصروفات اخرى">مصروفات اخرى</option>
              </select>
              <label for="select" class="fw-bold fs-5"> : الفئة</label>
            </div>

            <div class="mb-3 d-flex justify-content-between align-items-center">
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="قيمة المبلغ ..."
                v-model="newRow.amount"
              />
              <label for="exampleFormControlInput1" class="form-label fw-bold"
                >: المبلغ المدفوع
              </label>
            </div>

            <div class="tops my-3 d-flex justify-content-between">
              <textarea
                placeholder="ادخل الملاحظات ..."
                id="nots"
                v-model="newRow.comments"
              ></textarea>
              <label for="nots" class="fw-bold">: الملاحظات </label>
            </div>
            <button
              type="submit"
              class="btn btn-primary mb-3"
              @click="updateUser(newRow._id)"
            >
              {{ formMode === "add" ? "Add" : "Save" }}
            </button>
          </form>
          <div class="card mb-4">
            <div class="card-header">
              <i class="fas fa-table me-1"></i>
              تسجيل المصروفات الشهرية
            </div>
            <div class="card-body">
              <table class="table table-hover text-center">
                <thead class="bg-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">التاريخ</th>
                    <th scope="col">الفئة</th>
                    <th scope="col">المبلغ المدفوع</th>
                    <th scope="col">ملاحظات</th>
                    <th scope="col">تعديل</th>
                    <th scope="col">حذف</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in userList" :key="user.id">
                    <td class="fw-bold">{{ user._id }}</td>
                    <td class="text-muted">{{ user.createdAt }}</td>
                    <td class="text-muted">{{ user.type }}</td>
                    <td>
                      {{ user.amount }}
                      <i class="fa-solid fa-dollar-sign text-muted"></i>
                    </td>
                    <td class="text-muted">{{ user.comments }}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary padd-butt fw-bold"
                        @click="editUser(user)"
                      >
                        تعديل المصروف
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger padd-butt fw-bold"
                        @click="deleteUser(user._id)"
                      >
                        حذف المصروف
                      </button>
                    </td>
                    <!-- <td>
                    
                  </td> -->
                  </tr>
                </tbody>
              </table>
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
  components: {
    SideBar,
  },
  data() {
    return {
      formMode: "add",
      newRow: {
        _id: null,
        type: "",
        amount: null,
        createdAt: "",
        comments: "",
      },
      userList: [],
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
          this.userList = response.data.expenses;
          console.log(response.data.expenses);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitForm() {
      if (this.formMode === "add") {
        this.addUser();
      } else {
        this.saveUser();
      }
      this.resetForm();
    },

    addUser() {
      axios
        .post(`http://localhost:3000/expense/`, this.newRow)
        .then((response) => {
          console.log(response);
          this.fetchData();
          this.newRow.createdAt = "";
          this.newRow.type = "";
          this.newRow.amount = "";
          this.newRow.comments = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editUser(user) {
      this.formMode = "edit";
      this.newRow = { ...user };
    },
    updateUser(_id) {
      console.log(_id);
      if (this.formMode === "edit") {
        axios
          .put(`http://localhost:3000/expense/${_id}`, this.newRow)
          .then((response) => {
            console.log(response);
            this.fetchData();
            this.newRow.createdAt = "";
            this.newRow.type = "";
            this.newRow.amount = "";
            this.newRow.comments = "";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    saveUser() {
      const index = this.userList.findIndex(
        (user) => user._id === this.newRow._id
      );
      if (index > -1) {
        this.userList[index].createdAt = this.newRow.createdAt;
        this.userList[index].type = this.newRow.type;
        this.userList[index].amount = this.newRow.amount;
        this.userList[index].comments = this.newRow.comments;
      }
    },
    deleteUser(_id) {
      console.log(_id);
      axios
        .delete(`http://localhost:3000/expense/${_id}`)
        .then((response) => {
          this.fetchData();
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    resetForm() {
      this.formMode = "add";
      this.formData = {
        _id: null,
        createdAt: "",
        resetForm() {
          this.formMode = "add";
          this.newRow = {
            // _id: null,
            createdAt: "",
            type: "",
            amount: "",
            comments: "",
          };
          this.formErrors = {};
        },
        validateForm() {
          this.formErrors = {};
          if (!this.formData.createdAt) {
            this.formErrors.createdAt = "dateAdd is required.";
          }
          if (!this.formData.type) {
            this.formErrors.type = "Email is required.";
          } else if (!this.validateEmail(this.formData.type)) {
            this.formErrors.type = "Invalid email format.";
          }
        },
        editUser(user) {
          this.formMode = "edit";
          this.newRow = { ...user };
        },
        // updateUser(_id) {
        //   // const index = this.tableData.findIndex(
        //   //   (user) => user._id === this.newRow._id
        //   // );
        //   // this.tableData.splice(index, 1, { ...this.newRow });
        //   axios
        //     .put(`http://localhost:3000/expense/${_id}`, this.newRow)
        //     .then((response) => {
        //       console.log(response);
        //       this.fetchData();
        //       this.newRow.createdAt = "";
        //       this.newRow.type = "";
        //       this.newRow.amount = "";
        //       this.newRow.comments = "";
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        //   // this.resetForm();
        // },
        deleteUser(_id) {
          // const index = this.tableData.findIndex((item) => item._id === user.id);
          // this.tableData.splice(index, 1);
          axios
            .delete(`http://localhost:3000/expense/${_id}`)
            .then((response) => {
              this.fetchData();
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        },
      };
    },
    
  },
};
</script>


<style  scoped>
form {
  direction: ltr !important;
  width: 78%;
}
.form-control,
.form-select {
  width: 75% !important;
  direction: rtl !important;
}
textarea {
  outline: none;
  width: 75%;
  height: 200px;
  direction: rtl !important;
  border: silver 1px solid;
  padding: 10px;
}
</style>

