<template>
  <div class="container-fluid">
    <NavBar />
    <div class="row m-2">
      <h2 class="text-center">Task Summary</h2>
      <div v-for="(list,i) in lists" :key="i" :v-bind="list" class="col-3">
        <ChartComponent :list="list"/>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/Nav";
import ChartComponent from '@/components/ChartComponent.vue';
import axios from 'axios'
export default {
  name: "SummaryVue",
  components: {
    NavBar,
    ChartComponent
  },
  // props: ['summary'],
  data() {
    return {
        lists:[],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData: async function () {
      const userid = localStorage.getItem("userId");
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getlist/" + userid
        );
        // console.log(response.data);
        const list = response.data.list;
        const tasks = response.data.tasks;
        const newList= list.map(item=> {
          const listTask = tasks.filter(task=>task.parent==item.id);
          const newData = listTask.reduce((oldvalue, newValue) => {
            return {...oldvalue,[newValue.deadline]:listTask.filter(item2=>item2.deadline===newValue.deadline)}
          },{});
          return {
            ...item,
            tasks:newData
          }
        })
        this.lists=newList;
        console.log("newlist", newList)

      } catch (err) {
        console.log(err);
      }
    },
  }
  
};
</script>

