## Vue 生命周期函数

#### update
> 类型 Function
##### 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。

- 注意 updated 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 vm.$nextTick 替换掉 updated：
```
  updated() {
     this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been re-rendered
  })
  }
```
##### 该钩子在服务器端渲染期间不被调用
