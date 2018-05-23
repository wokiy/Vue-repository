# Vuex介绍
> Vuex 是什么？Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

# 核心概念
 ## State
 > Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源而存在。这也意味着，每个应用将仅仅包含一个store 实例。单    一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照 
 
 ##### vue组件获取Vuex状态
 >  Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
 
 ```
  const Counter = {
    template: `<div>{{count}}</dv>`
    computed: {
      count() {
        return store.state.count;
    }
  }
 ```
 > 每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM
 
 - 然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态
 
 > Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）:
 
 ```
  const app = new Vue({
    el: '#app',
    // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
    conponets: {Counter},
    template: 
    `<div id="app">
      <counter></conuter>
    </div>
    `
  })
 ```
 - 通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。让我们更新下 Counter 的实现
 
 ```
  const Counter = {
    template: `
      .....
    `,
    computed: {
      count(){
             this.$store.state.count;
          }
        }
      }
 ```
 #### mapstate 辅助函数
 > 当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属      性，让你少按几次键：
 
 ```
  import {mapState} from 'vuex';
  export default {
    //....
    computed: mapState({
      count: state => state.count,
      countAlias: 'count',
       // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState (state) {
        return state.count + this.localCount
      }
    })
  }
 ```
 - 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组
 ```
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'count'
  ])
 ```
 - ES6（....解构赋值运算符）
 ```
  computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
    })
  }
 ```
 #### 组件任然包邮局部状态
 > 使用 Vuex 并不意味着你需要将所有的状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态    严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定
 
## Getter
> Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖   值发生了改变才会被重新计算。
 
##### Getter 接受 state 作为其第一个参数：
```
 const store = new Vuex.Store({
  state: {
   todos: [
     { id: 1, text: '...', done: true },
     { id: 2, text: '...', done: false }
   ],
   getter: {
    doneTodos: state => {
     return stat.todos.filter(todo => todo.done)
    }
   }
  },
 })
```
#### 通过属性访问
> Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：
```
 store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]

```
> Getter 也可以接受其他 getter 作为第二个参数：
```
 getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length;
    //store.getters.doneTodosCount // -> 1
  }
 } 
 
 //组件使用
 computed: {
  doneTodoScOUNT() {
    return this.$store.getters.doneTodosCount;
  }
 }
```
- 注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。

#### 通过方法访问 
> 你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用  
```
 getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
 }
//store.getters.getTodoById(2)//-> {id:2,text:'......',done:false} 
```
#### mapGeters 辅助函数
> mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
```
 import {mapGetters} from 'vuex';
 export default {
  //..
  computed:{
   // 使用对象展开运算符将 getter 混入 computed 对象中
   ...smapGetters([
   'doneTodosCount',
   'anotherGetter',
   ///....
   ])
  }
 }
```
> 如果你想将一个 getter 属性另取一个名字，使用对象形式：
```
 mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
 })
```
 




 
 
