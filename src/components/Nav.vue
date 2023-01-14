<template>
  <div>
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand">Hello {{ username }} </a>
            <div>
                <button class="btn btn-primary me-2 btn-sm"><a :href="downloadData" download class="text-decoration-none text-white">Export</a></button>
                <router-link to="/"><button class="btn btn-success me-2 btn-sm">Home</button></router-link>
                <router-link to="/summary"><button class="btn btn-success me-2 btn-sm">Summary</button></router-link>
                <router-link to="/login"><button class="btn btn-danger me-2 btn-sm" v-if="!username">Login</button></router-link>
                <router-link to="/register"><button class="btn btn-warning me-2 btn-sm" v-if="!username">Register</button></router-link>
                <button class="btn btn-outline-warning m2-3 btn-sm" @click="logout()" v-if="username">Logout</button>
            </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data (){
    return {
      username: localStorage.getItem('username'),
      // userId: localStorage.getItem('userId'),
      onSummaryPage: false,
      downloadData: "http://localhost:8080/api/export/data/"+localStorage.getItem('userId')
    }
  },
  methods: {
    logout: function (){
      localStorage.clear()
      this.$router.push('/login')
    },
    // summary: function (){
    //   this.onSummaryPage = true
    // }
  }
};
</script>