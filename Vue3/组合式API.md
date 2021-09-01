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
