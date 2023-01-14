<template>
  <div class="home container-fluid">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <NavBar/>
    <div>
      <h2 class="mt-4 text-center">
        Welcome To Tasker App
      </h2><br>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-12 col-md-6 col-lg-3" v-for="(list, i) in listarray" :key="i" v-bind="list" role="button">
        <ListComponent
          :addNewSelector="addNewSelector"
          :deletelist="deletelist"
          :setSelectedTask="setSelectedTask"
          :list="list"
          :tasks="taskarray"
          :deleteTask="deleteTask"
          :addList="addList"
          :getData="getData"
        />
      </div>
      <div class="position-fixed bottom-0 end-0 p-5 width-auto " style="width:auto;">
        <button v-if="!canCreateList" class=" btn btn-primary position-absolute rounded-circle m-5 d-flex justify-content-center align-items-center shadow" role="button" @click="createList" style="width:50px; height:50px; bottom:0; right:0">

          <!-- <span @click="createList"> -->
            <!-- <a href="#" class="p-3 shadow bg-primary rounded-circle text-white text-decoration-none"> -->
              <i class="bi bi-plus-lg text-white"></i>
              <!-- <i class="bi bi-plus-lg text-white" style="height:40px; width:40px" ></i> -->
              

            <!-- </a> -->
          <!-- </span> -->
            </button>
        <form @submit.prevent="addList" v-if="canCreateList" class="form" style="transition:all 0.6s ease-in-out">
          <input class="form-control" v-model="listName" placeholder="Create List"/>
        </form>
      </div>
    </div>
    
    <EditModal :listarray="listarray" :selectedTask="selectedTask" :click="updateTask"/>
    <AddModal :listarray="listarray" :selectedTask="selectedTask" :click="addTask" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from "@/components/Nav.vue";
import ListComponent from "@/components/List.vue";
import CardComponent from "@/components/Card.vue";
import EditModal from "@/components/EditModal.vue";
import AddModal from "@/components/AddModal.vue";
import axios from "axios";
import {setToken} from '../axios';

export default {
  name: "HomeView",

  components: {
    NavBar,
    ListComponent,
    CardComponent,
    EditModal,
    AddModal,
  },
  data() {
    return {
      canCreateList: false,
      listName:'',
      listarray: [],
      taskarray: [],
      selectedTask: {},
      // userdata: ''
      
    };
  },

  mounted() {
    this.getData();
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem("token");
    if(token) {
      setToken(token)
    }
    if(!userId) {
      this.$router.push("/login")
    }
    // this.getUser()
  },
  methods: {
    createList: function(){
      this.canCreateList = true
      this.listName = ''
    },
    getData: async function () {
      const userid = localStorage.getItem("userId");
      try {
        const response = await axios.get("http://localhost:8080/api/getlist/" + userid);
        this.listarray = response.data.list;
        this.taskarray = response.data.tasks;
      } catch (err) {
        console.log(err);
      }
    },
    setSelectedTask: function (taskId) {
      console.log("taskid", taskId);
      const selectedTaskData = this.taskarray.find((item) => item.id == taskId);
      // this.selectedTask = selectedTaskData
      this.selectedTask = selectedTaskData
      console.log("selectedTaskData", this.selectedTask);
    },

    addNewSelector: function (listId) {
      console.log("listId", listId);
      this.selectedTask = {
        content: "",
        deadline: new Date().toJSON().slice(0, 10),
        flag: 1,
        parent: listId,
        title: "",
        
      };
      console.log("selectedTaskData", this.selectedTask);
    },

    updateTask: async function () {
      console.log("updaterunning")
      try {
        const userid = localStorage.getItem("userId");
        const postbody = { ...this.selectedTask };
        delete postbody.userID;
        const response = await axios.put(
          "http://localhost:8080/api/gettask/" + userid,
          postbody
        );
        this.getData();
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    addTask: async function () {
      try {
        const userid = localStorage.getItem("userId");
        const postbody = { ...this.selectedTask,userID:userid };
        console.log(postbody);
        const  response = await axios.post("http://localhost:8080/api/gettask/", postbody)
        this.getData()
        console.log(response)
      } catch (err) {
        console.log(err);
      }
    },
    // -----------------Task Delete--------------------
    deleteTask: async function (id) {
      try{
        if(confirm("Are you sure you want to delete this task?")){
          const userid = localStorage.getItem("userId");
          const response = await axios.delete('http://localhost:8080/api/gettask/'+id);
        }else{alert("Deletion cancelled!")}
        this.getData()
        console.log(response)
      }catch (e){
        console.log(e)
      }
    },
    deletelist: async function (id) {
      try {
        if(confirm("Are you sure you want to delete this list?")){
          const response = await axios.delete(
            "http://localhost:8080/api/getlist/" + id);
          console.log(response);
        }
        else{alert("Deletion cancelled!")}
        this.getData();
      } catch (err) {
        console.log(err);
      }
    },
    
    addList: async function (){
      const userid = localStorage.getItem("userId");
      try{
        const response = await axios.post('http://localhost:8080/api/getlist',{
          userid: userid,
          listName: this.listName
        })
        this.canCreateList = false
        this.getData();
        console.log(response)

      }catch (e) {
        console.log(e)
      }

    },
    
  },
};
</script>
