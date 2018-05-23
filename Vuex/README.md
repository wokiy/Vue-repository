# Vuex介绍
> Vuex 是什么？Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

# 核心概念
 ### State
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
 
 
 
 
 
 
 
 
 
 
 
 
