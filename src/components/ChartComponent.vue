<template>
  <div>

    <div class="p-1 shadow border-2 rounded m-1">
      <apexchart
      width="100%"
        height="200px"
        type="bar"
        :options="options"
        :series="series"
      ></apexchart>
    </div>
    <p class="text-center">{{list.listname}}</p>
  </div>
</template>

<script>
export default {
  name: "ChartComponent",
  props: ["list"],
  
  data() {
    return {
      chartData : [],
      fetched:false,
      options: {
        colors: ['#06EF1B','#EF0606'],
        chart: {
          width: '100%',
          stacked: true,
          id: "vuechart-example",
        },
        xaxis: {
          categories: this.getSeries(this.calculate()),
        },
      },
      series: this.getOptions(this.calculate())
      
    };
  },
  methods:{
    calculate: function () {
        const data=  Object.keys(this.list.tasks).map(date=>{
          const datedata = this.list.tasks[date]
          const completed = datedata.filter(item=>item.flag==1).length;
           const incompleted = datedata.filter(item=>item.flag==0).length;
            return {
              name:date,
              data:[completed,incompleted]
            }
        })
        console.log("Data",data)
    return data;
    },
    getSeries:function(array) {
      return array.map(item=>item.name);
    },
    getOptions:function(array) {
      const toReturn = {
        completed:[],
        pending:[],
      };
      array.map(item=> {
        toReturn.completed.push(item.data[0])
        toReturn.pending.push(item.data[1])
      })

      return Object.keys(toReturn).map(key=> ({name:key,data:toReturn[key]}))
    }

  },
  created() {
    // console.log("list", this.list.tasks);
    const calculatedData = Object.keys(this.list.tasks).map(date=>{
                      const datedata = this.list.tasks[date]
                      const completed = datedata.filter(item=>item.flag==1).length;
                      const incompleted = datedata.filter(item=>item.flag==0).length;
                    return {
                        name:date,
                        data:[completed,incompleted]
                    }
                  })
  this.chartData = calculatedData;
  console.log("chartData",this.chartData.map(item=>item.name))
  this.fetched=true;

  // Object.keys(this.chartData).map(item=>{console.log("data",item)})
  
  
  },
};
</script>
