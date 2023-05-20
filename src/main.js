import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import('./assets/css/style.css')
import('./assets/css/table.css')
import('./assets/js/script.js')

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGMQ5imfqS_x6WnQxzkkbg-DW3L30s8PI",
  authDomain: "project-team-465eb.firebaseapp.com",
  projectId: "project-team-465eb",
  storageBucket: "project-team-465eb.appspot.com",
  messagingSenderId: "596381381614",
  appId: "1:596381381614:web:ad67a67267ad54a04194ff",
  measurementId: "G-6R0LMFM1J7"
};


firebase.initializeApp(firebaseConfig)

createApp(App).use(router).mount('#app')
