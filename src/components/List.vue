<template>
  <div>
    <div class="card mb-3 border-0 bg-white rounded-0 shadow" style="max-width: 18rem; background-color: white;">
      <div class="card-header bg-white">
        <div class="justify-content-between align-items-center d-flex">
          <h4 @click="canedit" v-if="!canEdit">{{ list.listname }}</h4>
          <form v-if="canEdit" @submit.prevent="updatelist(listUpdatedName, list.id)" class="form">
            <input type="text" v-model="listUpdatedName" placeholder="Enter List Name" class="form-control" />
          </form>
                   <i class="bi bi-three-dots dropdown" data-bs-toggle="dropdown" aria-expanded="false" role="button"></i>
                    <ul class="dropdown-menu">
                        <a :href="downloadURL" download class="text-decoration-none"><li><span class="dropdown-item"  role="button">Export All Tasks</span></li></a>
                        <li><span class="dropdown-item"  role="button" @click="deletelist(list.id)" >Delete List</span></li>
                    </ul>
                
            <!-- <i class="bi bi-trash" @click="deletelist(list.id)" role="button"></i> -->
        </div>
        <div v-for="(task, i) in tasks" :key="i" v-bind="task">
          <CardComponent :setSelectedTask="setSelectedTask" :deleteTask="deleteTask" v-if="list.id == task.parent" :task="task"/>
        </div>
        <!-- <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#addTaskModal" @click="addNewSelector(list.id)">Add Task</button> -->
      </div>
      <div class="d-flex p-3 gap-1 justify-content-center">
        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addTaskModal" @click="addNewSelector(list.id)">Add Task</button>
        <!-- <button class="btn btn-success btn-sm">Export Task</button> -->

      </div>
      
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import CardComponent from "@/components/Card.vue";
export default {
  name: "ListComponent",
  data (){
    return {
      canEdit: false,
      listUpdatedName: this.list.listname,
      downloadURL: 'http://localhost:8080/api/export/task/'+this.list.id
    }
  },
  mounted() {
    // this.deletelist()
  },
  props: ["list", "tasks", "setSelectedTask","deletelist", "addNewSelector", "deleteTask", "addList","getData"],
  components: {
    CardComponent,
  },
  methods: {
    canedit: function (){
      this.canEdit = !this.canEdit;
    },
    updatelist: async function (listname, listid){
      try{
        const userid = localStorage.getItem("userId");
        const response = await axios.put('http://localhost:8080/api/getlist/'+userid,{
          listName: listname,
          listid: listid
        })
        console.log(response)
        this.canEdit = !this.canEdit
        this.getData()
      }catch (e){
        console.log(e)
      }
    },
  },
  
};
</script>