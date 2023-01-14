<template>
    <div>
        <div class="shadow rounded-0 mb-3" style="max-width: 18rem;">
            <div class="card-body">
                
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="card-title text-start">{{task.title}}</h5>
                   <i class="bi bi-three-dots dropdown" data-bs-toggle="dropdown" aria-expanded="false" role="button"></i>
                    <ul class="dropdown-menu">
                        <li><span class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#modifyTaskModal" @click="setSelectedTask(task.id)" role="button">Edit</span></li>
                        <li><span class="dropdown-item" @click="deleteTask(task.id)" role="button" >Delete</span></li>
                    </ul>
                </div>
                <p class="card-text text-start">{{task.content}}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <!-- <button type="button" class="btn btn-danger btn-sm"><i class="bi bi-clock"></i><span> {{task.deadline.split("-").reverse().join("-")}}</span></button> -->
                    <!-- <button type="button" class="btn btn-danger btn-sm"><i class="bi bi-clock"></i> -->
                        <span class="text-danger fw-bold" style="font-size:12px"><i class="bi bi-calendar-event"></i> {{task.deadline.split("-").reverse().join("-")}}</span>
                    <!-- </button> -->
                    <i class="bi bi-check2-square text-danger h5" v-if="task.flag==0"></i>
                    <i class="bi bi-check2-square text-success h5" v-if="task.flag==1"></i>
                    
                    <!-- <selected>
                        <option value="0"> <i class="bi bi-check2-square text-danger"></i></option>
                        <option value="1"> <i class="bi bi-check2-square text-success"></i></option>
                    </selected> -->
                </div>
                <span style="font-size:10px">Last Updated: {{ task.lastUpdate }}</span>
                
            </div>
        </div>
    </div>
  </template>
  
  <script>
export default {
  name: "CardComponent",
  props:['task','setSelectedTask', 'deleteTask'],
};
</script>