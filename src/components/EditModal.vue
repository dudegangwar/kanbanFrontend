<template>
     <!-- Add Task Model Started -->
     <div class="modal fade" id="modifyTaskModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Your Task</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form @submit.prevent="click">
                <div class="modal-body">
                  <div class="mb-3">
                    <select class="form-select" aria-label="Default select example" type="text" name="flag"
                      v-model="selectedTask.parent">
                      <!--  -->
                      <option v-for="(list,i) in listarray" :key="i" v-bind="list" :value="list.id" :selected="list.id === selectedTask.parent" >{{list.listname}}</option>
                      <!-- <option value="1">Completed</option> -->
                    </select>
                  </div>
                  <div class="mb-3">
                    <input class="form-control" type="text" placeholder="Enter Title" name="title" v-model="selectedTask.title" />
                  </div>
                  <div class="mb-3">
                    <textarea class="form-control" type="text" placeholder="Enter Content" name="content"
                      v-model="selectedTask.content" ></textarea>
                  </div>
                  <div class="mb-3">
                    <input class="form-control" format="dd-mm-yyyy" type="date" placeholder="Enter Deadline" name="deadline"
                      v-model="selectedTask.deadline" :min="currentDate"/>
                  </div>
                  <div class="mb-3">
                    <select class="form-select" aria-label="Default select example" type="text" name="flag"
                      v-model="selectedTask.flag">
                      <option value="0" selected>Pending</option>
                      <option value="1">Completed</option>
                    </select>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- Add Task Modal Ended -->
</template>

<script>
export default {
  name: "EditModal",
  props:['selectedTask','listarray',"click"],
  data (){
    return {
      currentDate: new Date().toJSON().slice(0, 10)
    }
  }
};
</script>