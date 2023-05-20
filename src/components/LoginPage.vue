<template>
    <!-- <div class="container">
        <form >
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">البريد الالكتروني</label>
                <input type="email" class="form-control" >
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">كلمة المرور </label>
                <input type="password" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary">تسجيل الدخول</button>
            <p>
                <router-link to="/forgot-password" class="nav-link text-warning fw-bold"> forgot password </router-link>
            </p>
        </form>
    </div> -->
     <div class="container">
    <h2 class="login-title">قم بتسجيل الدخول </h2>

    <form class="login-form" @submit.prevent="userLogin">
      <div class="my-2">
        <label for="email" class="fw-bold my-3">البريد الالكتروني :</label>
        <input id="email" type="email" placeholder="me@example.com" name="email" required  v-model="user.email" />
      </div>

      <div >
        <label for="password" class="fw-bold my-2">كلمة المرور  :</label>
        <input id="password" type="password" placeholder="كلمة المرور" name="password" required   v-model="user.password" />
      </div>

      <button class="btn btn--form" type="submit" value="Log in">
       تسجيل الدخول
      </button>
    </form>
     </div>

</template>
<script>
import firebase from 'firebase/compat/app'

export default {

      data(){
        return{
            user:{
                email:'',
                password: ''
            }
        }
    },
    methods:{
        userLogin(){
            firebase.auth()
            .signInWithEmailAndPassword(this.user.email ,this.user.password)
            .then(() =>{
                 this.$router.push('/HomePage')
            }).catch((error) =>{
                alert(error.message)
            })
        }
    }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

html {
  background: linear-gradient(to right bottom, #fbdb89, #f48982);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
}

body {
  font-family: sans-serif;
  line-height: 1.4;
  display: flex;
}

.container {
  width: 400px;
  margin: auto;
  padding: 36px 48px 48px 48px;
  background-color: #f2efee;

  border-radius: 11px;
  box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.15);
}

.login-title {
  padding: 15px;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
}

.login-form {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 16px;
}

.login-form label {
  display: block;
  margin-bottom: 8px;
}

.login-form input {
  width: 100%;
  padding: 1.2rem;
  border-radius: 9px;
  border: none;
}

.login-form input:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(253, 242, 233, 0.5);
}

.btn--form {
  background-color: #f48982;
  color: #fdf2e9;
  align-self: end;
  padding: 8px;
}

.btn,
.btn:link,
.btn:visited {
  display: inline-block;
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  border-radius: 9px;
  border: none;

  cursor: pointer;
  font-family: inherit;

  transition: all 0.3s;
}

button {
  outline: 1px solid #f48982;
}

.btn--form:hover {
  background-color: #fdf2e9;
  color: #f48982;
}

</style>