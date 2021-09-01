# 介绍

## 什么是组合式API  


通过创建Vue组件,我们可以将界面中重复的内容连同其功能一起提取为可重用的代码段。这种方式很好，但还是远远不够，尤其是大型项目中，几百个组件，混杂在一起，这个时候如何解决共享，重用代码尤其重要

## 组合式API基础

既然我们知道了要干什么，那我们我们就需要先造一个轮子，而这个轮子其实也不用我们造，Vue组件中，我们将其称为`setup`。

>Warning  
>在`setup`中不要使用this，因为他不会找到组件实例。`setup`都调用发生在`data` property,`computed` property 或者`method`被解析之前,所以他们无法在`setup`中被获取。

`setup` 选项是一个接受`props`和`context`都函数。并且将返回的内容全部都暴露给组件的其余部分以及组件的模版

让我们把`setup`添加到组件中:

```js
//src/components/UserRepositories.vue
export default {
  components:{RepositoriesFilters,RepositoriesSortBy,RepositoriesList},
  props:{
    user:{
      type:String,
      required:true,
    }
  },
  setup(props){
    console.log(props);//{user:""}
    return {};
  }
  //组件的其余部分
}
```
## 简单例子入门使用

### 简单的使用setup以及引出ref

```typescript
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
import {defineComponent,ref} from "vue";
export default defineComponent({
  name:"App",
  setup(){
    const studentArr = ref(["张三","李四","老王"]);
    const selectPeople = ref("");
    const selectStuFn = (index:number)=>{
      selectPeople.value = studentArr.value[index];
    }
    return {studentArr,selectPeople,selectStuFn}
  }
})
</script>
```
可以看到如果是使用vue2的话，我们需要定义`data`，`method`，`watch`，`computed`属性，而现在我们把它揉到一起好像不太好理解。并且在vue2中data中的变量都是响应式的，而现在我们需要`ref`主动将其变为响应式的变量，并且在使用时需要使用`.value`的形式，而在模版中却又不需要这样使用，显得特别怪异。

### reactive优化程序

```typescript
<template>
  <div>
    <p>点名系统，来点个名</p>
    <button v-for="(item,index) in data.studentArr" :key="index" @click="data.selectStuFn(index)">
      {{index}} : {{item}}
    </button>

    <hr>
    <span>请「{{data.selectPeople}}」同学来回答问题</span>
  </div>
</template>

<script lang="ts">
import {defineComponent,reactive} from "vue";
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
   
    return {data}
  }
})
</script>

```

简单总结下面几点：

- 不再使用ref对属性进行声明响应式，而是类似于Vue2的写法，我们只需要定义自己的data对象，想要的属性放在data里面，最后返回data对象。
- 不再使用`*.value`的形式来访问属性，而是改为`data.*`的形式，更容易理解。
- 不再return一堆东西，现在只需要return一个data对象就行。  

>误区  
  - 在`template`中也使用`data.*`的形式反而麻烦了，所以在return时解构data对象。注意，解构后的对象不再具有响应式
>解决
  - 使用`toRefs()`即可解决


```typescript
<template>
  <div>
    <p>点名系统，来点个名</p>
    <button v-for="(item,index) in data.studentArr" :key="index" @click="data.selectStuFn(index)">
      {{index}} : {{item}}
    </button>

    <hr>
    <span>请「{{data.selectPeople}}」同学来回答问题</span>
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
```