# Vuex介绍
> Vuex 是什么？Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

![](https://img-blog.csdn.net/20170809103541096?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlhbmczNzcxMjIyMTA=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

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

## Mutation
> 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一   个回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数： 

```
 const store = new Vuex.Store({
  state: {
   count:1
  },
  mutations: {
   inrement (state) {
    state.count++;
   }
  }
 })
```
- 你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation       handler，你需要以相应的 type 调用 store.commit 方法： 
```
 store.commit('increment');
```
#### 提交载荷(Payload)
> 你可以向 store.commit 传入额外的参数
```
 //.....
 mutations: {
  increment (state,n) {
   state.count += n;
  }
 }
 //
 
 store.commit('increment', 10)
```
- 载荷payload应该是一个对象，好处多个字段并且记录的mutation会更有意思
```
 mutatons: {
  increment (state, payload) {
   state.count += payload.amount
 }
 //
 
 store.commit('increment',{
  amount: 10
 })
```
#### 对象风格的提交方式
> 提交mutation 的另一种方式是直接使用包含的type 属性对象
```
 store.commit({
  type: 'increment',
  amount: 22
 })
```
- 对象风格提交方式 处理器hander处理器保持不变

#### Mutation 需要遵守 Vue的响应规则
> 既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一   样遵守一些注意事项：
1. 初始化好store 中的所有的所需属性
2. 当需要在对象上添加新属性时，你应该
 - 使用 Vue.set(obj, 'newProp', 123), 或者
 - 以新对象替换老对象。例如，利用 stage-3 的对象展开运算符我们可以这样写： 
 ```
  state.obj = {...state.obj, newProp: 123}
 ```
#### 使用产量替代Mutation 事件类型 type==> handler
> 同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：
```
//mutatio-type.js
export const SOME_MUTATION = 'SOME_MUTATION'

//store.js
import Vuex from 'Vuex';
import {SOME_MUTATION} from './mutation-tye.js'

const store = new Vuex.Store({
 state: {...},
 mutation: {
  // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
   }
 }
})
```
#### mutation必须是同步函数 

#### 在组件中提交 Mutation
> 你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要   在根节点注入 store）

```
 import { mapMutations } from 'vuex'

 export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      })
    }
  }
```
##### Action
> 在 mutation 中混合异步调用会导致你的程序很难调试。例如，当你调用了两个包含异步回调的 mutation 来改变状态，你怎么知道什么时候回调和哪个先回调呢？   这就是为什么我们要区分这两个概念。在 Vuex 中，mutation 都是同步事务：
```
 store.commit('increment')
 //任何“increment” 导致状态更都应该在此刻完成。
```

## Action(可包含异步操作)
 - Action 提交的是 mutation，而不是直接变更状态
 - Action 可以包含任意异步操作
```
  const store = new Vuex.Store({
   state: {
     count: 0
   },
   mutations: {
     increment (state) {
       state.count++
     }
   },
   actions: {
     increment (context) {
       context.commit('increment')
     }
   }
 })
 //....
 actions: {
  increment ({commit}) {
   commit('increment');
  }
 }
```

#### 分发Action
> Action pass store.dispatch 方法触发
```
 store.dispatch('increment');
```

> 乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在   action 内部执行异步操作：

```
 actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
   }
 }
 //payload
 // 以载荷形式分发
 store.dispatch('incrementAsync', {
   amount: 10
  })

  // 以对象形式分发
  store.dispatch({
    type: 'incrementAsync',
    amount: 10
  })
```
#### 案例
```
  actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
     )
    }
  }
```
- 并且通过提交 mutation 来记录 action 产生的副作用（即状态变更

#### 在组件中分发 Action
> 你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根   节点注入 store）：
```
  import { mapActions } from 'vuex'

  export default {
    // ...
    methods: {
      ...mapActions([
        'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

        // `mapActions` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      ]),
      ...mapActions({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      })
    }
  }
```

> store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise：

```
  actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
   }
 }
 
 ///
 store.dispatch('actionA').then(() => {
  //...
 })
 ///
 actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```
### async/await 
 ```
   // 假设 getData() 和 getOtherData() 返回的是 Promise

   actions: {
     async actionA ({ commit }) {
       commit('gotData', await getData())
     },
     async actionB ({ dispatch, commit }) {
       await dispatch('actionA') // 等待 actionA 完成
       commit('gotOtherData', await getOtherData())
     }
   }
   一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。
 ```

## Module
> 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
  为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进   行同样方式的分割：
  
```
  const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
 }

 const moduleB = {
   state: { ... },
   mutations: { ... },
   actions: { ... }
 }

 const store = new Vuex.Store({
   modules: {
     a: moduleA,
     b: moduleB
   }
 })

 store.state.a // -> moduleA 的状态
 store.state.b // -> moduleB 的状态
```
- 模块的局部状态 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。

```
 const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```
- 同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：
```
 const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
   }
 }
```
- 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：
```
  const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
   }
 }
```
## 表单案例
 > 用“Vuex 的思维”去解决这个问题的方法是：给 <input> 中绑定 value，然后侦听 input 或者 change 事件，在事件回调中调用 action:
```
 <input :value="message" @input="updateMessage">
```

```
 // ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
```
- 下面是 mutation 函数：
```
 // ...
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}
```

### 双向绑定的计算属性
> 必须承认，这样做比简单地使用“v-model + 局部状态”要啰嗦得多，并且也损失了一些 v-model 中很有用的特性。另一个方法是使用带有 setter 的双向绑定计算   属性：
```
  <input v-model="message">
  ///
  
  // ...
 computed: {
   message: {
     get () {
       return this.$store.state.obj.message
     },
     set (value) {
       this.$store.commit('updateMessage', value)
     }
   }
 }
```










 
 
