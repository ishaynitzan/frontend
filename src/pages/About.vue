<template>
  <div class="about">
    <h1>This is an about page</h1>
    <line-chart/>

  </div>
</template>


<script>
import lineChart from '../components/charts.vue'

export default {
components:{
  lineChart
},
props:[],
data(){
return{
}
},
created(){
},
methods: {
},
computed:{
},
destroyed(){
}
}
</script>
