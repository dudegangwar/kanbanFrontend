<template>
    <div class="d-flex justify-content-center align-items-center vh-100 border-2">
    <form @submit.prevent="register()">
      <h2 class="mb-3">Welcome To Tasker</h2>
      <div class="mb-3">
        <input type="text" class="form-control"  placeholder="Enter Your Name" v-model="name"/>
      </div>
      <div class="mb-3">
        <input type="email" class="form-control" placeholder="Enter Email" v-model="email" required pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"/>
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" placeholder="Enter Password" v-model="password" required/>
      </div>
      <button type="submit" class="btn btn-warning form-control fw-semibold">
        Create Account
      </button>
      <p class="mt-3 text-center">Already a user? <span><a href="/login">Sign In</a></span></p>
    </form>
  </div>
  </template>

  <<script>
  import axios from 'axios';
  export default {
   name: 'Register',
   data () {
    return {
        name : '',
        email : '',
        password : '',
        }
   },
   methods : {
    register : async function () {
        try {
            const response = await axios.post('http://localhost:8080/api/create-user', {
                "name": this.name,
                "email": this.email,
                "password": this.password,
            })
            console.log(response)
            localStorage.setItem("email", response.data.registeruser.email);
            localStorage.setItem("userId", response.data.registeruser.id);
            localStorage.setItem("username", response.data.registeruser.name);
            localStorage.setItem("token",response.data.token)
            this.$router.push('/')

            }catch(err) {
                console.log(err)
        }
    }
   }
  }
  </script>
  