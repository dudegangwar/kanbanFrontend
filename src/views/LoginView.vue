<template>
    <div>
        <div class="d-flex justify-content-center align-items-center vh-100 border-2" id="loginsection">
    <form @submit.prevent="login()">
      <h2 class="mb-3">Login To Tasker App</h2>
      <div class="mb-3">
        <input type="email" class="form-control" placeholder="Enter Email" v-model="email"/>
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" placeholder="Enter Password" v-model="password"/>
      </div>
      <button type="submit" class="btn btn-warning form-control fw-semibold">
        Login
      </button>
      <p class="mt-3 text-center">Don't Have Account? <span><a href="/register">Sign Up Now</a></span></p>
    </form>
  </div>
    </div>
  </template>

  <<script>
import axios from 'axios';

  export default {
   name: 'Login',
   data(){
    return {
        email: "",
        password: "",
        username: '',
    }
   },
   methods: {
        login : async function () {
            try {
                const response = await axios.post('http://localhost:8080/api/user',{
                    email: this.email,
                    password: this.password,
                    
                })
                localStorage.setItem("email", response.data.userdata.email);
                localStorage.setItem("userId", response.data.userdata.id);
                localStorage.setItem("username", response.data.userdata.name);
                localStorage.setItem("token",response.data.token)
                this.$router.push('/')
            } catch(err) {
                console.log(err)
            }
        }
   }
  }
  </script>
  