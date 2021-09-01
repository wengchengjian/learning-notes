<template>
  <div>
    <p>点名系统，来点个名</p>
    <button v-for="(item,index) in studentArr" :key="index" @click="selectStuFn(index)">
      {{index}} : {{item}}
    </button>

    <hr>
    <span>请「{{selectPeople}}」同学来回答问题</span>
  </div>
</template>

<script lang="ts">
import {defineComponent,reactive,toRefs} from "vue";
export default defineComponent({
  name:"App",
  setup(){
    const data = reactive({
      studentArr:["张三","李四","老王"],
      selectPeople:"",
      selectStuFn:(index:number)=>{
      data.selectPeople = data.studentArr[index];
    }
    })
    const res = toRefs(data);

    return {...res}
  }
})
</script>