<template>
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
              v-model="formData.dateAdd"
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
              v-model="formData.selectAdd"
            >
              <option selected>انواع فئات المصروفات</option>
              <option value="1">مواصلات</option>
              <option value="2">علاج</option>
              <option value="3">طعام</option>
              <option value="3">تعليم</option>
              <option value="3">مصروفات اخرى</option>
            </select>
            <label for="select" class="fw-bold fs-5"> : الفئة</label>
          </div>

          <div class="mb-3 d-flex justify-content-between align-items-center">
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="قيمة المبلغ ..."
              v-model="formData.salaryAdd"
            />
            <label for="exampleFormControlInput1" class="form-label fw-bold"
              >: المبلغ المدفوع
            </label>
          </div>

          <div class="tops my-3 d-flex justify-content-between">
            <textarea
              placeholder="ادخل الملاحظات ..."
              id="nots"
              v-model="formData.notsAdd"
            ></textarea>
            <label for="nots" class="fw-bold">: الملاحظات </label>
          </div>

          <button type="submit" class="btn btn-primary mb-3">
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
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
      formData: {
        _id: null,
        createdAt: "",
        type: "",
        amount: null,
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
      // const newId = this.userList.length + 1;
      const newUser = {
        // _id: newId,
        createdAt: this.formData.createdAt,
        type: this.formData.type,
        amount: this.formData.amount,
        comments: this.formData.comments,
      };
      // this.userList.push(newUser);
      axios
        .post(`http://localhost:3000/expense/`, newUser)
        .then((response) => {
          console.log(response);
          this.fetchData();
          this.formData.createdAt = "";
          this.formData.type = "";
          this.formData.amount = "";
          this.formData.comments = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editUser(user) {
      this.formMode = "edit";
      this.formData = { ...user };
    },
    saveUser() {
      const index = this.userList.findIndex(
        (user) => user._id === this.formData._id
      );
      if (index > -1) {
        this.userList[index].createdAt = this.formData.createdAt;
        this.userList[index].type = this.formData.type;
        this.userList[index].amount = this.formData.amount;
        this.userList[index].comments = this.formData.comments;
      }
    },
    deleteUser(_id) {
      axios
        .delete(`http://localhost:3000/expense/${_id}`)
        .then((response) => {
          this.fetchData();
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
          this.formData = {
            _id: null,
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
        addUser() {
          const newUser = {
            type: this.formData.type,
            amount: this.formData.amount,
            createdAt: this.formData.createdAt,
            comments: this.formData.comments,
          };
          // this.userList.push(newUser);
          axios
            .post(`http://localhost:3000/expense/`, newUser)
            .then((response) => {
              console.log(response);
              this.fetchData();
              this.formData.createdAt = "";
              this.formData.type = "";
              this.formData.amount = "";
              this.formData.comments = "";
            })
            .catch((error) => {
              console.log(error);
            });
        },
        editUser(user) {
          this.formMode = "edit";
          this.formData = { ...user };
        },
        updateUser() {
          const index = this.tableData.findIndex(
            (user) => user._id === this.formData._id
          );
          this.tableData.splice(index, 1, { ...this.formData });
          this.resetForm();
        },
        deleteUser(_id) {
          // const index = this.tableData.findIndex((item) => item._id === user.id);
          // this.tableData.splice(index, 1);
          axios
            .delete(`http://localhost:3000/expense/${_id}`)
            .then((response) => {
              this.fetchData();
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

